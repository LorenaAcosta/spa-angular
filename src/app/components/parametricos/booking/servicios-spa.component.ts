import { Component, Input, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-servicios-spa',
  templateUrl: './servicios-spa.component.html',
  styleUrls: ['./servicios-spa.component.scss']
})
export class ServicioListar2Component implements OnInit {

  servicios: any[] = [];
  detalle: any[] = [];
  categorias: any[] = [];
  arrayList: any [] = [];
  index: 0;
  value: any;
  sum = 0;
  pageActual: 1;

  constructor(private categoriaService: CategoriaService,
              private servicioService: ServicioService,
              private route: ActivatedRoute) {
               }

  ngOnInit(): void {
    this.categoriaService.obtenerPorTipo('servicio')
    .subscribe( (resp: any[]) =>  this.categorias = resp );
    /*Mostrar los servicios */
    const id = this.route.snapshot.params.id;
    if (typeof id !== 'undefined') {
    this.servicioService.listarRecursosActivos(id, 'activo')
     .subscribe( (resp: any[]) =>  this.servicios = resp );
    } else {
      this.servicioService.listarRecursosActivos(1, 'activo')
      .subscribe( (resp: any[]) =>  this.servicios = resp );
    }
  }


recargar(id: any) {
   this.servicioService.listarRecursosActivos(id, 'activo')
   .subscribe( (resp: any[]) =>  this.servicios = resp );
 }

getDetalle(servicioId) {
  this.servicioService.getRecurso(servicioId)
   .subscribe( (resp: any[]) =>  this.detalle = resp );
  console.log(this.detalle);
}


}