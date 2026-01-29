import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-wrapper.html'
})
export class FormWrapper {
  @Input() form!: FormGroup;
  @Output() submitted = new EventEmitter<void>();

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
        return; 
    }

    this.submitted.emit(); 
    }

}
