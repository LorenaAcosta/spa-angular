import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HorarioService } from 'src/app/services/servicios/horario.service';


@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.scss']
})
export class EmpleadoEditComponent implements OnInit {

  form = this.fb.group({
    cedula: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    fechaNac: ['', Validators.required]
  });

  horario = this.fb.group({
    horaFin: ['', Validators.required],
    horaInicio: ['', Validators.required],
    empleadoId: ['', Validators.required],
  });

  get cedula() { return this.form.get('cedula'); }
  get telefono() { return this.form.get('telefono'); }

  // categorias$: Observable<any>;
  categorias: any[] = [];
  selectedPersonId = 'Elegir';
  empleadoId;

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private horarioService: HorarioService,
              private route: ActivatedRoute,
              private router: Router) {

      this.form = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNac: ['', Validators.required]
      });
    }

  ngOnInit() {
   // this.categorias$ = this.categoriaService.listarRecurso();
     const id = this.route.snapshot.params.id;
     if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNac: ['', Validators.required]
       // horaEntrada: ['', Validators.required],
       // horaSalida: ['', Validators.required]
       });
      this.empleadoService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.cedula.setValue(data.cedula);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.fechaNac.setValue(data.fechaNac);
        //this.form.controls.horaEntrada.setValue(data.horaEntrada);
        //this.form.controls.horaSalida.setValue(data.horaSalida);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
     const id = this.route.snapshot.params.id;
     let peticion: Observable<any>;
     if (typeof id == 'undefined') {

      /*Insertar empleado  */
      peticion = this.empleadoService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
         console.log(result);
         this.horario.controls.horaFin.setValue("00:00");
         this.horario.controls.horaInicio.setValue("00:00");
         this.horario.controls.empleadoId.setValue(result.empleadoId);

        /*Insertar horario tambien*/
        peticion = this.horarioService.agregarRecurso(this.horario.value);
        peticion.subscribe((result: any) =>  {
                 Swal.fire(
                 'Guardado!',
                 'Empleado insertado. Debe asignar un horario!',
                 'success'
               );
           this.router.navigate(['/empleado/listar']);
         }); 

      }); 




      } else {
        peticion = this.empleadoService.modificarRecurso(this.form.value, id);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se actualizaron los datos!',
            'success'
          );
          this.router.navigate(['/empleado/listar']);
        });
      }
    }
}
