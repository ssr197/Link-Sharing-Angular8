import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers';
import { LsLoginComponent } from './components/ls-login/ls-login.component';

export const routes: Routes = [
  {
    path: '',
    component: LsLoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LsLoginComponent,
    canActivate: [AuthGuard]
  },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
