import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/servicios/horario.service';

import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { Time } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { DisponibleService } from '../../../services/servicios/disponibilidad.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { BoxesService } from 'src/app/services/servicios/boxes.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  disponibleId: number;
  disponible: any;
  empleadoId: any;
  servicioId: number;
  dispo: any;

  horaInicial: any;
  box: any;
  fecha: number;
  horaInicio: any;
  todayDate: any;
  selectedDate: any;

  model: NgbDateStruct;
  date: {year: number, month: number, day: number};
  turnosArray: any[] = [];

  arrayObject: any[] = [];
  turnos: any[] = [];

  selectedOption: string;
  printedOption: string;

  form = this.fb.group({
    empleado: [''],
    fechaReserva: [''],
    hora: ['' ],
    disponibleId: [''],
    usuarioId: [''],
    estado: [''],
    disponibleBoxesId:['']
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private calendar: NgbCalendar,
              private route: ActivatedRoute,
              private horarioService: HorarioService,
              private boxesService: BoxesService,
              private reservaService: ReservaService,
              private empleadoService: EmpleadoService ,
              private disponibleService: DisponibleService,
              private util: UtilesService ) {
  }

  ngOnInit(): void {
    /* Obtiene el objeto disponible {disponibleId, } */
    this.disponibleId = this.route.snapshot.params.id;
    
    this.disponibleService.getRecurso(this.disponibleId)
     .subscribe( (resp: any) =>  {
       this.disponible = resp.disponibleId;
       this.empleadoId = resp.empleadoId.empleadoId;
       this.servicioId =  resp.servicioId.servicioId;
       this.dispo = resp;
       localStorage.setItem('empleado', this.empleadoId);
     });
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }


  print() {
    this.printedOption = this.selectedOption;
    this.form.controls.empleado.setValue( this.empleadoId);
    this.form.controls.fechaReserva.setValue( this.selectedDate );
    this.form.controls.hora.setValue(this.selectedOption.toString().substr(-20, 5));
    this.form.controls.disponibleId.setValue(Number(this.disponibleId));
    this.form.controls.usuarioId.setValue(1);
    this.form.controls.estado.setValue('pendiente');
    //setear el box -> disponibilidadBoxId
    let peticion: Observable<any>;
    peticion = this.boxesService.obtenerUnBoxLibre(this.selectedDate, this.selectedOption.toString().substr(-20, 5), 
    this.servicioId); //veo todos los boxes que ya se usaron en esa fecha y hora con el servicio
    peticion.subscribe((result: any) =>  {
      this.box = result;
      console.log(result);
      if (result!=null){
        //SE GRABA LA RESERVA
        this.form.controls.disponibleBoxesId.setValue(this.box);
        console.log(this.form);
        peticion = this.reservaService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Reserva Confirmada!',
            'Se guardaron  los datos!',
            'success'
            );
          });
          this.router.navigateByUrl('booking/categorias');
      
        } else{
        Swal.fire(
          'Lo siento!',
          'No hay lugar disponible para este horario!',
          'error'
          );
        }
      });
    
  }




  getHorariosDisponibles() {
     /* Obtiene el objeto disponible {disponibleId, } */
    this.disponibleId = this.route.snapshot.params.id;
    
    this.disponibleService.getRecurso(this.disponibleId).subscribe( (resp: any) =>  {
       console.log(resp);
       this.empleadoId=  resp.empleadoId.empleadoId;
  

    this.selectedDate = Date();
    this.selectedDate = ( this.model.year + '-' + this.model.month + '-' + this.model.day as string);
    console.log(this.selectedDate);
    
   /* this.selectedDate = ( this.model.year + '-' + this.model.month + '-' + this.model.day as string);
    console.log(this.selectedDate);
    console.log(this.todayDate);  */
   

      this.disponibleService.getHorasDisponibles(
        resp.servicioId.categoriaId.categoriaId,
        resp.servicioId.servicioId,
        resp.empleadoId.empleadoId, 
        this.selectedDate)
      .subscribe( (resp: any) =>  {

        if (resp == null){
           Swal.fire('Lo siento!', 'No puedes seleccionar esta fecha', 'error');
        }else{
          localStorage.setItem("horasDisponibles", JSON.stringify(resp));
          this.turnosArray = JSON.parse(localStorage.getItem("horasDisponibles"));
          console.log(this.turnosArray);
          console.log(this.turnosArray[0]);
          if (this.turnosArray[0] == null){
            Swal.fire('Lo siento!', 'No hay turnos disponibles para la fecha seleccionada', 'error');
          }
        }
          
      });

    });
  }

}
