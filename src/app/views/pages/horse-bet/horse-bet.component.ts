import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horse-bet',
  templateUrl: './horse-bet.component.html',
  styleUrls: ['./horse-bet.component.scss']
})
export class HorseBetComponent implements OnInit {

  racerList: number[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
  ];
  racerSelected: number = 1;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewDetail(){
    this.router.navigate(["pages/detail-bets", 0]);
  }

  selectRacer(racer: number){
    this.racerSelected=racer;
  }
}
