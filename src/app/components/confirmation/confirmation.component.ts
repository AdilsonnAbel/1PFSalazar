import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { typeNames } from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: { id: number; names: typeNames },
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {}

  get names(): typeNames {
    return this._data.names;
  }

  public deleteStudent(): void {
    this.studentService.deleteStudent(this._data.id);
  }
}
