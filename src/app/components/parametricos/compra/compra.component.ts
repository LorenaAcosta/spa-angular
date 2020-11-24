import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import Swal from 'sweetalert2';
import { CompraEditComponent } from './compra-edit.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  compras: any[] = [];
  detalles: any[] = [];
  compra: any;
  index: 0;
  pageActual: 1;

  constructor(
    private compraService: ComprasService,
    private detallesCompraService: DetallesCompraService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.compraService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.compras = resp  );
  }

  getCategorias(id) {
    this.compraService.getRecurso(id)
    .subscribe( (resp: any[]) =>  this.compra = resp  );
  }
  getDetalles(id) {
    this.detallesCompraService.getRecurso(id)
    .subscribe( (resp: any[]) => this.detalles = resp);
    console.log(this.detalles);
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
          this.compras.splice(pos, 1);
          this.compraService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
