import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  openTab = 1;
  showModal = false;
  columns: any[] = [{
    title: 'Nombre',
    data: 'id'
  }, {
    title: 'Estatus',
    data: 'firstName'
  }, {
    title: 'Acciones',
    data: 'lastName'
  }];

  listData: any[] = [{
    id: 1,
    firstName: "Luis",
    lastName: "Mata"
  }, {
    id: 2,
    firstName: "Prueba",
    lastName: "M1212ata"
  }, {
    id: 3,
    firstName: "eqweqw",
    lastName: "Mata"
  }];
  userLogged: any;
  
  constructor(private authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.userLogged = this.authService.storeUser;
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
  
  toggleModal(){
    this.showModal = !this.showModal;
  }

  edit(data){
    console.log(data);
  }
}
