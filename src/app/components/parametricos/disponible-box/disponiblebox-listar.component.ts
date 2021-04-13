import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './disponiblebox-listar.component.html',
  styleUrls: ['./disponiblebox-listar.component.scss']
})
export class ListarComponent implements OnInit {

  disponible: any[] = [];
  index = 0;
  pageActual: 1;
  closeResult = '';

  constructor(private fb: FormBuilder,
              private disponibleService: DisponibleService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.disponibleService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.disponible = resp );
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
          this.disponibleService.eliminarRecurso(id).subscribe();
          this.disponible.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
