import { Injectable } from '@angular/core';
import { WshService } from './wsh.service';
import { env } from '../../core/environnement';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private wsh: WshService) { }

  getOnePerformance(id: number) {
    return this.wsh.get(env.urlBack + 'performance/' + id.toString());
  }

  postNewPerformance(obj: any) {
    return this.wsh.post(env.urlBack + 'performance', obj);
  }

  putArrayOfPerformance(obj: any[]){
    return this.wsh.put(env.urlBack + 'performance', obj);
  }

  getPerformanceOfShow(id: number) {
    return this.wsh.get(env.urlBack + 'performance/show/' + id.toString());
  }

  putPerformance(obj: any, id: number) {
    return this.wsh.put(env.urlBack + 'performance/' + id.toString(), obj)
  }

  updateArtistPerformance(obj: any) {
    return this.wsh.put(env.urlBack + 'performance/artist/', obj)
  }


}
