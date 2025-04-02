import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ import this
import { SpacexService } from '../network/spacex.service';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,              // ✅ include here
    MissionfilterComponent
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.scss']
})
export class MissionlistComponent implements OnInit {
  allLaunches: any[] = [];
  filteredLaunches: any[] = [];

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllLaunches().subscribe((data) => {
      this.allLaunches = data;
      this.filteredLaunches = data;
    });
  }

  filterByYear(year: string): void {
    if (year === 'All') {
      this.filteredLaunches = this.allLaunches;
    } else {
      this.filteredLaunches = this.allLaunches.filter(
        (launch) => launch.launch_year === year
      );
    }
  }
}
