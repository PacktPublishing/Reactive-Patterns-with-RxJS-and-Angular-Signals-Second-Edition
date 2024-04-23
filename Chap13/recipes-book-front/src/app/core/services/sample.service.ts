import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor() { }
  getValue(value: boolean): Observable<boolean> { 
    return of(value); 
  }
  getValues(): Observable<String> { 

    return of('Hello', 'Packt', 'Readers'); 

  }  
}
