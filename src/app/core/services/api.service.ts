import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtService } from './jwt.service';
import { AppConfigService } from './app-config.service';
import { ApiErrors, ApiError } from '../models/api-errors.model';
import * as moment from 'moment';

// ------------------------------------------
//              Attention!
// ------------------------------------------
// Request --> this.stringifyConvert()
//    Clone object to convert Date type properties to string
// ------------------------------------------ 
// Response --> HttpDateInterceptor (core/interceptors/http-date.interceptor.ts):
//    If we receive from the web api strings with date format we convert them to object of type Date
// ------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private pathAuthToken = '/token/authenticate';
  //private pathAuthRefreshToken = '/auth/refresh';
  private webApi = AppConfigService.settings.webApi;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  private formatErrors(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 0) {
      return throwError('Http connection error');
    }
    else if (errorResponse.status === 401) {
      return throwError('Error 401 Unauthorized');
    }
    else {
      const error = errorResponse.error;
      return throwError(error);
    }
  }

  private createHttpParams(props: object): HttpParams {
    const params = {};

    Object.keys(props)
    .forEach((key) => {
      params[key] = props[key];
    });

    return new HttpParams({ fromObject: params });
  }

  // core/interceptors/HttpTokenInterceptor
  /*let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${this.jwtService.getToken()}`);
  }*/

  private jsonHeaders() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
  
  public async authToken(username: string, password: string): Promise<any> {
    const path = this.pathAuthToken;
    const body = {
      username: username,
      password: password
    };

    return await this.http.post(
      `${this.webApi.url}${path}`,
      this.stringify(body),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  /*public async authRefreshToken(token: string, refreshToken: string): Promise<any> {
    const path = this.pathAuthRefreshToken;
    const data = 'token=' + token + '&refreshToken=' + refreshToken;

    return await this.http.post(
      `${this.webApi.url}${path}`,
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }*/

  public async get(path: string, params: object = {}): Promise<any> {
    const parameters: HttpParams = this.createHttpParams(params);
    return await this.http.get(`${this.webApi.url}${path}`,
      {
        params: parameters,
        headers: this.jsonHeaders()
      })
      .pipe(catchError(this.formatErrors)).toPromise();
  }

  public async delete(path): Promise<any> {
    return await this.http.delete(
      `${this.webApi.url}${path}`,
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  public async put(path: string, body: object = {}): Promise<any> {
    return await this.http.put(
      `${this.webApi.url}${path}`,
      this.stringify(body),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  public async post(path: string, body: object = {}): Promise<any> {
    return await this.http.post(
      `${this.webApi.url}${path}`,
      this.stringify(body),
      { headers: this.jsonHeaders() }
    ).pipe(catchError(this.formatErrors)).toPromise();
  }

  private stringify(body: any): string {
    const sendBody: any = this.stringifyConvert(body);
    const result: string = JSON.stringify(sendBody);
    return result;
  }

  // we clone the object, the internal elements that are Date we convert them to string
  private stringifyConvert(body: any): any{
    if (body === null || body === undefined ) {
      return body;
    }
    if (typeof body !== 'object' ){
      return body;
    }
    
    let result: Array<any> | object = null;
    if (Array.isArray(body)){
      result = [];
    }
    else {
      result = {};
    }
    
    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        //result[key] = moment(value).format('DD/MM/YYYY HH:mm:ss');
        result[key] = moment(value).format('YYYY-MM-DDTHH:mm:ss');
      } 
      else if (typeof value === 'object') {
        result[key] = this.stringifyConvert(value);
      }
      else {
        result[key] = value;
      }
    }
    return result;
  }

  public async postFile(path: string, body: object = {}): Promise<any> {
    return await this.http.post(
        `${this.webApi.url}${path}`,
        body,
        { headers: {} }
      ).pipe(catchError(this.formatErrors)).toPromise();
  }

  public async getFile(path: string, params: object = {}): Promise<any> {
    const parameters: HttpParams = this.createHttpParams(params);
    return await this.http.get(`${this.webApi.url}${path}`,
        {
          headers: {},
          params: parameters,
          responseType: 'blob'
        })
      .pipe(catchError(this.formatErrors)).toPromise();
  }
}
