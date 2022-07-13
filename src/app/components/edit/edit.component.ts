import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentId } from 'src/app/interfaces/student';
import { Validation } from 'src/app/utils/validations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public searchStudent = this.formBuilder.group(
    {
      search: [{ id: 0, name: '' }, Validators.required],
    },
    {
      validators: Validation.known(
        'search',
        this.studentService.getStudentsName()
      ),
    }
  );
  public filteredOptions!: Observable<StudentId[]>;

  private options: StudentId[] = [];

  constructor(
    public dialog: MatDialog,
    private formBuilder: NonNullableFormBuilder,
    private studentService: StudentsService,
    private router: Router
  ) {}

  public openDialog() {
    const { id, name } = this.searchStudent.getRawValue().search;
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: { name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStudent(id);
      }
    });
  }

  public ngOnInit() {
    this.options = this.studentService.getStudentIds();
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = this.stringValue(value);
        return name ? this.filter(name) : this.options.slice();
      })
    );
  }

  get search(): FormControl<string | StudentId | any> {
    return this.searchStudent.controls.search;
  }

  public searchInvalid(): string {
    if (this.search?.errors?.['required']) return 'A student name is required.';
    return this.search?.errors?.['pattern']
      ? 'Only letters and a space to divide words are allowed.'
      : '';
  }

  public displayFn(student: StudentId): string {
    return student && student.name ? student.name : '';
  }

  private filter(name: string): StudentId[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private stringValue(value: string | StudentId): string {
    return typeof value === 'string' ? value : value.name;
  }
  private deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
