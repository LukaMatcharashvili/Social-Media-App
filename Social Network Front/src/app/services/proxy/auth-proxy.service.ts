import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  registerUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/register`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, userData, { headers: headers });
  }

  loginUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/login`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, userData, { headers: headers });
  }

  whoami() {
    const fullUrl = `${environment.apiBaseUrl}/auth/whoami`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  deleteUser() {
    const fullUrl = `${environment.apiBaseUrl}/auth/delete`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.delete(fullUrl, { headers: headers });
  }

  updateUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/update`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${jwt}`)
      .set('content-type', 'application/json');
    return this.proxy.put(fullUrl, userData, { headers: headers });
  }

  sendPasswordResetLink(email: string) {
    const fullUrl = `${environment.apiBaseUrl}/auth/resetpassword`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, { email }, { headers: headers });
  }

  resetPassword(userId: string, resetToken: string, passwordBody: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/resetpassword/${userId}/${resetToken}`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, passwordBody, { headers: headers });
  }
}
