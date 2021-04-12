import { Component, Input, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { UtilesService } from 'src/app/services/servicios/utiles.service';


@Component({
  selector: 'app-servicios-spa',
  templateUrl: './servicios-spa.component.html',
  styleUrls: ['./servicios-spa.component.scss']
})
export class ServicioListar2Component implements OnInit {

  servicios: any[] = [];
  detalle: any[] = [];
  categorias: any[] = [];
  categoriaId: any;

  constructor(private categoriaService: CategoriaService,
    private servicioService: ServicioService,
    private route: ActivatedRoute,
    private util: UtilesService) {
  }

  ngOnInit(): void {
    //obtener las categorias
    this.categoriaService.obtenerPorTipo('servicio')
      .subscribe((resp: any[]) => this.categorias = resp);

    /*Mostrar los servicios */
    this.categoriaId = this.route.snapshot.paramMap.get('id');

    if (typeof this.categoriaId !== 'undefined') {
      this.servicioService.getServiciosCalendar(this.categoriaId)
        .subscribe((resp: any[]) => this.servicios = resp);

    } else {
      this.servicioService.getServiciosCalendar(1)
        .subscribe((resp: any[]) => this.servicios = resp);
    }
  }


  recargar(id: any) {
    this.servicioService.getServiciosCalendar(id)
      .subscribe((resp: any[]) => this.servicios = resp);
  }

  getDetalle(servicioId) {
    this.servicioService.getRecurso(servicioId)
      .subscribe((resp: any[]) => this.detalle = resp);
  }


}
