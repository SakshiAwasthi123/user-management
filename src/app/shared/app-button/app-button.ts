import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.html'
})
export class AppButton {
  @Input() label = 'Submit';
  @Input() type: 'button' | 'submit' = 'submit';
  @Input() disabled: boolean | null = false;

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
