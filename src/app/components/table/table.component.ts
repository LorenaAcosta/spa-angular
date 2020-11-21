import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ProductoService } from 'src/app/services/servicios/producto.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  columnas: string[] = ['codigo', 'descripcion', 'precio', 'producto', 'borrar'];

  datos: Detalle[] = [
    /*new Articulo(1, 'papas', 55),
    new Articulo(2, 'manzanas', 53),
    new Articulo(3, 'naranjas', 25),*/
  ];
  productos: any[] = [];

  constructor(
    private productoService: ProductoService
  ) { }

  articuloselect: Detalle = new Detalle(0, 0, 0, this.productos);

  @ViewChild(MatTable) tabla1: MatTable<Detalle>;

  borrarFila(cod: number) {
    if (confirm('Realmente quiere borrarlo?')) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    this.datos.push(new Detalle(this.articuloselect.cantidad, this.articuloselect.comprasId,
      this.articuloselect.precioCompra, this.productos));
    this.tabla1.renderRows();
    this.articuloselect = new Detalle(0, 0, 0 , this.productos);
    console.log(this.datos);
  }

  ngOnInit(): void {
    this.productoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.productos = resp  );
    console.log('productos');
    console.log(this.productos);
  }
}


export class Detalle {
  constructor(public cantidad: number, public comprasId: number, public precioCompra: number, public productoId: any,
      ) {
  }
}
