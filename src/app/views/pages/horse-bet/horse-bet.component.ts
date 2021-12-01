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
  oddSelectedList: any[] = [];

  constructor(private router: Router,
    private _authService: AuthenticationService,
    private betsService: BetsService) { }

  ngOnInit(): void {
    this._authService.signin()
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.success == true) {
            this.agentId = resp.agent_id;
            this.betsService.chargeAgent(resp.agent_id)
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
  }

  charge(agentId: number) {
    this.betsService.charge(agentId, 0, 0, 0, "Todos")
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.raceCourseList = resp.hipodromos;
          this.odds = resp.odds;
          this.races = resp.races;
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
      console.log(this.oddSelectedList)
      this.oddSelectedList.push(
          oddSelected
      );
    }else{
      this.oddSelectedList = this.oddSelectedList.filter(x => x.bookmaker_id != oddSelected.bookmaker_id)
      //x.race_id != oddSelected.race_id && x.horse_id != oddSelected.horse_id && x.hipodromo_id != oddSelected.hipodromo_id && 
    }
  }
}
