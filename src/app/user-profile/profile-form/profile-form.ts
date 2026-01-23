import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import { Profile } from '../../models/profile.model';

@Component({
  standalone: true,
  selector: 'app-profile-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.scss']
})
export class ProfileForm implements OnInit {

  form!: FormGroup;
  skills: string[] = [];

  constructor(private fb: FormBuilder, private service: ProfileService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      skillInput: ['']
    });

    this.service.profile$.subscribe(p => {
      if (p) {
        this.form.patchValue(p);
        this.skills = [...(p.skills || [])];
      }
    });
  }

  addSkill() {
    const v = this.form.get('skillInput')?.value?.trim();
    if (v) {
      this.skills.push(v);
      this.form.get('skillInput')?.reset();
    }
  }

  removeSkill(i: number) {
    this.skills.splice(i, 1);
  }

  save() {
    if (this.form.valid) {
      const payload: Profile = {
        ...this.form.value,
        skills: this.skills
      };
      this.service.save(payload);
      alert('Profile Updated Successfully');
    }
  }
}
