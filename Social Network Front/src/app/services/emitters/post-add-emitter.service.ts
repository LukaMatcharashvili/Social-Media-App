import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostAddEmitterService {
  constructor() {}
  postAddEmitter: EventEmitter<any> = new EventEmitter();
}
