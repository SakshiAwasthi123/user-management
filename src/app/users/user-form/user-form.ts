import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';
import { MatCardModule } from '@angular/material/card';
import { AppButton } from '../../shared/app-button/app-button';
import { AppInput } from '../../shared/app-input/app-input';
import { AppSelect } from '../../shared/app-select/app-select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    AppButton,
    AppInput,
    AppSelect
  ],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserForm implements OnInit {

  form!: FormGroup;
  id!: number | null;

  departments = ['HR', 'Tech', 'Finance', 'Sales', 'Marketing'];
  roles = ['Admin', 'Manager', 'User'];
  statuses = ['Active', 'Inactive'];

  departmentOptions = this.departments.map(d => ({ label: d, value: d }));
  roleOptions = this.roles.map(r => ({ label: r, value: r }));
  statusOptions = this.statuses.map(s => ({ label: s, value: s }));


  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id:[0],
      name:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      department:['', Validators.required],
      role:['', Validators.required],
      status:['Active', Validators.required]
    });


    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      if(id){
        this.id = +id;
        const user = this.service.getUserById(this.id);
        if(user) this.form.patchValue(user);
      }
    });
  }

  submit(){
    if(this.form.invalid) return;
    this.service.save(this.form.value as any);
    this.router.navigateByUrl('/users/list');
  }

  goBack(){
    this.router.navigateByUrl('/users/list');
  }

}
