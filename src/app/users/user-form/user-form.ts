import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { MatCardModule } from '@angular/material/card';

import { AppButton } from '../../shared/app-button/app-button';
import { AppInput } from '../../shared/app-input/app-input';
import { AppSelect } from '../../shared/app-select/app-select';
import { AppCheckbox } from '../../shared/app-checkbox/app-checkbox';
import { AppRadio } from '../../shared/app-radio/app-radio';
import { FormWrapper } from '../../shared/form-wrapper/form-wrapper';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    AppButton,
    AppInput,
    AppSelect,
    AppCheckbox,
    AppRadio,
    FormWrapper
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserForm implements OnInit {

  form!: FormGroup;
  id!: number | null;
  showToast = false;

  departments = ['HR', 'Tech', 'Finance'];
  departmentOptions = this.departments.map(d => ({ label: d, value: d }));

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  employmentOptions = [
    { label: 'Student', value: 'student' },
    { label: 'Employed', value: 'employed' },
    { label: 'Unemployed', value: 'unemployed' }
  ];

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
      employedType: ['', Validators.required],
      company: [''],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      skills: this.fb.array([]),
      agree: [false, Validators.requiredTrue],
      role: ['User']
    });


    this.form.get('employedType')?.valueChanges.subscribe(val => {
      const company = this.form.get('company');
      if (val === 'employed') {
        company?.setValidators(Validators.required);
      } else {
        company?.clearValidators();
        company?.setValue('');
      }
      company?.updateValueAndValidity();
    });

    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id) {
        this.id = +id;
        const user = this.service.getUserById(this.id);
        if (user) this.form.patchValue(user);
      }
    });
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const data = this.form.value;

    data.status =
      data.status?.toLowerCase() === 'active'
        ? 'Active'
        : 'Inactive';

    this.service.save(data);

    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.router.navigateByUrl('/users/list');
    }, 1500);
  }


  goBack() {
    this.router.navigateByUrl('/users/list');
  }
}
