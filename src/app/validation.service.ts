import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  validateCounter(counter: number) { return counter > 0 && counter < 5; }

}
