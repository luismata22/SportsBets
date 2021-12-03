import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/bets/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BetsService } from 'src/app/services/bets.service';
import { GeneralFunctionsService } from 'src/app/services/general-functions.service';

@Component({
  selector: 'app-bar-top',
  templateUrl: './bar-top.component.html',
  styleUrls: ['./bar-top.component.scss']
})
export class BarTopComponent implements OnInit {

  @Input("agentId") agentId: number;
  @Input("zonesList") zonesList: any[];
  @Input("classList") classList: any[];
  @Input("wagerList") wagerList: any[];
  @Input("raceCourseList") raceCourseList: any[];

  

  constructor(public betsService: BetsService,
    private authService: AuthenticationService,
    private generalFunctionsService: GeneralFunctionsService,
    private router: Router) { }

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
    }else{
      if (Object.keys(this.authService.storeUser).length == 0) {
        this.generalFunctionsService.notifications('Advertencia', 'Debe iniciar sesión para poder apostar', 'warning');
        this.betsService.showModal = !this.betsService.showModal;
        this.router.navigate(["auth/login"]);
      }else{
        var betList : any[] = []
        this.betsService.oddSelectedList.forEach(odd => {
          var bet: any = {
            
          }
        });
      }
      
    }
    
    /* this.betsService.saveBet(agentId, zoneId, classId, raceCourseId, fecha)
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
    ); */
  }
}
