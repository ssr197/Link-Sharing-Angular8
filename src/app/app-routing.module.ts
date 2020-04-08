import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login';
import { PvgfpAddFormComponent } from './components/pvgfp-add-form/pvgfp-add-form.component';
import { PvgfpListFormsComponent } from './components/pvgfp-list-forms/pvgfp-list-forms.component';
import { PvgfpTestFormComponent } from './components/pvgfp-test-form/pvgfp-test-form.component';
import { AuthGuard } from './_helpers';
export const routes: Routes = [
  {
    path: '',
    component: PvgfpListFormsComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'form-add',
    component: PvgfpAddFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form-edit/:id',
    component: PvgfpAddFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form-test',
    component: PvgfpTestFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form-list',
    component: PvgfpListFormsComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
