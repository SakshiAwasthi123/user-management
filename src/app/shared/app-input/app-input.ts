import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-input.html',
  styleUrls: ['./app-input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true
    }
  ]
})
export class AppInput implements ControlValueAccessor {

  @Input() label = '';
  @Input() type = 'text';
  @Input() errorMessage = '';

  @Input() value: any; 
  @Output() valueChange = new EventEmitter<any>(); 

  disabled = false;

  onChange = (val: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(val: any) {
    this.value = val;
    this.valueChange.emit(val);   
    this.onChange(val);           
    this.onTouched();
  }
}
