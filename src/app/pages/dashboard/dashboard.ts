import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  cards = [
    { title: 'Total Users', value: 128 },
    { title: 'Active Users', value: 96 },
    { title: 'Admins', value: 12 },
    { title: 'Departments', value: 5 }
  ];
}
