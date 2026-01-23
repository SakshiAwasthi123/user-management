import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MENU, MenuItem } from '../../layout/menu.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

  currentYear = new Date().getFullYear();

  menu: MenuItem[] = [];

  constructor(private auth: AuthService) {
    this.applyRoleFilter();
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
      .filter((m): m is MenuItem => m !== null);
  }
}
