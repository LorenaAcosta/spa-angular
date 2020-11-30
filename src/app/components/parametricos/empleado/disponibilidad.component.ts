import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disponibilidad',
  templateUrl: './disponibilidad.component.html',
  styleUrls: ['./disponibilidad.component.scss']
})

export class DisponibilidadComponent implements OnInit {

  form = this.fb.group({
    empleadoId: ['', Validators.required],
    servicioId: ['', Validators.required],
    comision: ['', Validators.required]
  });

  empleados: any[] = [];
  servicios: any[] = [];
  listaDisponible: any[] = [];
  searchText;

  constructor(private empleadoService: EmpleadoService,
              private servicioService: ServicioService,
              private disponibleService: DisponibleService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {

                const id = this.route.snapshot.params.id;
                this.form = this.fb.group({
                  empleadoId: [id, Validators.required],
                  servicioId: ['', Validators.required],
                  comision: ['', Validators.required]
                });

              }

  ngOnInit(): void {
     /*Listar tratamientos */
     this.servicioService.listarRecurso()
     .subscribe( (resp: any[]) =>  this.servicios = resp );
      /*Listar disp de empleado */
     const id = this.route.snapshot.params.id;
     this.getServiciosByEmpleado(id) ;

  }

  getServiciosByEmpleado(empleadoId: any) {
    this.disponibleService.listarByEmpleado(empleadoId)
    .subscribe( (resp: any[]) =>  this.listaDisponible = resp );
  }


  borrar(empleadoId: any) {
  }

  
  guardar() {

    const id = this.route.snapshot.params.id;
    console.log(id);
    let peticion: Observable<any>;
    // console.log(id);
    if (typeof id !== 'undefined') {
        peticion = this.disponibleService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
            'success'
          );
        });

    }
    this.getServiciosByEmpleado(id);
  }

}
