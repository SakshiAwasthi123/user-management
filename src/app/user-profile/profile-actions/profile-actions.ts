import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  standalone:true,
  selector:'app-profile-actions',
  template:`<button class="danger" (click)="reset.emit()">Reset</button>`
})
export class ProfileActions{
  @Output() reset = new EventEmitter<void>();
}
