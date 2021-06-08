import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConceptosService } from 'src/app/services/servicios/conceptos.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { PlanillaDetalleService } from 'src/app/services/servicios/planilla-detalle.service';
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
  ingresos: any[] = [];
  descuentos: number;
  selectedMes;
  closeResult = '';
  articuloselect: PlanillaDetalle = new PlanillaDetalle(0, 0, 0, 0, 0 ,0 );
  datosGuardar: PlanillaDetalle[] = [];
  item: ConceptosIngreso = new ConceptosIngreso(0, '' , '', 0);
  currentDate = Date.now();
  suma: number;
  anho: number;

  @ViewChild(MatTable) tabla1: MatTable<PlanillaDetalle>;
  @ViewChild(MatTable) tab: MatTable<PlanillaDetalle>;
  currentYear: Date;
  date: any;

  constructor( private empleadoService: EmpleadoService,
              private reservaService: ReservaService,
              private conceptosService: ConceptosService,
              private planillaService: PlanillaService,
              private planillaDetalleService: PlanillaDetalleService,
              private usuarioService: UsuarioService,
              private fb: FormBuilder,
              public util: UtilesService,
              private modalService: NgbModal  ) {
    this.form = this.fb.group({
      numeroPatronal:  ['', Validators.required],
      numeroPatronalips:  ['', Validators.required],
      fechaPago:  ['', Validators.required],
      mesPago:  ['', Validators.required],
      anhoPago: ['', Validators.required],
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
    anhoPago: ['', Validators.required],
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

  getFullYear(){

  }






  procesarComisiones(){
    this.selectedEmpleado= this.form.controls.empleadoId.value;
    this.selectedMes= this.form.controls.mesPago.value;

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
      (typeof value.disponibleId.servicioId.costo == "number" ? sum + ( value.disponibleId.servicioId.costo * (value.disponibleId.comision/100) ) : sum), 0);
      console.log(this.subtotal);

       //Calculamos los INGRESOS 
      this.ingresos = this.conceptosIngreso.reduce((sum, value) =>
      (typeof value.valor == "number" ? sum + value.valor : sum), 0);
      console.log(this.ingresos);

       //Calculamos los DESCUENTOS
      this.descuentos = this.conceptosDescuento.reduce((sum, value) =>
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

    //console.log('guardr');
    
    this.form.controls.numeroPatronal.setValue('12356');
    this.form.controls.numeroPatronalips.setValue('222333');
    this.form.controls.fechaPago.setValue(this.currentDate);
    let mesPago: String = this.util.getMonth(this.form.controls.mesPago.value);
    this.form.controls.mesPago.setValue(mesPago);

    let anio: number = new Date().getFullYear();
    this.form.controls.anhoPago.setValue( anio );
    
    let total:number =  this.subtotal + this.empleado.sueldo + this.ingresos;
    this.form.controls.total.setValue( total );  
    this.form.controls.descuento.setValue(this.descuentos);
    this.form.controls.saldo.setValue(this.form.controls.total.value - this.form.controls.descuento.value);
    this.form.controls.empleadoId.setValue(this.empleado.empleadoId);
    this.form.controls.usuarioId.setValue(this.usuarioService.obtenerUsuarioLogueado());

    let peticion: Observable<any>;
    Swal.fire({
      title: 'Desea confirmar y guardar esta planilla?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, procesar'
      }).then((result) => {
        if (result.value) {
          peticion = this.planillaService.agregarRecurso(this.form.value);
          peticion.subscribe((result: any) =>  {
  
              let r = result;
              this.planillaService.getRecurso(r.planilla.planillaId)
              .subscribe((r:any)=> {
                  let data = r;
                  let planilla = data.planillaId; 
                 
                  console.log('planilla: ' + planilla);

                  //Se inserta el salario base
                  this.datosGuardar.push(
                    new PlanillaDetalle( 0, 999, this.empleado.sueldo, 0, planilla , null )); 

                    //SE INSERTA EL DETALLE DE COMISIONES
                    for (let variable in this.confirmados) {      
                      this.datosGuardar.push(
                        new PlanillaDetalle( 0, 990,
                          (this.confirmados[variable].disponibleId.servicioId.costo * (this.confirmados[variable].disponibleId.comision/100)), 
                          0, planilla , this.confirmados[variable].reservaId )); 
                    } 

                    console.log('ingresos' + this.conceptosIngreso);
                    //SE INSERTA EL DETALLE DE AGREGADOS
                    for (let ingre in this.conceptosIngreso) { 
                        this.datosGuardar.push(new PlanillaDetalle( 0, this.conceptosIngreso[ingre].conceptosId,
                          this.conceptosIngreso[ingre].valor, 0, planilla, null))
                    } 
                   // console.log('descuentos' + this.conceptosDescuento);

                    //SE INSERTA EL DETALLE DE DESCUENTOS
                    for (let des in this.conceptosDescuento) { 
                        this.datosGuardar.push(new PlanillaDetalle( 0, this.conceptosDescuento[des].conceptosId,
                          0, this.conceptosDescuento[des].valor,  planilla, null))
                    }  

                    for (let detalle of this.datosGuardar){
                      console.warn(detalle);
                      this.planillaDetalleService.agregarRecurso(detalle).subscribe(( res: any) => {
                        console.log(res);
                      });
                    }
                    Swal.fire(
                      'Guardado!',
                      'Se guardaron los datos!',
                      'success'
                    )
              });

            });
      }
    });
  }
}


export class PlanillaDetalle {
  constructor(public planillaDetalleId: number, 
              public conceptoId: number,
              public montoDebe: number,
              public montoHaber: number,
              public planilla: number,
              public reservas: number 
      ) {
  }
}

export class ConceptosIngreso {
  constructor(public conceptosId: number, 
              public descripcion: string,
              public tipo: string,
              public valor: number
      ) {
  }
}