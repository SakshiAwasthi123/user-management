import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-checkbox.html'
})
export class AppCheckbox {
  @Input() label = '';
  @Input() value = false;

  @Output() valueChange = new EventEmitter<boolean>();

  onChange(val: boolean) {
    this.valueChange.emit(val);
  }
}
