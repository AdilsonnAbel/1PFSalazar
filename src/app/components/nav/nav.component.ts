import { Component, OnInit } from '@angular/core';
import { typeClassroom } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public rooms!: typeClassroom[];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.rooms = this.studentsService.rooms;
  }
}
