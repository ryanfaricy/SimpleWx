import { Component, OnInit, NgZone } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { WeatherViewModel, ByDayWeatherViewModel } from './WeatherViewModel';
import { WeatherResponse } from './WeatherResponse';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';
import { GooglePlacesComponent } from '../google-places/google-places.component';
import * as moment from 'moment';

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})

export class WeatherComponent implements OnInit {
  public models: Array<WeatherViewModel>;
  public model: Array<ByDayWeatherViewModel>;
  public chosenCity: string;
  public msg: string;
  public iconUrl: string;
  public places: GooglePlacesComponent;
  public units: string;
  dialogResult: any;

  constructor(private http: HttpClient, public dialog: MatDialog, public zone: NgZone) {
    this.places = new GooglePlacesComponent(zone)
    this.iconUrl = environment.iconUrl;
    this.units = environment.units;
    this.getWeather("New York City");
  }

  ngOnInit(): void { }

  public openDialog(weather: WeatherViewModel) {
    let dialogRef = this.dialog.open(WeatherDetailsComponent, {
      width: '600px',
      data: weather
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }

  public getWeather(chosenCity: string) {
    if (!chosenCity) {
      this.msg = "Please enter a location first";
      this.models = null;
      return;
    }
    var forecastUrl = `${environment.apiUrl}/forecast?q=${chosenCity}&appid=${environment.apiKey}&units=${environment.units}`;
    this.http.get<WeatherResponse>(forecastUrl).subscribe(
      results => {
        this.model = new Array<ByDayWeatherViewModel>();
        this.models = new Array<WeatherViewModel>();

        results.list.forEach(result => {
          var weatherViewModel: WeatherViewModel = {
            city: results.city.name,
            temp: Math.round(result.main.temp),
            low: Math.round(result.main.temp_min).toString(),
            high: Math.round(result.main.temp_max).toString(),
            humidity: Math.round(result.main.humidity).toString(),
            shortDescription: result.weather[0].main,
            longDescription: result.weather[0].description,
            iconUrl: `${this.iconUrl}/${result.weather[0].icon}@2x.png`,
            date: new Date(result.dt_txt)
          }
          this.models.push(weatherViewModel);
        });

        this.model = this.groupByDate(this.models);
        this.chosenCity = results.city.name;
      },
      error => {
        this.models = null;
        if (error.status == 404) {
          this.msg = `Sorry, ${chosenCity} could not be found. Check the spelling or try another city.`;
        } else {
          if (!environment.production) {
            console.log(error);
          }
          this.msg = `Sorry, there was a problem looking up the forecast for ${chosenCity}.`;
        }
      }
    );
  }

  private groupByDate(models: Array<WeatherViewModel>) {
    const groups = models.reduce((groups, weather) => {
      const date = moment(weather.date).format('MM/DD/YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(weather);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      var result: ByDayWeatherViewModel = {
        date: date,
        dateObject: new Date(date),
        models: groups[date]
      };

      return result;
    });

    return groupArrays;
  }
}
