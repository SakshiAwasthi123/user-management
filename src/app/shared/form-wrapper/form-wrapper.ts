import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-wrapper',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-wrapper.html'
})
export class FormWrapper {
  @Input() form!: FormGroup;
  @Output() submitted = new EventEmitter<void>();
}
