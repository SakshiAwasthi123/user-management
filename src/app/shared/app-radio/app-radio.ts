import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControl } from '../form-control.base';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-radio.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppRadio),
    multi: true
  }]
})
export class AppRadio extends BaseFormControl<any> {

  @Input() label = '';
  @Input() options: { label: string; value: any }[] = [];
  @Input() errorMessage = '';

  select(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
