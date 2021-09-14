import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horse-bet',
  templateUrl: './horse-bet.component.html',
  styleUrls: ['./horse-bet.component.scss']
})
export class HorseBetComponent implements OnInit {

  openTab = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
}
