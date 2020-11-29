import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrls: ['./horario-list.component.scss']
})
export class HorarioListComponent implements OnInit {


  empleados: any[] = [];
  index = 0;
  pageActual: 1;
  closeResult = '';


  constructor(private fb: FormBuilder,
              private horarioService: HorarioService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.horarioService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.empleados = resp );
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
          this.horarioService.eliminarRecurso(id).subscribe();
          this.empleados.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

}
