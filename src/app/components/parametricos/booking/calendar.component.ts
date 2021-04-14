import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/servicios/horario.service';

import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { Time } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
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
  horario: [];
  box: any;
  selectedDate: any;
  categoriaId:any;
  //model: NgbDateStruct;
  private _model: NgbDate;
  date: {year: number, month: number, day: number};
  turnosArray: any[] = [];
  selectedOption: string;
  printedOption: string;


  disabledDates:NgbDateStruct[]=[
    {year:2021,month:4,day:26}, {year:2021,month:4,day:20}
  ]

//  disabledDates:NgbDateStruct[]=[]

  form = this.fb.group({
    empleado: ['', Validators.required],
    fechaReserva: ['', Validators.required],
    hora: ['', Validators.required],
    disponibleId: ['',Validators.required],
    usuarioId: ['', Validators.required],
    estado: ['', Validators.required],
    disponibleBoxesId:['',Validators.required]
  });

  minDate = undefined;


  horarioEmpleado = []

  constructor(private fb: FormBuilder,
              private router: Router,
              private calendar: NgbCalendar,
              private config: NgbDatepickerConfig,
              private route: ActivatedRoute,
              private horarioService: HorarioService,
              private boxesService: BoxesService,
              private reservaService: ReservaService,
              private empleadoService: EmpleadoService ,
              private disponibleService: DisponibleService,
              public util: UtilesService ) {
               //deshabilita los dias desde HOY hacia atras 
                const current = new Date();
                this.minDate = {
                  year: current.getFullYear(),
                  month: current.getMonth() + 1,
                  day: current.getDate()
                };
  }

  
  weekDays = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    0: 'Domingo'
  }


  ngOnInit(): void {

  

    /* Obtiene el objeto disponible { disponible_id} */
    this.disponibleId = this.route.snapshot.params.id;
    this.disponibleService.getDatosRecurso(this.disponibleId)
     .subscribe( (resp: any) =>  {
       this.disponible = resp.disponible.disponibleId;
       this.empleadoId = resp.disponible.empleadoId.empleadoId;
       this.servicioId =  resp.disponible.servicioId.servicioId;
       this.categoriaId =  resp.disponible.servicioId.categoriaId.categoriaId;
       const array  = resp.horario;
       this.horario = resp.horario;

       for (let index = 0; index < array.length; index++) {
         const element:any = array[index];
         this.horarioEmpleado.push(parseInt(element.diaTrabajo, 10));  //{1,3,0}
       }
       this.selectToday();
     });



  }



  isDisabled=(date:NgbDateStruct, current: {day:number, month: number,year:number})=> {
      //in current we have the month and the year actual
      if(this.horarioEmpleado.length == 0) return false;
      const fecha = new Date( date.year, date.month-1,date.day )
      const dia_semana = fecha.getDay(); //0,1,2,3,4,5,6,7
     // const dia_encontrado = this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
      const e = this.horarioEmpleado.find(val=> val == dia_semana); //3, 
      return  typeof e == 'undefined' ? true:false   
  }





  
  selectedDay: string = '';
  set model(val) {
    this._model = val;
    this.selectedDay = this.weekDays[this.calendar.getWeekday(this.model)]
  }
  
  get model() {
    return this._model;
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }


  agendar() {
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
      if (result!=0){
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
      this.selectedDate = Date(); 
      this.selectedDate = ( this.model.year + '-' + this.model.month + '-' + this.model.day as string);
      console.log(this.selectedDate);
      console.log(this.disponible);
  
      this.disponibleService.getHorasDisponibles(this.categoriaId,this.servicioId,this.empleadoId,
        this.selectedDate)
      .subscribe( (resp: any) =>  {
          localStorage.setItem("horasDisponibles", JSON.stringify(resp));
          this.turnosArray = JSON.parse(localStorage.getItem("horasDisponibles"));
          console.log(this.turnosArray);
          console.log(this.turnosArray[0]); //{[0]=null};
        });
  }

}