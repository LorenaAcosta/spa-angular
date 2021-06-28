import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-listar2',
  templateUrl: './producto-listar2.component.html',
  styleUrls: ['./producto-listar2.component.scss']
})
export class ProductoListar2Component implements OnInit {

  productos: any[] = [];
  productosLista: Producto[] = [];
  listaProductos: any[] = [];
  detalle: any[] = [];
  categorias: any[] = [];
  arrayList: any [] = [];
  index: 0;
  value: any;
  sum = 0;
  id = 1;
  urlImagen: string = 'http://localhost:8084/api/files/';

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
    this.productoService.listarRecursosActivos()
     .subscribe( (resp: any[]) =>  this.productos = resp );
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

agregarCarrito(cod: number){
  let p = new Producto(this.productos[cod].productoId, this.productos[cod].descripcion, 1 , this.productos[cod].precioVenta, this.productos[cod].precioVenta);
  console.log(p.productoId);
  for (let detalle of this.productos) {
        if (detalle.productoId.productoId === p.productoId) {
                Swal.fire(
                  'Producto duplicado',
                  'Puedes definir cantidad en tu carrito!',
                  'warning'
                );
                exit();
        }
  }
   this.productosLista.push(new Producto(this.productos[cod].productoId, this.productos[cod].descripcion, 1 , this.productos[cod].precioVenta, this.productos[cod].precioVenta));
   
   Swal.fire({
    position: 'top-end',
    title: 'Producto agregado al carrito',
    timer: 1500
  })
  console.log(this.productosLista);
  localStorage.setItem('carrito',  JSON.stringify(this.productosLista));
}

}


export class Producto {
  constructor(public productoId: number, public nombre: string, public cant: number, public precio: number,  public subtotal:number) {
  }
}