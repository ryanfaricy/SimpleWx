import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { WeatherViewModel } from '../weather/WeatherViewModel';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})

export class WeatherDetailsComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<WeatherDetailsComponent>, @Inject(MAT_DIALOG_DATA) public weather: WeatherViewModel) { }

  ngOnInit(): void {
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }
}
