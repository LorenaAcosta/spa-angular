import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ProductoService } from '../../../services/servicios/producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';


@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.scss']
})

export class ProductoListarComponent implements OnInit {

  index: 1;
  productos: any[] = [];
  pageActual: 1;


  constructor(private productoService: ProductoService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.productos = resp  );
  }

  borrar( id: any, pos: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esta operación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          this.productos.splice(pos, 1);
          this.productoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
