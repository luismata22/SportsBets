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
  zoneSelected: number = 0;
  classSelected: number = 0;
  raceCourseSelected: number = 0;
  wagerSelected: number = 0;
  fechaSelected: string = "Todos";
  raceSelected:number= 0;
  oddSelectedList: any[] = [];

  showModal = false;
  
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

  chargeAgent(agentId: number, clientId: number){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "cargar_agente");
    params = params.append("agent_id", agentId.toString());
    params = params.append("client_id", clientId.toString());
    return this.http.post(this.server, params)
  }

  charge(agentId: number, clientId: number, zoneId: number, classId: number, raceCourseId: number, raceId: number, fecha: string){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "carga");
    params = params.append("fecha", "2021-11-30");
    params = params.append("zone", zoneId.toString());
    params = params.append("clase", classId.toString());
    params = params.append("hipo", raceCourseId.toString());
    params = params.append("race", raceId.toString());
    params = params.append("client_id", clientId.toString());
    params = params.append("agent_id", agentId.toString());
    params = params.append("zone_id", "0");
    params = params.append("formato", "Decimal");
    params = params.append("buscar", "");
    return this.http.post(this.server, params)
  }

  saveBet(agentId: number, clientId: number, oddId: string, wagerId: number, betList: any[]){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "agregar_apuesta");
    params = params.append("agent_id", agentId.toString());
    //params = params.append("client_id", clientId.toString());
    params = params.append("odd_id", oddId.toString());
    params = params.append("wager_id", wagerId.toString());
    //params = params.append("apuestas", total.toString());
    //params = params.append("apuestas", betList.toString());
    params = params.append("id", betList[0].id.toString());
    params = params.append("time", betList[0].time.toString());
    params = params.append("risk", betList[0].risk.toString());
    params = params.append("win", betList[0].win.toString());
    params = params.append("amount", betList[0].amount.toString());
    return this.http.post(this.server, params)
  }

  saveTicket(agentId: number, clientId: number, oddId: number, betList: any[]){
    let params: HttpParams = new HttpParams();
    params = params.append("accion", "agregar_apuesta");
    params = params.append("agent_id", agentId.toString());
    params = params.append("client_id", clientId.toString());
    params = params.append("apuesta", betList.toString());
    return this.http.post(this.server, params)
  }
}
