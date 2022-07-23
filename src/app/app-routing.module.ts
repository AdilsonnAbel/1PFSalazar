import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LookComponent } from './components/look/look.component';

const routes: Routes = [
  { path: 'look', component: LookComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'rooms/:roomName', component: ContentComponent },
  { path: '', redirectTo: '/look', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', redirectTo: '/look', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
