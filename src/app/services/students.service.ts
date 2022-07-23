import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Course,
  Student,
  typeClassroom,
  typeData,
} from '../interfaces/student';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private _rooms: typeClassroom[] = [
    'alpha',
    'beta',
    'gamma',
    'delta',
    'epsilon',
    'zeta',
    'eta',
  ];

  private _data: Record<string, Student> = {};
  private _students: BehaviorSubject<Student[]> = new BehaviorSubject(
    this._dataArray()
  );
  private _students$: Observable<Student[]> = this._students.asObservable();

  constructor(private http: HttpClient) {
    this.http
      .get<Record<string, Student>>('assets/students.json')
      .subscribe((data) => {
        this._data = data;
        this._refresh();
      });
  }

  get rooms(): typeClassroom[] {
    return this._rooms;
  }

  get students$(): Observable<Student[]> {
    return this._students$.pipe(map((d) => d.filter(({ active }) => active)));
  }

  get getCourses$(): Observable<Course[]> {
    return this.http
      .get<Record<string, Course>>('assets/courses.json')
      .pipe(map((data) => Object.values(data)));
  }

  public getClassroom$(roomName: typeClassroom): Observable<Student[]> {
    return this._students$.pipe(
      map((d) =>
        d.filter(
          ({ active, data: { classroom } }) => active && classroom === roomName
        )
      )
    );
  }

  public addStudent(student: Student): void {
    this._data[student.id] = student;
    this._refresh();
  }

  public editStudent(id: number, data: typeData): void {
    this._data[id].data = data;
    this._refresh();
  }

  public deleteStudent(id: number): void {
    this._data[id].active = false;
    this._refresh();
  }

  private _refresh(): void {
    this._students.next(this._dataArray());
  }

  private _dataArray(): Student[] {
    return Object.values(this._data);
  }
}
