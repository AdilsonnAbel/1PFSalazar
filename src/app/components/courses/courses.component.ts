import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  private _courses$ = this.studentService.getCourses$;
  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {}

  get courses(): Observable<Course[]> {
    return this._courses$;
  }
}
