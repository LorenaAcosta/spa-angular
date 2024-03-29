import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/servicios/cliente.service';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.scss']
})
export class ClienteListarComponent implements OnInit {

  clientes: any[] = [];
  index = 0;
  pageActual: 1;
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.clientes = resp );
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
          this.clientes.splice(pos, 1);
          this.clienteService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
