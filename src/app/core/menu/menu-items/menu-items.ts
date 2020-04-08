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
    state: 'form-list',
    name: 'DASHBOARD',
    type: 'link',
    icon: 'md md-view-dashboard'
  },
  {
    state: 'form-add',
    name: 'ADD NEW FORM',
    type: 'link',
    icon: 'md md-file-plus',
  }

  // {
  //   state: 'pv-form',
  //   name: 'Forms',
  //   type: 'sub',
  //   icon: 'icon-note icons',
  //   children: [
  //     {state: 'Add', name: 'Add'},
  //     {state: 'Edit', name: 'Edit'},
  //   ]
  // },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  // add(menu: Menu) {
  //   MENUITEMS.push(menu);
  // }
}
