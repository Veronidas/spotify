import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { TrackModel } from 'src/app/core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

private readonly URL = environment.api
constructor(private http: HttpClient){

}

private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
  return new Promise((resolve, reject) => {
    const listTmp = listTracks.filter(a => a._id != id)
   resolve(listTmp)
  })
}


/**
 * 
 * @returns Todas las canciones
 * 
 */

getAllTracks$(): Observable<any> {
  return this.http.get(`${this.URL}/tracks`)
    .pipe(
      map(({ data }: any) => {
        return data;
      })
    )
}

/**
 * 
 * @returns Devolver canciones random
 */
getAllRandom$(): Observable<any> {
  return this.http.get(`${this.URL}/tracks`)
    .pipe(
      // tap(data => console.log('🚗  ', data)),
      mergeMap(({ data }: any) =>  //devuelve reverse
        this.skipById(data, 2)),
      // map((dataRevertida) => {//filtra el array
      //   return dataRevertida.filter((track: TrackModel) => track._id != 1 );
      // })
      catchError((err) =>{
        const { status, statusText } = err;
        console.log('Algo paso revisame 🆗 🆗 :danger ', status, statusText);
        return of([])
      })
    )
}
}
