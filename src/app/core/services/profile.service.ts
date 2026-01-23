import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private PROFILE_KEY = 'profile';
  private subject = new BehaviorSubject<Profile | null>(this.get());
  profile$ = this.subject.asObservable();

  save(p: Profile) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(p));
    this.subject.next(p);
  }

  saveProfile(p: Profile) {
    this.save(p);
  }

  get(): Profile | null {
    const data = localStorage.getItem(this.PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  }

  reset() {
    localStorage.removeItem(this.PROFILE_KEY);
    this.subject.next(null);
  }
}
