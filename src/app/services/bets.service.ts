import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private server: string = environment.API_URL; //This variables is from enviroment.ts
  public currentUser: any;
  private services = {
    zonas: this.server + "api/zonas",
    racecourse: this.server + "api/racecourse",
    class: this.server + "api/class",
    racers: this.server + "api/racers",
    horses: this.server + "api/horses",
    wagers: this.server + "api/wagers",
    odds: this.server + "api/odds",
    boommakers: this.server + "api/boommakers",
    ticket: this.server + "api/saveTicket",
  };
  
  constructor(private http: HttpClient) { }

  getZonas(){
    return this.http.get(this.services.zonas);
  }

  getHorses() {
    return this.http.get(this.services.horses);
  }

  getClass() {
    return this.http.get(this.services.class);
  }

  getRacecourse() {
    return this.http.get(this.services.racecourse);
  }

  /* getBetsType(data) {
    return this.http.post(this.services.countries, data);
  }

  getBets(data) {
    return this.http.post(this.services.countries, data);
  } */

  getRacers() {
    return this.http.get(this.services.racers);
  }

  getWagers() {
    return this.http.get(this.services.wagers);
  }

  getOdds() {
    return this.http.get(this.services.odds);
  }

  getBoommakers() {
    return this.http.get(this.services.boommakers);
  }
  
  saveTicket(data) {
    return this.http.post(this.services.ticket, data);
  }

  chargeAgent(agentId: number){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "cargar_agente");
    params = params.append("agent_id", agentId.toString());
    params = params.append("client_id", "0");
    return this.http.post(this.server, params)
  }

  charge(agentId: number, zoneId: number, classId: number, raceCourseId: number, fecha: string){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "carga");
    params = params.append("fecha", "2021-11-30");
    params = params.append("zone", zoneId.toString());
    params = params.append("clase", classId.toString());
    params = params.append("hipo", raceCourseId.toString());
    params = params.append("race", "0");
    params = params.append("client_id", "0");
    params = params.append("agent_id", agentId.toString());
    params = params.append("zone_id", "0");
    params = params.append("formato", "Decimal");
    params = params.append("buscar", "");
    return this.http.post(this.server, params)
  }
}
