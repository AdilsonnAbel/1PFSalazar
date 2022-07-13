import { Component, OnInit } from '@angular/core';
import {
  FormGroupDirective,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
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
  public edit: boolean = false;

  public formStudent = this.formBuilder.group({
    firstNames: ['', [Validators.required, Validators.pattern(regexFN)]],
    lastNames: ['', [Validators.required, Validators.pattern(regexLN)]],
    genre: ['', Validators.required],
    birth: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(regexEmail)]],
    classroom: ['', Validators.required],
    state: ['', Validators.required],
  });

  private idStudent!: number;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((e) => {
      const id: string | null = e.get('id');

      if (id) {
        if (id === 'new') {
          this.edit = false;
          this.formStudent.reset();
        } else {
          const idx: number = Number(id);
          if (idx) {
            const student: Student | undefined =
              this.studentsService.getStudent(idx);

            if (student) {
              this.edit = true;
              this.idStudent = idx;
              this.patchForm(student);
            }
          }
        }
      }
    });
  }

  get firstNames() {
    return this.formStudent.controls.firstNames;
  }

  get lastNames() {
    return this.formStudent.controls.lastNames;
  }
  get genre() {
    return this.formStudent.controls.genre;
  }

  get birth() {
    return this.formStudent.controls.birth;
  }

  get email() {
    return this.formStudent.controls.email;
  }

  get classroom() {
    return this.formStudent.controls.classroom;
  }

  get state() {
    return this.formStudent.controls.state;
  }

  public onSubmit(formGroupDirective: FormGroupDirective): void {
    if (this.edit) {
      this.editStudent(formGroupDirective);
      this.router.navigate(['/edit']);
    } else {
      this.addStudent(formGroupDirective);
    }
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
      ? 'The date of birth is not valid, the format is dd/mm/yyyyy.'
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

  private addStudent(formGroupDirective: FormGroupDirective): void {
    const { firstNames, lastNames, genre, birth, email, classroom, state } =
      this.formStudent.getRawValue();

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

    this.formStudent.reset();
    formGroupDirective.resetForm();

    this.studentsService.addStudent(student);
  }

  private editStudent(formGroupDirective: FormGroupDirective): void {
    const { firstNames, lastNames, genre, birth, email, classroom, state } =
      this.formStudent.getRawValue();

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

    this.studentsService.editStudent(this.idStudent, data);

    this.formStudent.reset();
    formGroupDirective.resetForm();
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

    this.formStudent.patchValue({
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
