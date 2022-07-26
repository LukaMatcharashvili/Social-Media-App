import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderEmitterService {
  constructor() {}

  loaderEmitter: EventEmitter<any> = new EventEmitter();
}
