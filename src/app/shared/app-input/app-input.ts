import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-input.html'
})
export class AppInput {
  @Input() label = '';
  @Input() type = 'text';
  @Input() value: any;
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<any>();

  onInput(val: any) {
    this.valueChange.emit(val);
  }
}
