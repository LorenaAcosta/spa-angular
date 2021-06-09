import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})


export class DashboardComponent implements OnInit {
  datos: any;

  
  constructor( private categoriaService: CategoriaService, ){

    }
  ngOnInit(): void {

    this.categoriaService.getdatos().subscribe((result: any) => {
      this.datos= result;
      console.log(this.datos);
    }); 
    
  }
  
  images = [444, 100, 900].map((n) => `/assets/img/${n}.jpg`);
  

}
