import { Component, OnInit } from '@angular/core';
import { Performance } from '../../../shared/models/performance';

@Component({
  selector: 'app-admin-performance',
  templateUrl: './admin-performance.component.html',
  styleUrls: ['./admin-performance.component.scss']
})
export class AdminPerformanceComponent implements OnInit {

  allPerformance: Performance[];

  constructor() { }

  ngOnInit() {
    
  }

}
