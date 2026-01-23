import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-input.html'
})
export class AppInput {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'number' | 'password' = 'text';
  @Input() value: any;
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<any>();

  onChange(val: any) {
    this.valueChange.emit(val);
  }
}
