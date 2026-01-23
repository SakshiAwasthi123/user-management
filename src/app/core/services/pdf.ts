import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn:'root' })
export class PdfService {

  download(user:any){
    const doc = new jsPDF();

    doc.text('User Details',14,15);

    autoTable(doc,{
      startY:25,
      head:[['Field','Value']],
      body:[
        ['Name',user.name],
        ['Email',user.email],
        ['Department',user.department],
        ['Role',user.role],
        ['Status',user.status]
      ]
    });

    doc.save(user.name + '_details.pdf');
  }
}
