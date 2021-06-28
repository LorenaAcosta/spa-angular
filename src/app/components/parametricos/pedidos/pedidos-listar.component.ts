import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoCabeceraService } from 'src/app/services/servicios/carrito-cabecera.service';
import { CarritoService } from 'src/app/services/servicios/carrito.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-listar',
  templateUrl: './pedidos-listar.component.html',
  styleUrls: ['./pedidos-listar.component.scss']
})
export class PedidosListarComponent implements OnInit {
  carrito: any[] = [];
  cabecera: any;
  detalles: any[] = [];
  fecha: any;
  orden: any;
  total: any;
  usuarioId: any;
  constructor( private carritoService: CarritoCabeceraService, public utilService: UtilesService,
    private carritodetallesService: CarritoService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    console.log('id'+ id);
    if (typeof id !== 'undefined') {
      this.carritoService.misOrdenes(id).subscribe( (resp: any) => { 
        this.carrito = resp ; 
        console.log(this.carrito) });
    } else {
      this.carritoService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.carrito = resp  );
    }
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
          this.carrito.splice(pos, 1);
          this.carritoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

  
  getDetallesDetalles(id) {
    this.carritodetallesService.getRecurso(id)
    .subscribe( (resp: any[]) => this.detalles = resp);
    console.log(this.detalles);
    //this.getFacturaReport(id);
  }


  getCabecera(id){
    this.carritoService.getRecurso(id)
    .subscribe( (resp: any) => {
      this.fecha = resp.fecha,
      this.orden = resp.orden,
      this.total = resp.total,
      this.usuarioId = resp.usuarioId
      console.log('cabecera' + resp);
    });
  }

}
