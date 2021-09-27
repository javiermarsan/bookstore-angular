import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  getRefreshToken(): string {
    return window.localStorage['jwtRefreshToken'];
  }

  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  saveRefreshToken(token: string) {
    window.localStorage['jwtRefreshToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('jwtRefreshToken');
  }

}
