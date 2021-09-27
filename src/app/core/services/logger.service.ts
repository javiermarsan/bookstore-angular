import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  info(msg: string) {
    console.log(msg);
  }

  error(msg: string) {
    console.error(msg);
  }
}
