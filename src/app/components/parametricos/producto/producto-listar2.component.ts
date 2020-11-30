import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';

@Component({
  selector: 'app-producto-listar2',
  templateUrl: './producto-listar2.component.html',
  styleUrls: ['./producto-listar2.component.scss']
})
export class ProductoListar2Component implements OnInit {

  productos: any[] = [];
  detalle: any[] = [];
  categorias: any[] = [];
  arrayList: any [] = [];
  index: 0;
  value: any;
  sum = 0;
  id = 1;

  constructor(private categoriaService: CategoriaService,
              private productoService: ProductoService,
              private route: ActivatedRoute) {
               }

  ngOnInit(): void {
     /*Mostrar las categorias de productos */
    this.categoriaService.obtenerPorTipo('producto')
    .subscribe( (resp: any[]) =>  this.categorias = resp );
    /*Mostrar los producto */
    const id = this.route.snapshot.params.id;
    if (typeof id !== 'undefined') {
    this.productoService.listarRecursoPorCategoria(id)
     .subscribe( (resp: any[]) =>  this.productos = resp );
    } else {
      this.productoService.listarRecursoPorCategoria(1)
      .subscribe( (resp: any[]) =>  this.productos = resp );
    }
  }


recargar(id: any) {
   this.productoService.listarRecursoPorCategoria(id)
   .subscribe( (resp: any[]) =>  this.productos = resp );
 }

getDetalle(servicioId) {
  this.productoService.getRecurso(servicioId)
   .subscribe( (resp: any[]) =>  this.detalle = resp );
  console.log(this.detalle);
}

}
