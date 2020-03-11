import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WeatherViewModel } from '../weather/WeatherViewModel';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WeatherTableComponent implements OnInit {
  dataSource: WeatherViewModel[];
  columnsToDisplay = ['date', 'iconUrl', 'shortDescription', 'temp', 'high', 'low'];
  expandedElement: WeatherViewModel | null;

  constructor(private dataService: WeatherComponent) {
    this.dataSource = dataService.models;
   }

  ngOnInit(): void {
  }

}
