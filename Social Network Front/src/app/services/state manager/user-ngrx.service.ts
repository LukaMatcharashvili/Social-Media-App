import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AddUserData,
  InitializeUserData,
} from 'src/app/ngrx/actions/user-actions';
import { AuthProxyService } from '../proxy/auth-proxy.service';

@Injectable({
  providedIn: 'root',
})
export class UserNgrxService {
  constructor(private store: Store<any>, private authProxyS: AuthProxyService) {
    if (localStorage['jwt']) {
      this.authProxyS.whoami().subscribe((user: any) => {
        const { verificationToken, ...restUser } = user;
        this.store.dispatch(new InitializeUserData(restUser));
      });
    }
  }

  addUserData(userData: any) {
    this.store.dispatch(new AddUserData(userData));
  }

  deleteUserData() {
    this.store.dispatch(new AddUserData({}));
  }

  getUserData() {
    return this.store.pipe(select('user' as any));
  }
}
