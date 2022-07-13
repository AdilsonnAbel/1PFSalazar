import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Student,
  StudentId,
  typeClassroom,
  typeData,
} from '../interfaces/student';
import { titleCase } from '../utils/functions';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private rooms: typeClassroom[] = [
    'alpha',
    'beta',
    'gamma',
    'delta',
    'epsilon',
    'zeta',
    'eta',
  ];

  private students: Record<string, Student> = {};

  constructor(private http: HttpClient) {
    this.DB();
  }

  public addStudent(student: Student): void {
    this.students[student.id] = student;
  }

  public editStudent(id: number, data: typeData): void {
    this.students[id].data = data;
  }

  public deleteStudent(id: number): void {
    this.students[id].active = false;
  }

  public getClassroom(roomName: typeClassroom): Student[] {
    return this.arrStudents().filter(
      ({ data: { classroom } }) => classroom === roomName
    );
  }

  public getStudentIds(): StudentId[] {
    return this.arrStudents().map(
      ({
        id,
        data: {
          names: { firstNames, lastNames },
        },
      }) => ({
        id,
        name: `${firstNames.map(titleCase).join(' ')} ${lastNames
          .map(titleCase)
          .join(' ')}`,
      })
    );
  }

  public getStudent(idx: number): Student | undefined {
    return this.arrStudents().find(({ id }) => id === idx);
  }

  public getStudentsName(): string[] {
    return this.arrStudents().map(
      ({
        data: {
          names: { firstNames, lastNames },
        },
      }) => `${firstNames.join(' ')} ${lastNames.join(' ')}`
    );
  }

  public getRoomsNames(): typeClassroom[] {
    return this.rooms;
  }

  private arrStudents(): Student[] {
    return Object.values(this.students).filter(({ active }) => active);
  }

  private DB(): void {
    this.http
      .get<{}>('assets/students.json')
      .subscribe((data: Record<string, Student>) => (this.students = data));
  }
}
