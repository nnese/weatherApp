import { Component } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  temperature: any;
  today = new Date();
  cityName: string = "";
  weatherIcon: any;
  weatherDetails: any;
  name = "";
  loading = true;

  constructor(
    public httpClient: HttpClient
  ) {
    // this.loadData();
  }

  loadData() {
    this.httpClient.get(`${API_URL}/weather?q=${this.cityName}&appid=${API_KEY}`).subscribe((results: any) => {
      console.log(results);

      this.temperature = results.main;
      this.name = results.name;
      this.weatherDetails = results.weather[0];
      this.weatherIcon = `https://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;
      this.loading = false;
      console.log("cityName" + this.cityName);

    },
      (error) => {

      });
  }

}
