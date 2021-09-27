import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { UserAccountService } from '../services/user-account.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private userService: UserAccountService,
    private jwtService: JwtService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {};

    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const headerContentType = req.headers.get('Content-Type');
    if (headerContentType) {
      headersConfig['Content-Type'] = headerContentType;
    }

    const headerAccept = req.headers.get('Accept');
    if (headerAccept) {
      headersConfig['Accept'] = headerAccept;
    }

    req = req.clone({ setHeaders: headersConfig });

    return next.handle(req);

    /*return next.handle(req).do(val => {}, async err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        this.userService.purgeAuth();
        await this.router.navigate([AppSettings.UrlLogin]);
      }
    });*/
  }
}
