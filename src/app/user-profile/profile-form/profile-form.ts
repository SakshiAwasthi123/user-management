import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../models/profile.model';

import { AppInput } from '../../shared/app-input/app-input';
import { AppSelect } from '../../shared/app-select/app-select';
import { AppButton } from '../../shared/app-button/app-button';

@Component({
  standalone: true,
  selector: 'app-profile-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppInput,
    AppSelect,
    AppButton
  ],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.scss']
})
export class ProfileForm implements OnInit, OnDestroy {

  form!: FormGroup;
  skills: string[] = [];

  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private service: ProfileService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      department: this.fb.control('', Validators.required),
      skillInput: this.fb.control('')
    });

    this.sub = this.service.profile$.subscribe(profile => {
      if (profile) {
        this.form.patchValue(profile);
        this.skills = [...(profile.skills || [])];
      }
    });
  }

  // ───────────── Typed getters (IMPORTANT) ─────────────

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get department(): FormControl {
    return this.form.get('department') as FormControl;
  }

  get skillInput(): FormControl {
    return this.form.get('skillInput') as FormControl;
  }

  // ───────────── Skills logic ─────────────

  addSkill(): void {
    const value = this.skillInput.value?.trim();
    if (!value) return;

    this.skills.push(value);
    this.skillInput.reset();
  }

  removeSkill(index: number): void {
    this.skills.splice(index, 1);
  }

  // ───────────── Save ─────────────

  save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const payload: Profile = {
      ...this.form.value,
      skills: this.skills
    };

    this.service.save(payload);
    alert('Profile Updated Successfully');
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
