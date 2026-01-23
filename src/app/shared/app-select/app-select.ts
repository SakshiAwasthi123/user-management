import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-select.html'
})
export class AppSelect {

  @Input() label = '';
  @Input() options: { label: string; value: any }[] = [];
  @Input() selectedValue: any;

  @Output() selectionChange = new EventEmitter<any>();

  onChange(val: any) {
    this.selectionChange.emit(val);
  }
}
