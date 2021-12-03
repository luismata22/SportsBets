import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BetsService } from 'src/app/services/bets.service';

@Component({
  selector: 'app-horse-bet',
  templateUrl: './horse-bet.component.html',
  styleUrls: ['./horse-bet.component.scss']
})
export class HorseBetComponent implements OnInit {

  racerSelected: number = 1;
  zonesList: any[] = [];
  classList: any[] = [];
  raceCourseList: any[] = [];
  odds: any[] = [];
  races: any[] = [];
  wagerList: any[] = [];
  agentId: number = 0;
  clientId: number = 0;
  

  constructor(private router: Router,
    private _authService: AuthenticationService,
    public betsService: BetsService) { }

  ngOnInit(): void {
    this._authService.signin()
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.success == true) {
            this.agentId = resp.agent_id;
            this.clientId = Object.keys(this._authService.storeUser).length == 0 ? 0 : this._authService.storeUser.id;
            console.log(this._authService.storeUser)
            this.betsService.chargeAgent(resp.agent_id, this.clientId)
              .subscribe(
                (resp1: any) => {
                  console.log(resp1);
                  this.zonesList = resp1.zones;
                  this.classList = resp1.clases;
                  this.wagerList = resp1.wagers;
                  this.charge(resp.agent_id)
                },
                error => {
                  const errorMessage = <any>error;
                  if (errorMessage != null) {
                    //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
                  }
                }
              );
          }
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
        }
      );
  }

  viewDetail() {
    this.router.navigate(["pages/detail-bets", 0]);
  }

  selectRacer(racer: number) {
    this.racerSelected = racer;
    this.betsService.charge(this.agentId, this.clientId, this.betsService.zoneSelected, this.betsService.classSelected, this.betsService.raceCourseSelected, racer, this.betsService.fechaSelected)
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

  charge(agentId: number) {
    this.betsService.charge(agentId, this.clientId, 0, 0, 0, 0, "Todos")
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.raceCourseList = resp.hipodromos;
          var odds = resp.odds;
          this.races = resp.races;
          //debugger;
          if (this.betsService.oddSelectedList.length > 0) {
            this.betsService.showModal = !this.betsService.showModal;
            this.betsService.oddSelectedList.forEach(odd => {
              if (odds.filter(x => x.id == odd.id).length > 0) {
                odds.find(x => x.id == odd.id).checked = true;
              }else{
                odds.find(x => x.id == odd.id).checked = false;
              }
            });
            this.odds = odds;
          }else{
            this.odds.map(x => x.checked = false)
            this.odds = odds;
          }
        },
        error => {
          const errorMessage = <any>error;
          if (errorMessage != null) {
            //this.generalFunctionsService.notifications('Usuario no válido, verifique sus credenciales', 'danger');\
          }
        }
      );
  }

  changeSelected(oddSelected: any, event) {
    if (event.target.checked === true) {
      console.log(this.betsService.oddSelectedList)
      this.betsService.oddSelectedList.push(
          oddSelected
      );
    }else{
      this.betsService.oddSelectedList = this.betsService.oddSelectedList.filter(x => x.id != oddSelected.id)
      //x.race_id != oddSelected.race_id && x.horse_id != oddSelected.horse_id && x.hipodromo_id != oddSelected.hipodromo_id && 
    }
  }
}
