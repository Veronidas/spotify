import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, observable } from 'rxjs';
import { TrackModel } from 'src/app/core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  mockCover: TrackModel = {
    cover:'https://c8.alamy.com/comp/2BNW82M/madonna-original-vinyl-album-cover-true-blue-1986-2BNW82M.jpg',
    album: 'True Blue',
    name:'Madonna',
    url:'http://localhost/track.mp3',
    _id: 1
  }

  listObservers$: Array<Subscription> = []

  constructor(private multimediaService: MultimediaService){}
  ngOnInit(): void {
    const observable1$ = this.multimediaService.myObservable1$
    .subscribe(
      (responseOk) => {
        console.log('Llego el aguaaa 🍉 ', responseOk);
        
      },
      (responseFail) => {
        console.log('Se tapo la tuberia 😿  ');
      }
    )
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
    console.log('🔴🔴🔴🔴🔴🔴  BOOM!!}} ');
  }
}
