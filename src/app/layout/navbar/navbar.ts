import { Component, HostListener } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { MENU } from '../menu.config';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {

  menu: any[] = MENU;

  open = false;
  activeIndex: number | null = null;
  openDesktopIndex: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.applyRoleFilter();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeAll();
      });
  }


  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }


  applyRoleFilter() {

    if (!this.auth.isLoggedIn()) {
      this.menu = [...MENU];
      return;
    }

    const role = this.auth.getRole();

    this.menu = MENU
      .map(m => {

        if (m.roles && !m.roles.includes(role!)) {
          return null;
        }

        if (m.children) {
          const allowedChildren = m.children.filter(c => {
            if (!c.roles) return true;
            return c.roles.includes(role!);
          });

          if (allowedChildren.length === 0) {
            return null;
          }

          return {
            ...m,
            children: allowedChildren
          };
        }

        return m;
      })
      .filter(m => m !== null);
  }


  toggleMenu() {
    this.open = !this.open;

    if (this.open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }

  toggleSub(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }

  toggleDesktop(i: number) {
    this.openDesktopIndex = this.openDesktopIndex === i ? null : i;
  }

  closeAll() {
    this.open = false;
    this.activeIndex = null;
    this.openDesktopIndex = null;

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  logout() {
    this.auth.logout();
    this.closeAll();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: any) {
    if (!event.target.closest('.dropdown')) {
      this.openDesktopIndex = null;
    }
  }
}
