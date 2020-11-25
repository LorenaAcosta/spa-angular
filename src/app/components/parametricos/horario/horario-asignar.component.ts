import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario-asignar.component.html',
  styleUrls: ['./horario-asignar.component.scss']
})

export class HorarioAsignarComponent implements OnInit {


  form = this.fb.group({
    horaFin: ['', Validators.required],
    horaInicio: ['', Validators.required]
  });

  // tslint:disable-next-line:ban-types
  horario: {horaInicio: String, horaFin: String, empleadoId: number};


  // categorias$: Observable<any>;
  categorias: any[] = [];
  selectedPersonId = 'Elegir';
  empleado: any;

  constructor(private fb: FormBuilder,
              private horarioService: HorarioService,
              private empleadoService: EmpleadoService,
              private route: ActivatedRoute) {

      this.form = this.fb.group({
        horaFin: ['', Validators.required],
        horaInicio: ['', Validators.required]
      });
    }

  ngOnInit() {
     const id = this.route.snapshot.params.id;
     let peticion: Observable<any>;
     peticion = this.empleadoService.getRecurso(id);
     peticion.subscribe((result: any) =>  {
         this.empleado = result;
         console.log(this.empleado);
        });

     if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        horaFin: ['', Validators.required],
        horaInicio: ['', Validators.required]
      });
      this.horarioService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.horaFin.setValue(data.cedula);
        this.form.controls.horaInicio.setValue(data.nombre);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
     const id = this.route.snapshot.params.id;
     let peticion: Observable<any>;
     if (typeof id === 'undefined') {
       console.log(id);
       /*Insertar empleado */
       peticion = this.horarioService.agregarRecurso(this.form.value);
       peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
            'success'
          );
        });
      } else {
        peticion = this.horarioService.modificarRecurso(this.form.value, id);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se actualizaron los datos!',
            'success'
          );
        });
      }
    }

}


