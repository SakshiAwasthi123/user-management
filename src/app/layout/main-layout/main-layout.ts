import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';


@Component({
  standalone:true,
  selector:'app-main-layout',
  imports:[Navbar,RouterOutlet],
  template:`<app-navbar></app-navbar><router-outlet></router-outlet>`
})
export class MainLayout {}
