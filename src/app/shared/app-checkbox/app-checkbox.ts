import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-checkbox.html'
})
export class AppCheckbox {
  @Input() label = '';
  @Input() value = false;

  @Output() valueChange = new EventEmitter<boolean>();

  toggle(val: boolean) {
    this.valueChange.emit(val);
  }
}
