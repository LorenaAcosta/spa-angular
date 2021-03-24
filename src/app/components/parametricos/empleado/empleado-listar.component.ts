import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import {NgbModal,NgbActiveModal,  } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators,FormControl } from '@angular/forms';





@Component({
  selector: 'app-empleado-listar',
  templateUrl: './empleado-listar.component.html',
  styleUrls: ['./empleado-listar.component.scss']
})


export class EmpleadoListarComponent implements OnInit {

  empleados: any[] = [];
  index = 0;
  pageActual: 1;
  closeResult = '';
  
  ngOnInit() {
    this.empleadoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.empleados = resp );
  }

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private modalService: NgbModal ) {

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
          this.empleadoService.eliminarRecurso(id).subscribe();
          this.empleados.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

  buscar(termino: String){
    console.log(termino);
    this.empleadoService.getBusqueda(termino)
    .subscribe( (resp: any ) =>  {
      console.log(resp);
      this.empleados = resp;
    });
  }

}



