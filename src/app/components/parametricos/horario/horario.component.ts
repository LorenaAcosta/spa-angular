import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HorarioService } from 'src/app/services/servicios/horario.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {

  
  form2 = this.fb.group({
    horarioId: [''],
    horaFin: ['', Validators.required],
    horaInicio: ['', Validators.required],
    empleadoId: ['', Validators.required],
  });
  categorias: any[] = [];
  empleados: any[] = [];
  horarioId: any;

  constructor(private fb:             FormBuilder,
              private horarioService: HorarioService,
              private route:          ActivatedRoute,
              private router:         Router) {

      this.form2 = this.fb.group({
      horarioId: [''],
      horaFin: ['', Validators.required],
      horaInicio: ['', Validators.required],
      empleadoId: ['', Validators.required],
      });
}


  ngOnInit() {
     const id = this.route.snapshot.params.id;
     console.log(id);
     if (typeof id !== 'undefined') {
      this.form2 = this.fb.group({
        horarioId: [''],
        horaFin: ['', Validators.required],
        horaInicio: ['', Validators.required],
        empleadoId: ['', Validators.required]
       });

       this.horarioService.obtenerHorario(id)
       .subscribe ((data: any) => {
        this.form2.controls.empleadoId.setValue(data.empleadoId.nombre.concat(" ").concat(data.empleadoId.apellido) );
        this.form2.controls.horaFin.setValue(data.horaFin);
        this.form2.controls.horaInicio.setValue(data.horaInicio); 
    });
  }
}

  ver() {
    console.warn(this.form2.value);
  }

  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;

    peticion = this.horarioService.obtenerHorario(id);
    peticion.subscribe((result: any) =>  {
      this.horarioId = result.horarioId.value;
    });
   
    this.form2.controls.horarioId.setValue( this.horarioId );
    this.form2.controls.empleadoId.setValue( id );
    console.log(this.form2.value);
   
    peticion = this.horarioService.modificarRecurso(this.form2.value, id);
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

