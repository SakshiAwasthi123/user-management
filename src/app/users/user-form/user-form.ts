import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { UserService } from '../../core/services/user.service';
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
  id: number | null = null;

  errorMsg = '';
  successMsg = '';

  departments = ['HR', 'Tech', 'Finance'];

  departmentOptions = this.departments.map(d => ({
    label: d,
    value: d
  }));

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

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      department: this.fb.control('', Validators.required),
      employedType: this.fb.control('', Validators.required),
      company: this.fb.control(''),
      status: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
      skills: this.fb.array<FormControl<string>>([]),
      agree: this.fb.control(false, Validators.requiredTrue),
      role: this.fb.control('User')
    });

    this.employedType.valueChanges.subscribe(value => {
      if (value === 'employed') {
        this.company.setValidators(Validators.required);
      } else {
        this.company.clearValidators();
        this.company.setValue('');
      }
      this.company.updateValueAndValidity();
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.id = +id;
        const user = this.service.getUserById(this.id);

        if (user) {
          this.form.patchValue(user);

          if (user.skills?.length) {
            user.skills.forEach((s: string) => {
              this.skillsArray.push(
                new FormControl<string>(s, {
                  nonNullable: true,
                  validators: Validators.required
                })
              );
            });
          }
        }
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.errorMsg = '';
      this.successMsg = '';
    });
  }


  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get department(): FormControl {
    return this.form.get('department') as FormControl;
  }

  get employedType(): FormControl {
    return this.form.get('employedType') as FormControl;
  }

  get company(): FormControl {
    return this.form.get('company') as FormControl;
  }

  get status(): FormControl {
    return this.form.get('status') as FormControl;
  }

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  get agree(): FormControl {
    return this.form.get('agree') as FormControl;
  }


  get skillsArray(): FormArray<FormControl<string>> {
    return this.form.get('skills') as FormArray<FormControl<string>>;
  }

  get skillsControls(): FormControl<string>[] {
    return this.skillsArray.controls;
  }

  addSkill(): void {
    this.skillsArray.push(
      new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required
      })
    );
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  // ───────────── Submit ─────────────

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.errorMsg = 'Please fix form errors';
      return;
    }

    const data = { ...this.form.value };

    data.status =
      data.status?.toLowerCase() === 'active'
        ? 'Active'
        : 'Inactive';

    this.service.save(data);

    this.successMsg = this.id
      ? 'User updated successfully!'
      : 'User added successfully!';

    setTimeout(() => {
      this.router.navigateByUrl('/users/list');
    }, 1200);
  }

  goBack(): void {
    this.router.navigateByUrl('/users/list');
  }
}
