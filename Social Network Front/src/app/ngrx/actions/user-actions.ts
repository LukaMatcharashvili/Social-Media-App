import { Action } from '@ngrx/store';
import { UserActionTypes } from './user.action-types';

export class BaseActions implements Action {
  type!: string;
  payload!: any;
}

export class InitializeUserData extends BaseActions {
  constructor(payload: any) {
    super();
    super.type = UserActionTypes.initUserData;
    super.payload = payload;
  }
}

export class AddUserData extends BaseActions {
  constructor(payload: any) {
    super();
    super.type = UserActionTypes.addUser;
    super.payload = payload;
  }
}
