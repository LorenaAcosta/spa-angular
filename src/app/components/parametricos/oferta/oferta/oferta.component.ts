import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  constructor(private servicioService: ServicioService) { }
  servicios: any[] = [];

  ngOnInit(): void {
    this.servicioService.listarRecursoPorEstado('promo')
     .subscribe( (resp: any[]) =>  this.servicios = resp );
  }

}
