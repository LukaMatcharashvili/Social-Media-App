import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SearchProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  getUserSearch(searchQuery: string) {
    const fullUrl = `${environment.apiBaseUrl}/search/user`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.proxy.get(fullUrl, { headers: headers, params: params });
  }

  getPostSearch(searchQuery: string) {
    const fullUrl = `${environment.apiBaseUrl}/search/post`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.proxy.get(fullUrl, { headers: headers, params: params });
  }
}
