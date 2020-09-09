import { Component, OnInit } from '@angular/core';
import { MediosPagoService } from '../../../services/servicios/medios-pago.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medios-pago-listar',
  templateUrl: './medios-pago-listar.component.html',
  styleUrls: ['./medios-pago-listar.component.scss']
})
export class MediosPagoListarComponent implements OnInit {

  index: 1;
  medioPago: any[] = [];
  pageActual: 1;

  constructor( private medioPagoService: MediosPagoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.medioPagoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.medioPago = resp  );
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
          this.medioPago.splice(pos, 1);
          this.medioPagoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
