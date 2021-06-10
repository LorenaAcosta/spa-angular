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
  cantservicios: number;
  desservicios: string;
  cantproductos: number;
  desproductos: string;
  cantreservas: number;
  desreservas: string;


  constructor( private categoriaService: CategoriaService, ){

    }
  ngOnInit(): void {

    this.categoriaService.getdatos().subscribe((result: any) => {
      this.datos= result;
      console.log(this.datos);

      this.cantservicios =  this.datos[2].data ;
      this.desservicios  =  this.datos[2].descripcion;
      this.cantproductos  = this.datos[0].data ;
      this.desproductos   = this.datos[0].descripcion;
      this.cantreservas   = this.datos[1].data;
      this.desreservas   =  this.datos[1].descripcion;
      
    }); 
    
  }
  
  images = [444, 100, 900].map((n) => `/assets/img/${n}.jpg`);
  

}
