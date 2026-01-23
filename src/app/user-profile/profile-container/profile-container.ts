import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileForm } from '../profile-form/profile-form';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  standalone: true,
  selector: 'app-profile-container',
  imports: [CommonModule, ProfileForm],
  templateUrl: './profile-container.html',
  styleUrls: ['./profile-container.scss']
})
export class ProfileContainer {

  profile!: Profile | null;
  saved = false;

  constructor(
    private service: ProfileService,
    private router: Router
  ) {
    const p = this.service.get();
    if (p) {
      this.profile = p;
      this.saved = true;
    }
  }

  onSaved(profile: Profile) {
    this.profile = profile;
    this.saved = true;
    this.service.save(profile);
  }

  onReset() {
    this.profile = null;
    this.saved = false;
    this.service.reset();
  }

  openPreview() {
    this.router.navigate(['/profile/preview']);
  }

}
