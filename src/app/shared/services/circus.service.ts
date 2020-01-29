import { Injectable } from '@angular/core';
import { WshService } from './wsh.service';
import { env } from '../../core/environnement';

@Injectable({
  providedIn: 'root'
})
export class CircusService {

  constructor(private wsh: WshService) { }

  getAllCircus() {
    return this.wsh.get(env.urlBack + 'circus');

  }

}
