import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HorarioService } from 'src/app/services/servicios/horario.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-horario',
  templateUrl: './horario-asignar.component.html',
  styleUrls: ['./horario-asignar.component.scss']
})

export class HorarioAsignarComponent implements OnInit {


  form = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required]
  });

  form2 = this.fb.group({
    horaFin: ['', Validators.required],
    horaInicio: ['', Validators.required],
    empleadoId: ['', Validators.required],
  });

  categorias: any[] = [];
  empleado: any[] = [];


  constructor(private fb: FormBuilder,
              private horarioService: HorarioService,
              private empleadoService: EmpleadoService,
              private route: ActivatedRoute) {

      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required]
      });
      this.form2 = this.fb.group({
        horaFin: ['', Validators.required],
        horaInicio: ['', Validators.required],
        empleadoId: ['', Validators.required],
      });
    }

  ngOnInit() {
     const id = this.route.snapshot.params.id;
     let peticion: Observable<any>;
     peticion = this.empleadoService.getRecurso(id);
     peticion.subscribe((result: any) =>  {
         this.empleado = result;
         console.log(this.empleado);
         this.form.controls.nombre.setValue(result.nombre);
         this.form.controls.apellido.setValue(result.apellido);
        });
        // hacer que busque si ya esta grabado su horario
     this.form2 = this.fb.group({
          horaFin: [ '', Validators.required],
          horaInicio: ['' , Validators.required],
          empleadoId: [Number(id)]
        });
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
     const id = this.route.snapshot.params.id;
     // tslint:disable-next-line:prefer-const
     let peticion2: Observable<any>;
     console.log(id);
     console.log(this.form2.value);
     peticion2 = this.horarioService.agregarRecurso(this.form2.value);
     peticion2.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
      });
  }

}
