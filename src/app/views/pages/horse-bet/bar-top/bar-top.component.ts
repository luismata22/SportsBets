import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/bets/country';
import { BetsService } from 'src/app/services/bets.service';

@Component({
  selector: 'app-bar-top',
  templateUrl: './bar-top.component.html',
  styleUrls: ['./bar-top.component.scss']
})
export class BarTopComponent implements OnInit {

  countriesList: Country[] = [];

  constructor(private betsService: BetsService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.betsService.getCountries().subscribe((resp: any) => {
      this.countriesList = resp;
    })
  }
}
