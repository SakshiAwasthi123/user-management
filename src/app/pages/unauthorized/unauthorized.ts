import { Component } from '@angular/core';
 
@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="container text-center mt-5">
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  `
})
export class Unauthorized {}
