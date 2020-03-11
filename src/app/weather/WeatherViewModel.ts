export class WeatherViewModel {
  public temp: number;
  public high: string;
  public low: string;
  public date: Date;
  public humidity: string;
  public shortDescription: string;
  public longDescription: string;
  public iconUrl: string;
  public city: any;
}

export class ByDayWeatherViewModel {
  public date: string;
  public dateObject: Date;
  public models: Array<WeatherViewModel>;
}