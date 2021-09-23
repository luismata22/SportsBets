import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-bets',
  templateUrl: './detail-bets.component.html',
  styleUrls: ['./detail-bets.component.scss']
})
export class DetailBetsComponent implements OnInit {

  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  viewDetail(){
    this.router.navigate(["detail-bets", 0]);
  }

}
