import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../models/profile.model';
import { ProfilePreview } from '../profile-preview/profile-preview';

@Component({
  standalone: true,
  selector: 'app-profile-preview-page',
  imports: [CommonModule, RouterModule, ProfilePreview],
  templateUrl: './profile-preview-page.html',
  styleUrls: ['./profile-preview-page.scss']
})
export class ProfilePreviewPage {
  profile!: Profile;

  constructor(private service: ProfileService) {
    const saved = this.service.get();
    if (saved) this.profile = saved;
  }
}
