import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-home.html',
  styleUrls: ['./public-home.scss']
})
export class PublicHome implements OnInit {
  slides = [
  {
    image: 'assets/slider/slide1.jpg',
    title: 'User Management System',
    text: 'Manage users, roles and permissions easily'
  },
  {
    image: 'assets/slider/slide2.jpg',
    title: 'Product & Inventory',
    text: 'Track and manage your products efficiently'
  },
  {
    image: 'assets/slider/slide3.jpg',
    title: 'Reports & Analytics',
    text: 'Generate monthly and yearly reports quickly'
  }
];



  currentSlide = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
