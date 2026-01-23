import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        alert(err.error?.message || 'Network error');
        return throwError(() => err);
      })
    );
  }
}
