import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import {
  ControlSearch,
  Student,
  typeClassroom,
  typeNames,
} from 'src/app/interfaces/student';
import { ActivatedRoute } from '@angular/router';

import { valRoomName } from 'src/app/utils/validations';
import { map, Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { regexFN } from 'src/app/utils/regexs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  private _displayedColumns: string[] = [
    'position',
    'names',
    'genre',
    'birth',
    'state',
    'actions',
  ];
  private _classroom$!: Observable<Student[]>;
  private _filteredClassroom$!: Observable<Student[]>;
  private _subscription!: Subscription;
  private _searchStudent: FormGroup<ControlSearch> = this.formBuilder.group({
    search: ['', Validators.pattern(regexFN)],
  });

  constructor(
    private studentsService: StudentsService,
    private formBuilder: NonNullableFormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._subscription = this.route.paramMap.subscribe((e) => {
      const rM: string | null = e.get('roomName');

      if (rM && valRoomName(rM)) {
        this._classroom$ = this.studentsService.getClassroom$(
          rM as typeClassroom
        );
      }

      this._filteredClassroom$ = this._classroom$;
      this._searchStudent.reset();
      this._searchStudent.markAllAsTouched();
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  get searchStudent(): FormGroup<ControlSearch> {
    return this._searchStudent;
  }

  get displayedColumns(): string[] {
    return this._displayedColumns;
  }

  get search(): FormControl {
    return this._searchStudent.controls.search;
  }

  get filteredClassroom$(): Observable<Student[]> {
    return this._filteredClassroom$;
  }

  public searchInvalid(): string {
    return this._searchStudent.controls.search.errors?.['pattern']
      ? 'Only letters and a space to divide words are allowed.'
      : '';
  }
  public applyFilter() {
    const search: string = this._searchStudent
      .getRawValue()
      .search.trim()
      .toLowerCase();

    this._filteredClassroom$ = this._classroom$.pipe(
      map((d) =>
        d.filter(
          ({
            data: {
              names: { firstNames, lastNames },
            },
          }) =>
            `${lastNames.join(' ')} ${firstNames.join(' ')}`.includes(search)
        )
      )
    );
  }

  public addStudent(signal: boolean): void {
    this.dialog.open(FormComponent, {
      data: { signal },
    });
  }
  public editStudent(signal: boolean, student: Student): void {
    this.dialog.open(FormComponent, {
      data: { signal, student },
    });
  }

  public deleteStudent(id: number, names: typeNames): void {
    this.dialog.open(ConfirmationComponent, {
      data: { id, names },
    });
  }
}
