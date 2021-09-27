import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  // https://www.typescriptlang.org/docs/handbook/advanced-types.html
  isString(x: any): x is string {
    return typeof x === 'string';
  }

  isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  randomNumber(): number {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    return random;
  }
}
