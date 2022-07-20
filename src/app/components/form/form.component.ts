import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ControlStudent,
  Student,
  typeClassroom,
  typeData,
  typeGenre,
  typeLastNames,
  typeState,
} from 'src/app/interfaces/student';
import { StudentsService } from 'src/app/services/students.service';
import { regexEmail, regexFN, regexLN } from 'src/app/utils/regexs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  private _edit: boolean = false;
  private _formStudent: FormGroup<ControlStudent> = this.formBuilder.group({
    firstNames: ['', [Validators.required, Validators.pattern(regexFN)]],
    lastNames: ['', [Validators.required, Validators.pattern(regexLN)]],
    genre: ['', Validators.required],
    birth: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(regexEmail)]],
    classroom: ['', Validators.required],
    state: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private _data: { signal: boolean; student: Student },
    private formBuilder: NonNullableFormBuilder,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    if (this._data.signal) {
      this._edit = true;
      this.patchForm(this._data.student);
    } else {
      this._edit = false;
    }
  }

  get edit(): boolean {
    return this._edit;
  }

  get formStudent(): FormGroup<ControlStudent> {
    return this._formStudent;
  }

  get firstNames(): FormControl<string> {
    return this._formStudent.controls.firstNames;
  }

  get lastNames(): FormControl<string> {
    return this._formStudent.controls.lastNames;
  }

  get genre(): FormControl<string> {
    return this._formStudent.controls.genre;
  }

  get birth(): FormControl<string> {
    return this._formStudent.controls.birth;
  }

  get email(): FormControl<string> {
    return this._formStudent.controls.email;
  }

  get classroom(): FormControl<string> {
    return this._formStudent.controls.classroom;
  }

  get state(): FormControl<string> {
    return this._formStudent.controls.state;
  }

  public firstNamesInvalid(): string {
    if (this.firstNames.errors?.['required'])
      return 'A first name is required.';
    return this.firstNames.errors?.['pattern']
      ? 'Only letters and a space to divide words are allowed.'
      : '';
  }

  public lastNamesInvalid(): string {
    if (this.lastNames.errors?.['required']) return 'A last name is required.';
    return this.lastNames.errors?.['pattern']
      ? 'Only letters and a space to divide words are allowed.'
      : '';
  }

  public genreInvalid(): string {
    return this.genre.errors?.['required'] ? 'You must select a genre.' : '';
  }

  public birthInvalid(): string {
    return this.birth.errors?.['required']
      ? 'The date of birth is not valid, the format is mm/dd/yyyyy.'
      : '';
  }

  public emailInvalid(): string {
    if (this.email.errors?.['required']) return 'E-mail address required.';
    return this.email.errors?.['pattern'] ? 'Invalid e-mail address.' : '';
  }

  public classroomInvalid(): string {
    return this.classroom.errors?.['required']
      ? 'You must select a classroom.'
      : '';
  }

  public stateInvalid(): string {
    return this.state.errors?.['required'] ? 'You must select a status.' : '';
  }

  public onSubmit(): void {
    this.edit ? this.editStudent() : this.addStudent();
  }

  private addStudent(): void {
    const { firstNames, lastNames, genre, birth, email, classroom, state } =
      this._formStudent.getRawValue();

    const student: Student = {
      active: true,
      id: Date.now(),
      data: {
        birth: birth.toString(),
        email: email.toLowerCase(),
        genre: genre as typeGenre,
        names: {
          firstNames: firstNames.split(' ').map((e) => e.toLowerCase()),
          lastNames: lastNames
            .split(' ')
            .map((e) => e.toLowerCase()) as typeLastNames,
        },
        classroom: classroom as typeClassroom,
        shift: 'morning',
        state: state as typeState,
      },
    };

    this.studentsService.addStudent(student);
  }

  private editStudent(): void {
    const { firstNames, lastNames, genre, birth, email, classroom, state } =
      this._formStudent.getRawValue();

    const data: typeData = {
      birth: birth.toString(),
      email: email.toLowerCase(),
      genre: genre as typeGenre,
      names: {
        firstNames: firstNames.split(' ').map((e) => e.toLowerCase()),
        lastNames: lastNames
          .split(' ')
          .map((e) => e.toLowerCase()) as typeLastNames,
      },
      classroom: classroom as typeClassroom,
      shift: 'morning',
      state: state as typeState,
    };

    this.studentsService.editStudent(this._data.student.id, data);
  }

  private patchForm(student: Student): void {
    const {
      data: {
        names: { firstNames, lastNames },
        genre,
        birth,
        email,
        classroom,
        state,
      },
    }: Student = student;

    this._formStudent.patchValue({
      firstNames: firstNames.join(' '),
      lastNames: lastNames.join(' '),
      genre,
      birth: new Date(birth).toISOString(),
      email,
      classroom,
      state,
    });
  }
}
