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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);


  constructor(){
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOK => {
      if(responseOK){
        this.setAudio(responseOK)
      }
    })
    this.listenAllEvents()
  }

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)

  }

  setPlayerStatus = (state: any) => {
    console.log('🤦', state);
    switch(state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
        this.playerStatus$.next('playing')
        break;
      case 'ended':
        this.playerStatus$.next('ended')
        break;
      default:
        this.playerStatus$.next('paused')
        break;
    }
    
  }

  private calculateTime = () =>{
    console.log('disparando evento');
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);

  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }
  private setTimeElapsed(currentTime: number): void{
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60)% 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}: ${displaySeconds}`
    this.timeElapsed$.next(displayFormat);
    
  }

  private setTimeRemaining(currentTime: number, duration: number): void{
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60)% 60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat);
  }

  public setAudio(track: TrackModel): void {
    this.audio.src = track.url
    this.audio.play()
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
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

