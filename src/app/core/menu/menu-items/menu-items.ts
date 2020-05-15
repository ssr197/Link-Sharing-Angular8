import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'HOME',
    type: 'link',
    icon: 'md md-view-dashboard'
  },
  {
    state: 'profile',
    name: 'PROFILE',
    type: 'link',
    icon: 'md md-file-plus',
  },
  {
    state: 'newItem',
    name: 'ADD NEW',
    type: 'link',
    icon: 'md md-file-plus',
  }
];

const logOutItem = [
  {
    state: 'login',
    name: 'Login',
    type: 'link',
    icon: 'md md-view-dashboard'
  },
  {
    state: 'signup',
    name: 'Sign Up',
    type: 'link',
    icon: 'md md-file-plus',
  }
];



@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  getAllLogout(): Menu[] {
    return logOutItem;
  }
}
