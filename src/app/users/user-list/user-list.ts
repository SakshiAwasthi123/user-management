import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { SharedTable } from '../../components/shared-table/shared-table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDetailsDialog } from '../../components/user-details-dialog/user-details-dialog';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, SharedTable, MatDialogModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserList implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchText = '';

  constructor(
    private service: UserService,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.users = this.service.getUsers();
    this.filteredUsers = [...this.users];
  }

  onSearch(value: string) {
    this.searchText = value.toLowerCase();

    this.filteredUsers = this.users.filter(u =>
      Object.values(u).some(v =>
        String(v).toLowerCase().includes(this.searchText)
      )
    );
  }

  exportCSV() {
    if (!this.filteredUsers.length) return;

    const rows = this.filteredUsers;
    const headers = Object.keys(rows[0] || {});
    const csv = [
      headers.join(','),
      ...rows.map(r => headers.map(h => `"${r[h] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'users.csv';
    a.click();
  }

  open(user: any) {
    this.dialog.open(UserDetailsDialog, {
      data: user,
      width: '500px'
    });
  }

  goEdit(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  delete(id: number) {
    this.service.delete(id);
    this.users = this.service.getUsers();
    this.filteredUsers = [...this.users];
  }

  goAdd() {
    this.router.navigate(['/users/add']);
  }
}
