import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  edit(data){
    console.log(data);
  }
}
