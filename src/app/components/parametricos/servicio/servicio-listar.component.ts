import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-listar',
  templateUrl: './servicio-listar.component.html',
  styleUrls: ['./servicio-listar.component.scss']
})
export class ServicioListarComponent implements OnInit {

  servicios: any[] = [];
  categorias: any[] = [];
  index = 0;
  pageActual: 1;

  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.servicioService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.servicios = resp );
  }

  borrar(id: any, pos: any) {
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
          this.servicios.splice(pos, 1);
        /*
          this.servicioService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
          */
        }
      });
  }

}
