import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControl } from '../form-control.base';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-select.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppSelect),
    multi: true
  }]
})
export class AppSelect extends BaseFormControl<any> {

  @Input() label = '';
  @Input() options: any[] = [];
  @Input() placeholder = 'Select';
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() errorMessage = '';
}
