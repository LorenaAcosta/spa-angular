import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { exit } from 'process';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/servicios/cliente.service';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { ComprobanteService } from 'src/app/services/servicios/comprobante.service';
import { ConceptosService } from 'src/app/services/servicios/conceptos.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import { DetalleVentaService } from 'src/app/services/servicios/detalles-venta.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { MediosPagoService } from 'src/app/services/servicios/medios-pago.service';
import { PlanillaDetalleService } from 'src/app/services/servicios/planilla-detalle.service';
import { PlanillaService } from 'src/app/services/servicios/planilla.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { VentaService } from 'src/app/services/servicios/venta.service';
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
  selectedEmpleado;
  subtotal: number;
  subtotal2: number;
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
              private fb: FormBuilder,
              private util: UtilesService,
              private modalService: NgbModal  ) {
    this.form = this.fb.group({
      numeroPatronal:  ['', Validators.required],
      numeroPatronalips:  ['', Validators.required],
      fechaPago:  ['', Validators.required],
      mesPago:  ['', Validators.required],
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

    this.conceptosService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.conceptos = resp  );

  }


  procesarComisiones(){
    this.selectedEmpleado= this.form.controls.empleadoId.value;
    this.selectedMes= this.form.controls.mesPago.value;
    console.log(this.selectedEmpleado);

    this.empleadoService.getRecurso(this.selectedEmpleado)
    .subscribe( (resp: any[]) =>  this.empleado = resp  );

    this.reservaService.getReservasConfirmadasEmpleado(this.selectedEmpleado, this.selectedMes)
    .subscribe( (resp: any[]) => { 
      
      this.confirmados = resp; 
      console.log(resp);

      //Calculamos el TOTAL 
      this.subtotal = this.confirmados.reduce((sum, value) =>
      (typeof value.disponibleId.servicioId.costo == "number" ? sum + (value.disponibleId.servicioId.costo * (value.disponibleId.comision/100)) : sum), 0);
      console.log(this.subtotal);

      this.subtotal2 = this.conceptos.reduce((sum, value) =>
      (typeof value.valor == "number" ? sum + value.valor : sum), 0);
      console.log(this.subtotal2);


    } );

  }

  reCalcularSubtotal(){
    this.subtotal2 = this.conceptos.reduce((sum, value) =>
    (typeof value.valor == "number" ? sum + value.valor : sum), 0);
    console.log(this.subtotal2);
  }


  guardar(){
    this.form.controls.numeroPatronal.setValue('12356');
    this.form.controls.numeroPatronalips.setValue('222333');
    this.form.controls.fechaPago.setValue(this.currentDate);
    this.form.controls.mesPago.setValue( this.util.getMonth(this.selectedMes) );
    this.form.controls.total.setValue(this.obtenerTotal());
    this.form.controls.descuento.setValue(this.obtenerDescuento());
   //this.form.controls.saldo.setValue();
   // this.form.controls.total.value - this.form.controls.descuento.value;
   // this.form.controls.empleadoId.setValue(1);
    this.form.controls.usuarioId.setValue(1);

    let peticion: Observable<any>;
    console.log(this.form.value);
    peticion = this.planillaService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );

    });
  

  }

  obtenerTotal(){
    let total:number;
    total =  this.subtotal + parseInt(this.empleado.sueldo);
    return total;
  }
 
  obtenerDescuento(){
    let total:number;

  

    return total;
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