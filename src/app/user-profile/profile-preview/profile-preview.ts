import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../../models/profile.model';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  standalone: true,
  selector: 'app-profile-card',
  imports: [CommonModule],
  templateUrl: './profile-preview.html',
  styleUrls: ['./profile-preview.scss']
})
export class ProfilePreview implements OnInit {

  @Input() profile!: Profile;

  constructor(private service: ProfileService) {}

  ngOnInit() {
    this.service.profile$.subscribe(p => {
      if (p) this.profile = p;
    });
  }

}
