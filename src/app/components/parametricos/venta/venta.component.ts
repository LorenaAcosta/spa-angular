import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ComprobanteService } from 'src/app/services/servicios/comprobante.service';
import { DetalleVentaService } from 'src/app/services/servicios/detalles-venta.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { VentaService } from 'src/app/services/servicios/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  
  detalles: any[] = [];
  venta: any;
  ventas: any[] = [];
  index: 0;
  pageActual: 1;
  comprobanteAux: any;
  nroComprobante: number;
  totalGeneral: number;
  subTotalDiez: number;
  subTotalTotal: number;
  subTotalCinco: number;
  subTotalExenta: number;
  ivaDiez: number;
  ivaCinco: number;
  ivaTotal: number;
  montoLetras: any;
  inicioVigencia : any = null;
  finVigencia : any = null;
  timbrado: any = null;
  comprobanteActual:any = null;
  nombrePdf = null;

  constructor(
    private ventasService: VentaService,
    private detallesVentaService: DetalleVentaService,
    private comprobanteService: ComprobanteService,
    private route: ActivatedRoute,
    private util: UtilesService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    console.log(id);

    localStorage.setItem('punto', id);
    /*this.ventasService.listarRecurso()
    .subscribe( (resp: any[]) =>  {this.ventas = resp, console.log(this.ventas) } );*/
    
    if (typeof id !== 'undefined') {
      this.ventasService.listarRecursoPorPuntoExpedicion(id)
      .subscribe( (resp: any[]) =>  {this.ventas = resp, console.log(this.ventas) } );
    }else{
      this.ventasService.listarRecurso()
      .subscribe( (resp: any[]) =>  {this.ventas = resp, console.log(this.ventas) } );
    }

    this.comprobanteService.getComprobanteActivoPorPuntoExpedicion(id)
      .subscribe( (resp: any) => {
        this.comprobanteActual = resp,
        this.inicioVigencia = resp.inicioVigencia;
        this.finVigencia = resp.finVigencia;
        this.timbrado = resp.timbrado
      });

    this.getNumeroComprobante(1);
    /*this.ventasService.getRecurso(id)
    .subscribe( (resp: any) =>  this.comprobanteAux = resp  );*/
  }

  exportarPdf() {
    const doc = new jsPDF();

    doc.html(document.getElementById('a'), );
    doc.text('Paranyan loves jsPDF', 35, 25, );
    doc.addImage('./assets/img/back.jpg', 'JPEG', 15, 40, 180, 160)
    doc.save('Factura');
    
  }

  exportarPdf2() {
    //return xepOnline; 
  }

  getNumeroComprobante(id){
    /*this.ventasService.actualizarCabecera(id)
      .subscribe( (resp:any) => {console.log(resp)} );*/
    this.ventasService.getRecurso(id)
    .subscribe( (resp: any) => {
      this.comprobanteAux = resp.comprobanteCompleto,
      this.totalGeneral = this.util.numberWithCommas(resp.montoTotal),
      this.subTotalDiez = this.util.numberWithCommas(resp.subTotalDiez),
      this.subTotalCinco = this.util.numberWithCommas(resp.subTotalCinco),
      this.subTotalExenta = this.util.numberWithCommas(resp.subTotalExenta),
      this.subTotalTotal = this.util.numberWithCommas(resp.subTotalTotal),
      this.ivaDiez = this.util.numberWithCommas(resp.ivaDiez),
      this.ivaCinco = this.util.numberWithCommas(resp.ivaCinco),
      this.ivaTotal = this.util.numberWithCommas(resp.ivaTotal),
      this.montoLetras = this.util.numberWithCommas(resp.montoTotalLetras)
    });
    console.log(this.comprobanteAux);
  }

  /*getVentaById(id) {
    this.ventasService.getRecurso(id)
    .subscribe( (resp: any[]) =>  this.venta = resp  );
  }*/

  getCategorias(id) {
    this.ventasService.getRecurso(id)
    .subscribe( (resp: any[]) =>  this.venta = resp  );
  }
  getDetalles(id) {
    this.detallesVentaService.getRecurso(id)
    .subscribe( (resp: any[]) => this.detalles = resp);
    console.log(this.detalles);
  }

  borrar( id: any, pos: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esta operación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          this.ventas.splice(pos, 1);
          this.ventasService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

  ceroIzquierda(numero, ancho) {
    const numberOutput = Math.abs(numero); /* Valor absoluto del número */
    const length = numero.toString().length; /* Largo del número */ 
    const zero = '0'; /* String de cero */
    if (ancho <= length) {
        if (numero < 0) {
             return ('-' + numberOutput.toString());
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (numero < 0) {
            return ("-" + (zero.repeat(ancho - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(ancho - length)) + numberOutput.toString()); 
        }
    }
  }

  getFacturaReport(id) {
    this.ventasService.getFacturaReport(id)
    .subscribe( (resp: any[]) =>  resp  );
  }

  clickEvent(){
    this.ventasService.getPDF().subscribe((response)=>{
  
    let file = new Blob([response], { type: 'application/pdf' });            
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL, "popup","width=600,height=600");
  })
  }

}
