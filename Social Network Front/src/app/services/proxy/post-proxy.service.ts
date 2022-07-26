import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PostProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  getFeed() {
    const fullUrl = `${environment.apiBaseUrl}/post/feed/get`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getProfilePost(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/profile/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  addPost(postData: any) {
    const fullUrl = `${environment.apiBaseUrl}/post`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, postData, { headers: headers });
  }

  deletePost(postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.delete(fullUrl, { headers: headers });
  }

  getPost(postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  updatePost(postId: string, postData: any) {
    const fullUrl = `${environment.apiBaseUrl}/post/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.put(fullUrl, postData, { headers: headers });
  }

  addComment(commentData: any, postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/comment/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, commentData, { headers: headers });
  }

  deleteComment(commentId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/comment/${commentId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.delete(fullUrl, { headers: headers });
  }

  like(postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/like/like/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, {}, { headers: headers });
  }

  unlike(postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/like/unlike/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, {}, { headers: headers });
  }

  getLikes(postId: string) {
    const fullUrl = `${environment.apiBaseUrl}/post/like/get/${postId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }
}
