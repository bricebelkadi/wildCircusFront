import { Injectable } from '@angular/core';
import { WshService } from './wsh.service';
import { env } from '../../core/environnement';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private wsh: WshService) { }

  getRestArtist(id: number) {
    return this.wsh.get(env.urlBack + 'artist/rest/performance/' + id.toString())
  }
}
