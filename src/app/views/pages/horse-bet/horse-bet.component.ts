import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horse-bet',
  templateUrl: './horse-bet.component.html',
  styleUrls: ['./horse-bet.component.scss']
})
export class HorseBetComponent implements OnInit {

  openTab = 1;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  viewDetail(){
    this.router.navigate(["pages/detail-bets", 0]);
  }
}
