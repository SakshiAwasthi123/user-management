import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PdfService } from '../../core/services/pdf';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';


@Component({
  standalone:true,
  imports:[CommonModule,MatDialogModule,MatButtonModule, MatCardModule, MatIcon],
  templateUrl:'./user-details-dialog.html',
  styleUrls: ['./user-details-dialog.scss']
})
export class UserDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public user:any, private pdf:PdfService){}
  download(){ this.pdf.download(this.user); }
}
