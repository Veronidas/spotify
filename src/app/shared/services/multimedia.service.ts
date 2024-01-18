import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { TrackModel } from 'src/app/core/models/tracks.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement

  constructor(){
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK => {
      if(responseOK){
        this.setAudio(responseOK)
      }
    })
  }

  private listenAllEvents(): void {

  }

  public setAudio(track: TrackModel): void {
    console.log('🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍', track);
    this.audio.src = track.url
    this.audio.play()
  }
}

  // Example 2: refactor

  
  // callback: EventEmitter<any> = new EventEmitter<any>();

  // myObservable1$: BehaviorSubject<any> = new BehaviorSubject('🦸🦸🦸🦸')
  
  // constructor() { 
  //   setTimeout(() => {
  //     this.myObservable1$.next('🦸🦸🦸🦸')
  //   }, 1000)

  //   setTimeout(() => {
  //     this.myObservable1$.error('🔴🔴🔴🔴')
  //   }, 3500)
  
  
  // Example 1


  // callback: EventEmitter<any> = new EventEmitter<any>();

  // myObservable1$: BehaviorSubject<any> = new BehaviorSubject('🦸🦸🦸🦸')
  
  // constructor() { 
  //   setTimeout(() => {
  //     this.myObservable1$.next('🦸🦸🦸🦸')
  //   }, 1000)

  //   setTimeout(() => {
  //     this.myObservable1$.error('🔴🔴🔴🔴')
  //   }, 3500)


  // myObservable1$: Observable<any> = new Observable(
  //   (observer: Observer<any>) => {
  //     observer.next('🦸 ')

  //     setTimeout(() => {
  //       observer.complete()
  //     }, 1500)

  //     setTimeout(() => {
  //       observer.next('♥ ')
  //     }, 2500)

      
  //     setTimeout(() => {
  //       observer.error('🏖  ')
  //     }, 3500)
  //   }
  // )

