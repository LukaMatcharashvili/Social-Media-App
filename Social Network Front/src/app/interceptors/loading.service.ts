import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingEmitter: EventEmitter<any> = new EventEmitter();
  loadingMap: Map<string, boolean> = new Map<string, boolean>();
  constructor() {}

  setLoading(loading: boolean, url: string): void {
    if (loading) {
      this.loadingMap.set(url, loading);
      this.loadingEmitter.emit(true);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0) {
      this.loadingEmitter.emit(false);
    }
  }
}
