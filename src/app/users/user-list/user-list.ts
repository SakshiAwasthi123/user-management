import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
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
  @ViewChild('table') table!: SharedTable;

  constructor(
    private service: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.users = this.service.getUsers();
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
  }
}
