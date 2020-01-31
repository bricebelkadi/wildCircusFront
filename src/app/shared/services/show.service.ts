import { Injectable } from '@angular/core';
import { WshService } from './wsh.service';
import { env } from '../../core/environnement';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private wsh: WshService) { }

  getAllShows() {
    return this.wsh.get(env.urlBack + 'show');
  }

  postShow(obj: any) {
    return this.wsh.post(env.urlBack + 'show', obj)
  }

  putShow(obj: any, id: number) {
    return this.wsh.put(env.urlBack + 'show/' + id.toString(), obj)
  }

}
