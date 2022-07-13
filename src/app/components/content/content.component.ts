import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student, typeClassroom } from 'src/app/interfaces/student';
import { ActivatedRoute } from '@angular/router';

import { valRoomName } from 'src/app/utils/validations';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public displayedColumns: string[] = [
    'position',
    'names',
    'genre',
    'birth',
    'state',
  ];
  public Classroom: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((e) => {
      const rM: string | null = e.get('roomName');

      if (rM && valRoomName(rM)) {
        this.Classroom = this.studentsService.getClassroom(rM as typeClassroom);
      }
    });
  }
}
