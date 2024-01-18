import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  
  myObservable1$: Observable<any> = new Observable(
    (observer: Observer<any>) => {
      observer.next('🦸 ')

      setTimeout(() => {
        observer.complete()
      }, 1500)

      setTimeout(() => {
        observer.next('♥ ')
      }, 2500)

      
      setTimeout(() => {
        observer.error('🏖  ')
      }, 3500)
    }
  )

  constructor() { }

  private  listenAllEvents(): void {

  }
}
