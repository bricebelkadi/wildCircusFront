import { Component, OnInit } from '@angular/core';
import { Show } from '../../../shared/models/show';
import { ShowService } from '../../../shared/services/show.service';
import { BehaviorSubject } from 'rxjs';
import { Performance } from '../../../shared/models/performance';
import { PerformanceService } from '../../../shared/services/performance.service';
import { Artist } from '../../../shared/models/artist';
import { Circus } from '../../../shared/models/circus';
import { CircusService } from '../../../shared/services/circus.service';
import { Specialty } from '../../../shared/models/specialty';
import { SpecialtyService } from '../../../shared/services/specialty.service';
import { Time } from '../../../core/time';
import { Duration } from '../../../core/duration';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ArtistService } from '../../../shared/services/artist.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-admin-show',
  templateUrl: './admin-show.component.html',
  styleUrls: ['./admin-show.component.scss'],
})
export class AdminShowComponent implements OnInit {

  isOpen: boolean[] = [true, false, false];
  times = Time;
  durations = Duration;

  allCircus: Circus[];
  allSpecialty: Specialty[];

  allShowStream = new BehaviorSubject<Show[]>([]);
  columnsToDisplayShow = ['id', 'title', 'circus', 'modify'];
  whoIsModifiedShow: boolean[];
  showToCreate = {
    title: '',
    circus: { id: 0 },
  };
  isShowModifying: boolean = false;
  idShowModified: number;

  performanceStream = new BehaviorSubject<Performance[]>([]);
  columnsToDisplayPerformance = ['id', 'specialty', 'startTime', 'duration', 'modify'];
  whoIsModifiedPerformance: boolean[];
  performanceToCreate = {
    specialty: { id: 0 },
    show: { id: 0 },
    startTime: 0,
    duration: 0
  };
  isPerformanceModifying: boolean = false;
  idPerformanceModified: number;


  artistStream = new BehaviorSubject<Artist[]>([]);
  columnsToDisplayArtist = ['id', 'firstname', 'lastname', 'artistName', 'specialty'];
  idPerformanceArtists: number;

  columnsToDisplayRestArtist = ['id', 'firstname', 'lastname', 'artistName', 'specialty', 'select'];

  dataSourceRestArtist: MatTableDataSource<Artist> = new MatTableDataSource([]);

  selection = new SelectionModel<Artist>(true, []);


  constructor(private showService: ShowService,
    private perfoService: PerformanceService,
    private circusService: CircusService,
    private speService: SpecialtyService,
    private artService: ArtistService) { }

  ngOnInit() {
    // Get All Circus
    this.circusService.getAllCircus().subscribe((results: Circus[]) => this.allCircus = results)

    // Get All Shows
    this.showService.getAllShows().subscribe((results: Show[]) => {
      this.allShowStream.next(results);
      this.whoIsModifiedShow = new Array(results.length);
      this.whoIsModifiedShow.fill(false);
    });

    // Get All Specialties
    this.speService.getAllSpecialty().subscribe((results: Specialty[]) => this.allSpecialty = results);

  }

  addNewShow() {
    if (this.whoIsModifiedShow.filter(x => x === true).length > 0) {
      return;
    }
    this.showToCreate = {
      title: '',
      circus: { id: 0 },
    }

    const currentValue = this.allShowStream.getValue();
    currentValue.push(new Show());
    this.allShowStream.next(currentValue);
    this.whoIsModifiedShow.push(true);
    this.isOpen = [true, false, false];
  }

  postNewShow() {
    if (this.isShowModifying) {
      this.putShowModified();
      return;
    }
    this.showService.postShow(this.showToCreate).subscribe((result: Show) => {
      result.circus.title = this.allCircus.find(x => x.id === result.circus.id).title;
      const currentValue = this.allShowStream.getValue();
      currentValue.splice(currentValue.length - 1, 1);
      currentValue.push(result);
      this.whoIsModifiedShow[currentValue.length - 1] = false;
      this.allShowStream.next(currentValue);
    });
  }

  putShowModified() {
    this.showService.putShow(this.showToCreate, this.idShowModified).subscribe((result: Show) => {
      const currentValue = this.allShowStream.getValue();
      const index = currentValue.findIndex(x => x.id === result.id);
      currentValue.splice(index, 1, result);
      this.whoIsModifiedShow[index] = false;
      this.isShowModifying = false;
      this.allShowStream.next(currentValue);
    })
  }


  modifyShow(i: number) {
    if (this.whoIsModifiedShow.filter(x => x === true).length > 0) {
      return;
    }
    this.isShowModifying = true;
    this.whoIsModifiedShow.fill(false);
    this.whoIsModifiedShow[i] = true;
    const showToModify = this.allShowStream.getValue()[i];
    this.idShowModified = showToModify.id;
    this.showToCreate.title = showToModify.title;
    this.showToCreate.circus.id = showToModify.circus.id;
  }

  // Performance table functions

  displayPerformances(show: Show) {
    if (this.whoIsModifiedShow.filter(x => x === true).length > 0) {
      return;
    }
    this.whoIsModifiedPerformance = new Array(show.performances.length);
    this.whoIsModifiedPerformance.fill(false);
    this.perfoService.getPerformanceOfShow(show.id).subscribe((results: Performance[]) => this.performanceStream.next(results));
    this.performanceToCreate.show.id = show.id;
    this.isOpen = [false, true, false];
  }

