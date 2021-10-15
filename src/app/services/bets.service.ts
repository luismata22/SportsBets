import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private server: string = environment.API_URL; //This variables is from enviroment.ts
  public currentUser: any;
  private services = {
    countries: this.server + "api/countries",
    racecourse: this.server + "api/racecourse",
  };
  
  constructor(private http: HttpClient) { }

  getCountries(){
    return this.http.get(this.services.countries);
  }

  getHorses(data) {
    return this.http.post(this.services.countries, data);
  }

  getRacecourse(data) {
    return this.http.post(this.services.racecourse, data);
  }

  getBetsType(data) {
    return this.http.post(this.services.countries, data);
  }

  getBets(data) {
    return this.http.post(this.services.countries, data);
  }

  getRacers(data) {
    return this.http.post(this.services.countries, data);
  }
}
