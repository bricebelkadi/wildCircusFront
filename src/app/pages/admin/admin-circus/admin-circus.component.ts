import { Component, OnInit } from '@angular/core';
import { CircusService } from '../../../shared/services/circus.service';
import { ShowService } from '../../../shared/services/show.service';

@Component({
  selector: 'app-admin-circus',
  templateUrl: './admin-circus.component.html',
  styleUrls: ['./admin-circus.component.scss'],
})
export class AdminCircusComponent implements OnInit {

  constructor(private circusService: CircusService, private showService: ShowService) { }

  ngOnInit() {
  }

}