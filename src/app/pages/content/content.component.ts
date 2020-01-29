import { Component, OnInit } from '@angular/core';
import { CircusService } from '../../shared/services/circus.service';
import { WshService } from '../../shared/services/wsh.service';
import { Circus } from '../../shared/models/circus';
import { SpecialtyService } from '../../shared/services/specialty.service';
import { Specialty } from '../../shared/models/specialty';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  allCircus: Circus[];
  allSpecialty: Specialty[];

  constructor(private circusService: CircusService,
              private specialService: SpecialtyService) { }

  ngOnInit() {

    // Get All Circus
    this.circusService.getAllCircus().subscribe((results: Circus[]) => this.allCircus = results);

    // Get All Specialties
    this.specialService.getAllSpecialty().subscribe((results: Specialty[]) => this.allSpecialty = results);


  }
}
