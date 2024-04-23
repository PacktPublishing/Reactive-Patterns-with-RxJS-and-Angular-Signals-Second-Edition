import { TestBed } from '@angular/core/testing';

import { SampleService } from './sample.service';
import { toArray } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

fdescribe('SampleService', () => {
  let scheduler : TestScheduler;
  let service: SampleService;

  beforeEach(() => {
    service = TestBed.inject(SampleService);
    scheduler = new TestScheduler((actual, expected) => { 
      expect(actual).toEqual(expected); 
    }); 
  });

  it('should return true as a value', (done) => {
    service.getValue(true).subscribe(
      result => {
        expect(result).toEqual(true);
        done();
      }
    );
  });

  it('should return values in the right order', (done) => {
    const expectedValues = ['Hello', 'Packt', 'Readers'];
    let index = 0;
    service.getValues().subscribe(result => {
      expect(result).toBe(expectedValues[index]);
      index++;
      if (index === expectedValues.length) {
        done();
      }
    });
  });

  it('should return values in the right order', (done) => {
    const expectedValues = ['Hello', 'Packt', 'Readers'];
    service.getValues().pipe(toArray()).subscribe(result => {
      expect(result).toEqual(expectedValues);
      done();
    });
  });



});


describe('Service: SampleService', () => { 

  let scheduler : TestScheduler; 
  let service: SampleService; 

  beforeEach(() => { 
      service = TestBed.inject(SampleService); 
      scheduler = new TestScheduler((actual, expected) => { 
      expect(actual).toEqual(expected); 
    }); 
  });

  it('should return values in the right order', () => { 
    scheduler.run(({expectObservable}) => { 
    const expectedMarble = '(abc|)' ; 
    const expectedValues = {a:'Hello', b:'Packt',  
    c:'Readers'}; 
    expectObservable(service.getValues()).toBe( 
    expectedMarble, expectedValues) 
    }); 
  }); 

});