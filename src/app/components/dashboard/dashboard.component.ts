import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../services/servicios/cliente.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  constructor() {
  }

  // authenticated() { return this.auth.authenticated; }


  ngOnInit() {
    document.body.classList.add('bg-img');
  }

}
