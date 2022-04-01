import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
]
@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes),ReactiveFormsModule,FormsModule],
  declarations: [
    LoginComponent
  ],
})
export class UtilisateurModule {}
