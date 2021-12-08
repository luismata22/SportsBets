import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/bets/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BetsService } from 'src/app/services/bets.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-bar-top',
  templateUrl: './bar-top.component.html',
  styleUrls: ['./bar-top.component.scss'],
  providers: [DatePipe]
})
export class BarTopComponent implements OnInit {

  @Input("agentId") agentId: number;
  @Input("zonesList") zonesList: any[];
  @Input("classList") classList: any[];
  @Input("wagerList") wagerList: any[];
  @Input("raceCourseList") raceCourseList: any[];

  saveBetButton: boolean = true;
  finalizeBetButton: boolean = false;

  constructor(public betsService: BetsService,
    private authService: AuthenticationService,
    private generalFunctionsService: GeneralFunctionsService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  change() {
    this.charge(this.agentId, this.betsService.zoneSelected, this.betsService.classSelected, this.betsService.raceCourseSelected, this.betsService.raceSelected, this.betsService.fechaSelected)
  }

  charge(agentId: number, zoneId: number, classId: number, raceCourseId: number, raceId: number, fecha: string) {
    var clientId = Object.keys(this.authService.storeUser).length == 0 ? 0 : this.authService.storeUser.id;
    this.betsService.charge(agentId, clientId, zoneId, classId, raceCourseId, raceId, fecha)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.raceCourseList = resp.hipodromos;
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
        }
      );
  }

  toggleModal() {
    this.betsService.showModal = !this.betsService.showModal;
  }

  save() {
    console.log(this.authService.storeUser)
    console.log(this.betsService.oddSelectedList)
    if (this.betsService.oddSelectedList.filter(x => x.bet == undefined).length > 0) {
      this.generalFunctionsService.notifications('Advertencia', 'Asigne todas las apuesta.', 'warning');
    } else {
      if (Object.keys(this.authService.storeUser).length == 0) {
        this.generalFunctionsService.notifications('Advertencia', 'Debe iniciar sesión para poder apostar', 'warning');
        this.betsService.showModal = !this.betsService.showModal;
        this.router.navigate(["auth/login"]);
      } else {
        var betList: any[] = []
        this.betsService.oddSelectedList.forEach(odd => {
          var bet: any = {
            id: 0,
            //date: this.datePipe.transform(new Date(), "dd/MM/yyyy"),
            time: this.datePipe.transform(new Date(), "HH:mm"),
            //ticket_id: 0,
            //odd_id: odd.id,
            //race_id: odd.race_id,
            //horse_id: odd.horse_id,
            //value: 100,
            risk: odd.bet,
            win: 100,
            amount: parseFloat(odd.bet) + 100,
            //type: 1,
            //orden: 0,
            //status: 0,



            /* odd_id: odd.id,
            odd_type_id: 0,
            total: 0,
            zone_id: 0,
            hipodromo_id: odd.hipodromo_id,
            odd_id: 0,
            bookmaker_id: odd.bookmaker_id,
            modo: odd.modo,
            modo_name: 0,
            name: odd.name,
            us: odd.us,
            ajuste: odd.ajuste, */
          }
          betList.push(bet);
        });
        var clientId = Object.keys(this.authService.storeUser).length == 0 ? 0 : this.authService.storeUser.id;
        this.betsService.saveBet(this.agentId, clientId, this.betsService.oddSelectedList[0].id, 1, betList)
          .subscribe(
            (resp: any) => {
              debugger;
              console.log(resp);
              if (resp.success == true) {
                this.generalFunctionsService.notifications('Se ha guardado la apuesta exitosamente', 'Guardado', 'success');
                this.saveBetButton = false;
                this.finalizeBetButton = true;
              } else {
                this.generalFunctionsService.notifications('No se puedo guardar la apuesta', 'Error', 'danger');
              }
              //this.raceCourseList = resp.hipodromos;
            },
            error => {
              const errorMessage = <any>error;
              if (errorMessage != null) {
                //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
              }
            }
          );
      }
    }
  }

  finalizeBet() {
    var betList: any[] = []
    this.betsService.oddSelectedList.forEach(odd => {
      var bet: any = {
        odd_id: odd.id,
        //date: this.datePipe.transform(new Date(), "dd/MM/yyyy"),
        us: odd.us,
        type: 1,
        //ticket_id: 0,
        //odd_id: odd.id,
        //race_id: odd.race_id,
        //horse_id: odd.horse_id,
        //value: 100,
        risk: odd.bet,
        value: odd.value,
        win: 100,
        //amount: parseFloat(odd.bet) + 100,
        //type: 1,
        //orden: 0,
        //status: 0,



        /* odd_id: odd.id,
        odd_type_id: 0,
        total: 0,
        zone_id: 0,
        hipodromo_id: odd.hipodromo_id,
        odd_id: 0,
        bookmaker_id: odd.bookmaker_id,
        modo: odd.modo,
        modo_name: 0,
        name: odd.name,
        us: odd.us,
        ajuste: odd.ajuste, */
      }
      betList.push(bet);
    });
    var token = this.authService.storeUser.token;
    var clientId = Object.keys(this.authService.storeUser).length == 0 ? 0 : this.authService.storeUser.id;
    this.betsService.saveTicket(this.agentId, clientId, token, betList)
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.success == true) {
            this.generalFunctionsService.notifications('Se ha finalizado la apuesta exitosamente', 'Guardado', 'success');
            this.betsService.showModal = false;
            this.betsService.oddSelectedList = [];
          } else {
            this.generalFunctionsService.notifications('No se puedo finalizar la apuesta', 'Error', 'danger');
          }
          //this.raceCourseList = resp.hipodromos;
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
        }
      );
  }
}
