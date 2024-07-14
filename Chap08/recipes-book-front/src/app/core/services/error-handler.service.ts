import { ErrorHandler, Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any): void {
       alert(error.message);
    }
}
