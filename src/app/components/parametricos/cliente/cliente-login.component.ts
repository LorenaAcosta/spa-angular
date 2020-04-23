import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit {

  credentials = {username: '', password: ''};
   invalidLogin = false;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit(): void {}

  checklogin() {
  /*  this.auth.authenticate(this.credentials)
    .subscribe((data: any) => {
        this.router.navigateByUrl('home');
        this.invalidLogin = false;
    }, error => {
      this.invalidLogin = true; }
    ); */
  }



}
