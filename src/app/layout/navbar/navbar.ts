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
  scrolled = false;

  dropdownTimeout: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.applyRoleFilter();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.closeAll());
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
        if (m.roles && !m.roles.includes(role!)) return null;

        if (m.children) {
          const allowedChildren = m.children.filter(c => {
            if (!c.roles) return true;
            return c.roles.includes(role!);
          });

          if (!allowedChildren.length) return null;

          return { ...m, children: allowedChildren };
        }

        return m;
      })
      .filter(m => m !== null);
  }

  toggleMenu() {
    this.open = !this.open;
    document.body.style.overflow = this.open ? 'hidden' : '';
  }

  toggleSub(i: number) {
    this.activeIndex = this.activeIndex === i ? null : i;
  }

  // 🔥 NEW (fix fast hide issue)
  openDropdown(i: number) {
    clearTimeout(this.dropdownTimeout);
    this.openDesktopIndex = i;
  }

  closeDropdown() {
    this.dropdownTimeout = setTimeout(() => {
      this.openDesktopIndex = null;
    }, 200);
  }

  closeAll() {
    this.open = false;
    this.activeIndex = null;
    this.openDesktopIndex = null;
    document.body.style.overflow = '';
  }

  logout() {
    this.auth.logout();
    this.closeAll();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: any) {
    if (!event.target.closest('.dropdown')) {
      this.openDesktopIndex = null;
    }
  }
}
