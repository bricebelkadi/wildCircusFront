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
}
