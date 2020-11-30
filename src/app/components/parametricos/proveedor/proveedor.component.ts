import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  proveedores: any[] = [];
  index: 0;
  pageActual: 1;

  constructor(private proveedorService: ProveedorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.proveedorService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.proveedores = resp  );
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
          this.proveedores.splice(pos, 1);
          this.proveedorService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
    }

}
