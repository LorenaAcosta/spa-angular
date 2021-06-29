import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { VentaService } from 'src/app/services/servicios/venta.service';
import Swal from 'sweetalert2';
import { ArqueoCajaService } from '../../../services/servicios/arqueo-caja.service';

@Component({
  selector: 'app-arqueo-caja',
  templateUrl: './arqueo-caja.component.html',
  styleUrls: ['./arqueo-caja.component.scss']
})
export class ArqueoCajaComponent implements OnInit {
  arqueoActivo: any = null;
  total = 0;
  clases = 'form-control text-danger';
  saldoArqueo = 0;
  totalCaja = 0;
  currentDate =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  hora = this.util.cortarString(new Date().toString().split(' ')[4], 0,5);
  closeResult: string;

  form = this.fb.group({
    fechaApertura: new FormControl({value: '', disabled: true}),
    horaApertura: new FormControl({value: '', disabled: true}),
    fechaCierre: [''],
    horaCierre: [''],
    totalVentas: [''],
    totalCaja: [''],
    saldoCierre: [],
    puntoExpedicionId: [''],
    estado: ['']
  });

  formCierre = this.fb.group({
    fechaApertura: new FormControl({value: '', disabled: true}),
    horaApertura: new FormControl({value: '', disabled: true}),
    fechaCierre: [''],
    horaCierre: [''],
    totalVentas: [''],
    totalCaja: [''],
    saldoCierre: [],
    puntoExpedicionId: [''],
    estado: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private modalService:  NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    public datepipe: DatePipe,
    public util: UtilesService,
    private ventaService: VentaService,
    private arqueoService: ArqueoCajaService
    ) { 
      this.form = this.fb.group({
        fechaApertura: [this.currentDate],
        horaApertura: [this.hora],
        fechaCierre: [],
        horaCierre: [],
        totalVentas: [0],
        totalCaja: [0],
        saldoCierre: [0],
        puntoExpedicionId: [1],
        estado: ['ABIERTO']
      });

      this.formCierre = this.fb.group({
        fechaApertura: [],
        horaApertura: [],
        fechaCierre: [this.currentDate],
        horaCierre: [this.hora],
        totalVentas: [this.total],
        totalCaja: [0],
        saldoCierre: [0],
        puntoExpedicionId: [],
        estado: ['CERRADO']
      });
    }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    var punto: number = +id;
    this.form.controls.puntoExpedicionId.setValue(punto);
    this.arqueoService.getCajaActiva(id).subscribe( (resp: any[]) => {
      if (resp){
        this.arqueoActivo = resp;
        this.formCierre.controls.fechaApertura.setValue(this.arqueoActivo.fechaApertura);
        this.formCierre.controls.horaApertura.setValue(this.arqueoActivo.horaApertura);
        this.formCierre.controls.puntoExpedicionId.setValue(this.arqueoActivo.puntoExpedicionId);
      }
      this.spinnerService.hide();
    });
  }

  open(content) {
    if (this.arqueoActivo != null){
      this.ventaService.getTotalArqueo(this.arqueoActivo.arqueoId).subscribe( (resp: any) => {
        this.total = resp;
        this.formCierre.controls.totalVentas.setValue(this.total);
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  btnClick(puntoId: any) {
    this.router.navigate(['ventas/listar/', puntoId]);
    this.spinnerService.show();
  }

  guardar() {
    console.log(this.form.value);
    let peticion: Observable<any>;
    this.form.controls.horaApertura.setValue( this.hora);
    peticion = this.arqueoService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      this.form.reset(this.form.controls.fechaApertura );
      this.form.reset(this.form.controls.horaApertura );
      this.ngOnInit()
    });
    
    this.modalService.dismissAll();
  }

  guardarCierre() {
    this.formCierre.controls.horaApertura.setValue(this.util.cortarString(this.arqueoActivo.horaApertura, 0,5));
    this.formCierre.controls.fechaApertura.setValue(this.arqueoActivo.fechaApertura);
    this.formCierre.controls.saldoCierre.setValue(this.totalCaja - this.total);

    console.log(this.formCierre.value);
    let peticion: Observable<any>;
    peticion = this.arqueoService.modificarRecurso(this.formCierre.value, this.arqueoActivo.arqueoId);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      this.arqueoActivo = null;
      this.form.reset(this.formCierre.controls.fechaApertura );
      this.form.reset(this.formCierre.controls.horaApertura );
      this.form.reset(this.formCierre.controls.fechaCierre );
      this.form.reset(this.formCierre.controls.horaCierre );
      this.form.reset(this.formCierre.controls.puntoExpedicionId );
      this.form.reset(this.formCierre.controls.estado );
      this.form.reset(this.formCierre.controls.totalVentas );
      this.form.reset(this.formCierre.controls.totalCaja );
      this.form.reset(this.formCierre.controls.saldoCierre );
    });
    
    this.modalService.dismissAll();
  }

  saldo(){
    this.saldoArqueo = this.formCierre.get('totalVenta').value - this.formCierre.get('totalCaja').value;
    this.formCierre.controls.saldoCierre.setValue(this.formCierre.get('totalVenta').value - this.formCierre.get('totalCaja').value);
  }

  getClases(){
    if ((this.totalCaja - this.total) < 0){
      this.clases="form-control text-danger"
      return this.clases
    }else {
      this.clases="form-control text-success"
      return this.clases
    }
  }

}
