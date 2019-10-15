import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'icon-chart-pie-36',
    class: ''
  },
  {
    path: '/heroes',
    title: 'Heroes',
    icon: 'icon-atom',
    class: ''
  },
  {
    path: '/register',
    title: 'Register',
    icon: 'icon-single-02',
    class: ''
  },
  {
    path: '/tasks',
    title: 'Tasks',
    icon: 'icon-align-center',
    class: ''
  },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
