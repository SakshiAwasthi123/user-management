import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-radio.html'
})
export class AppRadio {
  @Input() label = '';
  @Input() options: { label: string; value: any }[] = [];
  @Input() selectedValue: any;

  @Output() valueChange = new EventEmitter<any>();

  onChange(val: any) {
    this.valueChange.emit(val);
  }
}