  addNewPerformance() {
    if (this.whoIsModifiedShow.filter(x => x === true).length > 0) {
      return;
    }
    this.performanceToCreate = {
      specialty: { id: 0 },
      show: { id: 0 },
      startTime: 0,
      duration: 0
    };
    const currentValue = this.performanceStream.getValue();
    const lastPerf = currentValue[currentValue.length - 1];
    this.performanceToCreate.startTime = lastPerf.startTime + lastPerf.duration + 1;
    currentValue.push(new Performance());
    this.performanceStream.next(currentValue);
    this.whoIsModifiedPerformance.push(true);
    this.isOpen = [false, true, false];
  }

  postNewPerformance() {
    if (this.isPerformanceModifying) {
      this.putPerformanceModified();
      return;
    }
    this.perfoService.postNewPerformance(this.performanceToCreate).subscribe((result: Performance) => {
      result.specialty.title = this.allSpecialty.find(x => x.id === result.specialty.id).title;
      const currentValue = this.performanceStream.getValue();
      currentValue.splice(currentValue.length - 1, 1);
      currentValue.push(result);
      this.whoIsModifiedPerformance[currentValue.length - 1] = false;
      this.performanceStream.next(currentValue);
    });
  }

  putPerformanceModified() {
    this.perfoService.putPerformance(this.performanceToCreate, this.idPerformanceModified).subscribe((result: Performance) => {
      let currentValue = this.performanceStream.getValue();
      const index = currentValue.findIndex(x => x.id === result.id);
      currentValue.splice(index, 1, result);
      this.whoIsModifiedPerformance[index] = false;
      this.isPerformanceModifying = false;
      currentValue = this.reorganizeStartTime(currentValue);
      this.perfoService.putArrayOfPerformance(currentValue).subscribe();
      this.performanceStream.next(currentValue);
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    if (this.whoIsModifiedPerformance.filter(x => x === true).length > 0) {
      return;
    }
    let currentValue = this.performanceStream.getValue();
    currentValue[event.previousIndex].startTime = currentValue[event.currentIndex].startTime;
    moveItemInArray(currentValue, event.previousIndex, event.currentIndex);
    currentValue = this.reorganizeStartTime(currentValue)
    this.perfoService.putArrayOfPerformance(currentValue).subscribe();
    this.performanceStream.next(currentValue);
  }

  reorganizeStartTime(array: Performance[]) {
    for (let i = 1; i < array.length; i++) {
      array[i].startTime = array[i - 1].startTime + array[i - 1].duration + 1;
    }
    return array;
  }

  modifyPerformance(i: number) {
    if (this.whoIsModifiedPerformance.filter(x => x === true).length > 0) {
      return;
    }
    this.isPerformanceModifying = true;
    this.whoIsModifiedPerformance.fill(false);
    this.whoIsModifiedPerformance[i] = true;
    const perfToModify = this.performanceStream.getValue()[i];
    this.idPerformanceModified = perfToModify.id;
    this.performanceToCreate.specialty.id = perfToModify.specialty.id;
    this.performanceToCreate.show.id = perfToModify.show.id;
    this.performanceToCreate.startTime = perfToModify.startTime;
    this.performanceToCreate.duration = perfToModify.duration;
  }

  // Artist table function

  displayArtists(id: number) {
    if (this.whoIsModifiedPerformance.filter(x => x === true).length > 0) {
      return;
    }
    if (id) {
      this.perfoService.getOnePerformance(id).subscribe((results: Performance) => {
        this.artistStream.next(results.artists);
        this.idPerformanceArtists = results.id;
        this.getRestArtists(results.id);
        this.isOpen = [false, false, true];
      });
    }
  }

  getRestArtists(idPerf: number) {
    this.artService.getRestArtist(idPerf).subscribe((results: Artist[]) => {
      this.dataSourceRestArtist.data = results;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSourceRestArtist.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceRestArtist.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourceRestArtist.data.forEach(row => this.selection.select(row));
  }

  showSelect() {
    const currentValue = this.artistStream.getValue();
    for (const artist of this.selection.selected) {
      const index = this.dataSourceRestArtist.data.indexOf(artist);
      this.dataSourceRestArtist.data.splice(index, 1);
      currentValue.push(artist);
    }
    this.dataSourceRestArtist._updateChangeSubscription();
    this.artistStream.next(currentValue)

    const perfToPut = {
      id: this.idPerformanceArtists,
      artists : currentValue
    }

    this.perfoService.updateArtistPerformance(perfToPut).subscribe();
  }

  deleteArtist(index: number, artist: Artist) {
    const currentValue = this.artistStream.getValue();
    currentValue.splice(index, 1);
    this.dataSourceRestArtist.data.push(artist);
    this.dataSourceRestArtist._updateChangeSubscription();
    this.artistStream.next(currentValue);
    const perfToPut = {
      id: this.idPerformanceArtists,
      artists : currentValue
    };
    this.perfoService.updateArtistPerformance(perfToPut).subscribe();
  }
}
