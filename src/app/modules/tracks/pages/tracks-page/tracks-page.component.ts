import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TrackModel } from 'src/app/core/models/tracks.model';
import { TrackService } from '../../services/track.service';


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService){}

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }

  async loadDataAll(): Promise<any>{
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    // this.tracksRandom = await this.trackService.getAllTracks$().toPromise()
  }

  
  loadDataRandom():void{
     this.trackService.getAllTracks$()
     .subscribe((response: TrackModel[]) => {
       this.tracksRandom = response
     }, err => {
       console.log('Error de conexión')
    })
  }

  ngOnDestroy(): void {

  }
}
