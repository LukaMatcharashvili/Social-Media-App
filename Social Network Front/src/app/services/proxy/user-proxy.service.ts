import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  getUserById(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/profile/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  follow(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/follow/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, {}, { headers: headers });
  }

  unfollow(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/unfollow/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, {}, { headers: headers });
  }

  getFollowers(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/followers/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getFollowings(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/followings/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }
}
