import { Injectable } from '@angular/core';
import { WshService } from './wsh.service';
import { env } from '../../core/environnement';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private wsh: WshService) { }

  getAllSpecialty() {
    return this.wsh.get(env.urlBack + 'specialty');
  }

  postNewSpecialty(obj: any) {
    return this.wsh.post(env.urlBack + 'specialty', obj)
  }

  putSpecialty(id: number, obj: any) {
    return this.wsh.put(env.urlBack + 'specialty/' + id.toString(), obj)
  }
}
