import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.html'
})
export class AppButton {
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
