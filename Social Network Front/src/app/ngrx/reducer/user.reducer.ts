import { BaseActions } from '../actions/user-actions';
import { UserActionTypes } from '../actions/user.action-types';

export class UserReducer {
  static state: any = {};

  public static Reduce(state = UserReducer.state, action: BaseActions) {
    switch (action.type) {
      case UserActionTypes.initUserData:
        UserReducer.state = action.payload;
        return UserReducer.state;
      case UserActionTypes.addUser:
        UserReducer.state = action.payload;
        return UserReducer.state;
      default:
        return state;
    }
  }
}
