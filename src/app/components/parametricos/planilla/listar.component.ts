import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConceptosService } from 'src/app/services/servicios/conceptos.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { PlanillaService } from 'src/app/services/servicios/planilla.service';
import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { UsuarioService } from 'src/app/services/servicios/usuario.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {

  empleados: any[] = [];
  empleado;
  confirmados: any[] = [];
  conceptos: any[] = [];
  conceptosIngreso: any[] = [];
  conceptosDescuento: any[] = [];
  selectedEmpleado;
  subtotal: number;
  ingresos: number;
  descuentos: number;
  selectedMes;
  closeResult = '';
  articuloselect: PlanillaDetalle = new PlanillaDetalle(0, 0, 0, 0, 0 ,0 );
  datosGuardar: PlanillaDetalle[] = [];
  currentDate = Date.now();
  suma: number;

  @ViewChild(MatTable) tabla1: MatTable<PlanillaDetalle>;
  @ViewChild(MatTable) tab: MatTable<PlanillaDetalle>;

  constructor( private empleadoService: EmpleadoService,
              private reservaService: ReservaService,
              private conceptosService: ConceptosService,
              private planillaService: PlanillaService,
              private usuarioService: UsuarioService,
              private fb: FormBuilder,
              private util: UtilesService,
              private modalService: NgbModal  ) {
    this.form = this.fb.group({
      numeroPatronal:  ['', Validators.required],
      numeroPatronalips:  ['', Validators.required],
      fechaPago:  ['', Validators.required],
      mesPago:  ['', Validators.required],
      añoPago: ['', Validators.required],
      total:  ['', Validators.required],
      descuento:  ['', Validators.required],
      saldo:  ['', Validators.required],
      empleadoId: ['', Validators.required],
      usuarioId: ['', Validators.required]
    });

   }
  
   form = this.fb.group({
    numeroPatronal:  ['', Validators.required],
    numeroPatronalips:  ['', Validators.required],
    fechaPago:  ['', Validators.required],
    mesPago:  ['', Validators.required],
    añoPago: ['', Validators.required],
    total:  ['', Validators.required],
    descuento:  ['', Validators.required],
    saldo:  ['', Validators.required],
    empleadoId: ['', Validators.required],
    usuarioId: ['', Validators.required]
  });

  form2 = this.fb.group({
    conceptoId:  ['', Validators.required],
    descripcion:  ['', Validators.required]
  });

  months = [
    {"cod":1, "mes": "ENERO"},
    {"cod":2, "mes": "FEBRERO"},
    {"cod":3, "mes": "MARZO"},
    {"cod":4, "mes": "ABRIL"},
    {"cod":5, "mes": "MAYO"},
    {"cod":6, "mes": "JUNIO"},
    {"cod":7, "mes": "JULIO"},
    {"cod":8, "mes": "AGOSTO"},
    {"cod":9, "mes": "SEPTIEMBRE"},
    {"cod":10, "mes": "OCTUBRE"},
    {"cod":11, "mes": "NOVIEMBRE"},
    {"cod":12, "mes": "DICIEMBRE"} 
  ]
    

  ngOnInit(): void {
    this.empleadoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.empleados = resp  );


  }








  procesarComisiones(){
    this.selectedEmpleado= this.form.controls.empleadoId.value;
    this.selectedMes= this.form.controls.mesPago.value;
    console.log(this.selectedEmpleado);

    //Datos del empleado
    this.empleadoService.getRecurso(this.selectedEmpleado)
    .subscribe( (resp: any[]) =>  this.empleado = resp  );
    
    //datos de ingresos
    this.conceptosService.listarRecursos(1)
    .subscribe( (resp: any[]) =>  this.conceptosIngreso = resp  );

    //Daos de descuento
    this.conceptosService.listarRecursos(2)
    .subscribe( (resp: any[]) =>  this.conceptosDescuento = resp  );

    //get reservas confirmadas
    this.reservaService.getReservasConfirmadasEmpleado(this.selectedEmpleado, this.selectedMes)
    .subscribe( (resp: any[]) => { 
      
      this.confirmados = resp; 
      console.log(resp);

      //Calculamos el TOTAL 
      this.subtotal = this.confirmados.reduce((sum, value) =>
      (typeof value.disponibleId.servicioId.costo == "number" ? sum + (value.disponibleId.servicioId.costo * (value.disponibleId.comision/100)) : sum), 0);
      console.log(this.subtotal);

       //Calculamos los INGRESOS 
      this.ingresos = this.conceptosIngreso.reduce((sum, value) =>
      (typeof value.valor == "number" ? sum + value.valor : sum), 0);
      console.log(this.ingresos);

       //Calculamos los DESCUENTOS
      this.descuentos = this.conceptosIngreso.reduce((sum, value) =>
      (typeof value.valor == "number" ? sum + value.valor : sum), 0);
      console.log(this.descuentos);

  

    } );

  }







  reCalcularIngresos(){
    this.ingresos = this.conceptosIngreso.reduce((sum, value) =>
    (typeof value.valor == "number" ? sum + value.valor : sum), 0);
    console.log(this.ingresos);
  }
  reCalcularDescuentos(){
    this.descuentos = this.conceptosDescuento.reduce((sum, value) =>
    (typeof value.valor == "number" ? sum + value.valor : sum), 0);
    console.log(this.descuentos);
  }









  guardar(){
    
    this.form.controls.numeroPatronal.setValue('12356');
    this.form.controls.numeroPatronalips.setValue('222333');
    this.form.controls.fechaPago.setValue(this.currentDate);
    let mesPago= this.util.getMonth(this.form.controls.mesPago.value);
    console.log(mesPago); //'mayo'
    this.form.controls.mesPago.setValue(mesPago);
    var dateobj = new Date();
    var B = dateobj.getFullYear();
    this.form.controls.anhoPago.setValue(B );
    this.form.controls.total.setValue( this.subtotal + this.empleado.sueldo + this.ingresos );
    this.form.controls.descuento.setValue(this.descuentos);
    this.form.controls.saldo.setValue(this.form.controls.total.value - this.form.controls.descuento.value);
    this.form.controls.empleadoId.setValue(this.empleado.empleadoId);
    this.form.controls.usuarioId.setValue(this.usuarioService.obtenerUsuarioLogueado());



    let peticion: Observable<any>;
    console.log(this.form.value);
    peticion = this.planillaService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      console.log(result),
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      /*
      for (let detalle of this.datosGuardar){
        console.warn(detalle);
        detalle.planillaId = planillaId;
       
        this.planillaService.agregarRecurso(detalle).subscribe(( res: any) => {
          console.log(res);
        });
      }*/

    });
  

  }

}


export class PlanillaDetalle {
  constructor(public planillaDetalleId: number, 
              public montoDebe: number,
              public monetoHaber: number,
              public conceptoId: number,
              public reservas: number ,
              public planillaId: number,
      ) {
  }
}


