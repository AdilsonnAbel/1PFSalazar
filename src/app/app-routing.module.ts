import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { EditComponent } from './components/edit/edit.component';
import { FormComponent } from './components/form/form.component';
import { LookComponent } from './components/look/look.component';

const routes: Routes = [
  { path: 'look', component: LookComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'edit', component: EditComponent },
  { path: 'rooms/:roomName', component: ContentComponent },
  { path: '', redirectTo: '/look', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', redirectTo: '/look', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
