import { Component, OnInit } from '@angular/core';
import { SpecialtyService } from '../../../shared/services/specialty.service';
import { Specialty } from '../../../shared/models/specialty';
import { BehaviorSubject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-admin-specialty',
  templateUrl: './admin-specialty.component.html',
  styleUrls: ['./admin-specialty.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminSpecialtyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'modify'];
  allSpecialtyStream = new BehaviorSubject<Specialty[]>([]);
  expandedElement: Specialty | null;

  specialtyToAdd: Specialty = {
    title: '',
    description: '',
    picture: ''
  }

  idSpeModified: number = 0;
  whoIsModified: boolean[];
  doNotExpand: boolean = false;

  constructor(private specialService: SpecialtyService) { }

  ngOnInit() {
    // Get All Specialties
    this.specialService.getAllSpecialty().subscribe((results: Specialty[]) => {
      this.allSpecialtyStream.next(results);
      this.whoIsModified = new Array(results.length);
      this.whoIsModified.fill(false);
    });
  }

  addNewSpe() {
    const currentValue = this.allSpecialtyStream.getValue();
    currentValue.push(this.specialtyToAdd);
    this.whoIsModified.push(true);
    this.allSpecialtyStream.next(currentValue);
    this.expandThisRow(this.specialtyToAdd);
    this.doNotExpand = true;
  }

  expandThisRow(element: Specialty) {
    if (this.doNotExpand) {
      return;
    }
    this.expandedElement = this.expandedElement === element ? null : element;

  }


  postNewSpecialty() {
    if (this.idSpeModified !== 0) {
      this.putSpecialty();
      return;
    }
    this.specialService.postNewSpecialty(this.specialtyToAdd).subscribe((result: Specialty) => {
      const currentValue = this.allSpecialtyStream.getValue();
      currentValue.splice(currentValue.length - 1, 1, result);
      this.whoIsModified.fill(false);
      this.doNotExpand = false;
      this.allSpecialtyStream.next(currentValue);
    })
    this.specialtyToAdd = {
      title: '',
      description: '',
      picture: ''
    }
  
  }

  modifySpe(i: number, spe: Specialty) {
    if (this.expandedElement !== spe) {
      this.expandThisRow(spe);
    }
    this.whoIsModified[i] = true;
    this.doNotExpand = true;
    this.specialtyToAdd.title = spe.title;
    this.specialtyToAdd.description = spe.description;
    this.specialtyToAdd.picture = spe.picture;
    this.idSpeModified = spe.id;
  }

  putSpecialty() {
    this.specialService.putSpecialty(this.idSpeModified, this.specialtyToAdd).subscribe();
    const currentValue = this.allSpecialtyStream.getValue();
    const index = currentValue.findIndex(x => x.id = this.idSpeModified);
    console.log(this.idSpeModified)
    console.log(currentValue)
    console.log(index)
    const speModified = {
      ...this.specialtyToAdd,
      id: this.idSpeModified
    };
    console.log(speModified);
    currentValue.splice(index, 1, speModified);
    this.allSpecialtyStream.next(currentValue);
    this.specialtyToAdd = {
      title: '',
      description: '',
      picture: ''
    };
    this.whoIsModified.fill(false);
    this.doNotExpand = false;
    this.idSpeModified = 0;
    this.expandedElement = null;
  }
}
