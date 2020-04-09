import { Routes } from '@angular/router';
import { PvgfpAddFormComponent } from './components/pvgfp-add-form/pvgfp-add-form.component';
import { PvgfpListFormsComponent } from './components/pvgfp-list-forms/pvgfp-list-forms.component';
import { AuthGuard } from './_helpers';
export const routes: Routes = [
  {
    path: '',
    component: PvgfpListFormsComponent,
    canActivate: [AuthGuard]
  },
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
    path: 'form-list',
    component: PvgfpListFormsComponent,
    canActivate: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
