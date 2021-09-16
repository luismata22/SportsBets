import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  public dataUser =
    {
      name: "",
      email: localStorage.getItem('email') || "",
      password: "",
    }

  constructor() { }

  ngOnInit(): void {
  }

  registerUser(){
    debugger;
    this.submitted = true;
    var objectRequest =
    {
      "name": this.dataUser.name,
      "username": this.dataUser.email,
      "password": this.dataUser.password
    }
  }
}
