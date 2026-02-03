import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements AfterViewInit {

  activities = [
    { user: 'John Smith', action: 'Created User', status: 'Completed', date: '01 Feb 2026' },
    { user: 'Emily Stone', action: 'Updated Profile', status: 'Completed', date: '01 Feb 2026' },
    { user: 'David Lee', action: 'Deleted User', status: 'Pending', date: '31 Jan 2026' },
    { user: 'Sara Khan', action: 'Reset Password', status: 'Completed', date: '31 Jan 2026' },
    { user: 'Alex Brown', action: 'Deactivated User', status: 'Completed', date: '30 Jan 2026' },
    { user: 'Rahul Verma', action: 'Added Role', status: 'Completed', date: '30 Jan 2026' },
    { user: 'Neha Sharma', action: 'Profile Updated', status: 'Completed', date: '29 Jan 2026' }
  ];

  ngAfterViewInit(): void {
    this.userChart();
    this.activityChart();
    this.growthChart();
  }

  userChart(): void {
    new Chart('userChart', {
      type: 'doughnut',
      data: {
        labels: ['Admins', 'Managers', 'HR', 'Active Users', 'Inactive Users', 'Guests'],
        datasets: [{
          data: [15, 20, 25, 100, 30, 10],
          backgroundColor: ['#4f46e5', '#06b6d4', '#0ea5e9', '#22c55e', '#ef4444', '#f59e0b'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        layout: { padding: 20 },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 14, padding: 12 }
          }
        }
      }
    });
  }

  activityChart(): void {
    new Chart('activityChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'User Actions',
          data: [45, 60, 52, 75, 68, 90, 82],
          backgroundColor: '#3b82f6',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  growthChart(): void {
    new Chart('growthChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Total Users',
          data: [100, 120, 140, 155, 170, 180, 195],
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

}
