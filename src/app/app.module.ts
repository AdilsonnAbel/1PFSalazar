import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FormComponent } from './components/form/form.component';
import { LookComponent } from './components/look/look.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { MaterialModule } from './modules/material/material.module';
import { StateDirective } from './directives/state.directive';
import { ClassroomPipe } from './pipes/classroom.pipe';
import { NamesPipe } from './pipes/names.pipe';
import { CoursesComponent } from './components/courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    ContentComponent,
    FormComponent,
    LookComponent,
    ConfirmationComponent,
    StateDirective,
    ClassroomPipe,
    NamesPipe,
    CoursesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
