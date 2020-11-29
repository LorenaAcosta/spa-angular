import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { DetalleVentaService } from 'src/app/services/servicios/detalles-venta.service';
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

  constructor(
    private ventasService: VentaService,
    private detallesVentaService: DetalleVentaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ventasService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.ventas = resp  );

    this.ventasService.getRecurso(1).
    subscribe( (resp: any) =>  this.comprobanteAux = resp  );
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
    this.ventasService.getRecurso(id).
    subscribe( (resp: any) =>  this.comprobanteAux = resp  );
    console.log(this.comprobanteAux.numeroComprobante);
  }

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

}
