import { Routes } from '@angular/router';
import { LsLoginComponent } from './components/ls-login/ls-login.component';
import { LsSignUpComponent } from './components/ls-sign-up/ls-sign-up.component';
import { LsProfileComponent } from './components/ls-profile/ls-profile.component';
import { LsHomeComponent } from './components/ls-home/ls-home.component';
import { LsNewItemComponent } from './components/ls-new-item/ls-new-item.component';
import { LsForgetPasswordComponent } from './components/ls-forget-password/ls-forget-password.component'


export const routes: Routes = [
  {
    path: '',
    component: LsLoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LsLoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: LsSignUpComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: 'forgetPassword',
    component: LsForgetPasswordComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: 'home',
    component: LsHomeComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    component: LsProfileComponent,
    // canActivate: [AuthGuard]
  },

  {
    path: 'newItem',
    component: LsNewItemComponent,
    // canActivate: [AuthGuard]
  },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
