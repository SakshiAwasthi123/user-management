import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-select.html',
  styleUrls: ['./app-select.scss'],   
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelect),
      multi: true
    }
  ]
})
export class AppSelect implements ControlValueAccessor {

  @Input() label = '';
  @Input() options: { label: string; value: any }[] = [];

  @Input() selectedValue: any; 
  @Input() errorMessage = '';        // ✅ ADDED

  @Output() selectionChange = new EventEmitter<any>(); 

  disabled = false;

  onChange = (val: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.selectedValue = val;
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

  handleChange(val: any) {
    this.selectedValue = val;
    this.selectionChange.emit(val); 
    this.onChange(val);            
    this.onTouched();
  }
}
