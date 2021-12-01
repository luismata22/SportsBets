import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/bets/country';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BetsService } from 'src/app/services/bets.service';

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
  @Input("oddSelectedList") oddSelectedList: any[];

  zoneSelected: number = 0;
  classSelected: number = 0;
  raceCourseSelected: number = 0;
  wagerSelected: number = 0;
  fechaSelected: string = "Todos";
  showModal = false;
  constructor(private betsService: BetsService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  change(){
    this.charge(this.agentId, this.zoneSelected, this.classSelected, this.raceCourseSelected, this.fechaSelected)
  }

  charge(agentId: number, zoneId: number, classId: number, raceCourseId: number, fecha: string){
    this.betsService.charge(agentId, zoneId, classId, raceCourseId, fecha)
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

  toggleModal(){
    this.showModal = !this.showModal;
  }

  save(){
    console.log(this.authService.storeUser)
    console.log(this.oddSelectedList)
  }
}
