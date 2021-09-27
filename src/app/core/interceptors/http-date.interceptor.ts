import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateHelper } from '../helpers/date-helper';
import * as moment from 'moment';

@Injectable()
export class HttpDateInterceptor implements HttpInterceptor {
  //private _dateFormat = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/; //dd/MM/yyyy HH:mm:ss
  //private _isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?Z$/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map((val: HttpEvent<any>) => {
      if (val instanceof HttpResponse){
        const body = val.body;
        this.responseConvert(body);
      }
      return val;
    }));
  }

  // Interceptem les crides http que rebem i convertim a tipus Date els strings que vinguin en el format correcte
  private responseConvert(body: any){
    if (body === null || body === undefined ) {
      return body;
    }
    if (typeof body !== 'object' ){
      return body;
    }
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isDateString(value)) {
        //const date = moment(value, 'DD/MM/YYYY HH:mm:ss').toDate();
        const date = moment(value,'YYYY-MM-DDTHH:mm:ss').toDate();
        body[key] = date;
      } 
      else if (typeof value === 'object') {
        this.responseConvert(value);
      }
    }
  }

  private isDateString(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === 'string') {
      //return this._dateFormat.test(value);

      const format1 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/; //yyyy-MM-ddTHH:mm:ss
      const format2 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)$/; //yyyy-MM-ddTHH:mm:ss.xx

      const ok = format1.test(value) || format2.test(value);
      return ok;
    }    
    return false;
  }
}
