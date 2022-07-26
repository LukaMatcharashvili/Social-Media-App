import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginLogoutEmitterService {
  constructor() {}

  loginlogoutEmitter: EventEmitter<any> = new EventEmitter();
}
