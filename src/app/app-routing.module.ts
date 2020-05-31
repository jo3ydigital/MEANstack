import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-list' },
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user/:id', component: UserEditComponent },
  { path: 'user-list', component: UserListComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }