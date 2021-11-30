import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/bets/country';
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

  zoneSelected: number = 0;
  classSelected: number = 0;
  raceCourseSelected: number = 0;
  wagerSelected: number = 0;
  fechaSelected: string = "Todos";
  constructor(private betsService: BetsService) { }

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
}
