import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.component.html',
  styleUrls: ['./disponible.component.scss']
})
export class DisponibleComponent implements OnInit {

  empleados: any[] = [];
  servicios: any[] = [];
  disponibles: any[] = [];
  empId: number;
  form = this.fb.group({
    comision: ['', Validators.required],
    empleadoId: ['', Validators.required],
    servicioId: ['', Validators.required]
  });

  constructor(private servicioService: ServicioService,
              private empleadoService: EmpleadoService,
              private disponibleService: DisponibleService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.empleadoService.listarRecurso().
     subscribe( (resp: any[]) =>  this.empleados = resp );

    this.servicioService.listarRecurso().
    subscribe( (resp: any[]) =>  this.servicios = resp );

    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        comision: ['', Validators.required],
        empleadoId: ['', Validators.required],
        servicioId: ['', Validators.required]
      });

      this.disponibleService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.comision.setValue(data.comision);
        this.form.controls.empleadoId.setValue(data.empleadoId);
        this.form.controls.servicioId.setValue(data.servicioId);
       });
    }
  }



  guardar() {
    const id = this.route.snapshot.params.id;

    if (typeof id === 'undefined') {
     this.disponibleService.agregarRecurso(this.form.value)
      .subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron  los datos!',
          'success'
        );
      },(err)=>{
        
      });
    }
  }


}
