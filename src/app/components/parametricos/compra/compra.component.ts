import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';
import { CompraEditComponent } from './compra-edit.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.scss']
})
export class CompraComponent implements OnInit {

  compras: any[] = [];
  cabecera: any;
  detalles: any[] = [];
  compra: any;
  index: 0;
  pageActual: 1;
  closeResult: string;
  lado: any;
  model: NgbDateStruct;
  fecha: any;
  montoTotal: any;
  numeroFactura: any;
  timbrado: any;
  proveedorId: any;

  constructor(
    private compraService: ComprasService,
    private detallesCompraService: DetallesCompraService,
    private route: ActivatedRoute,
    public util: UtilesService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.compraService.listarRecurso()
    .subscribe( (resp: any[]) => { this.compras = resp; console.log(this.compras); } );
    
  }

  getCategorias(id) {
    this.compraService.getRecurso(id)
    .subscribe( (resp: any[]) =>  this.compra = resp  );
  }


  getDetalles(id) {
    this.detallesCompraService.getRecurso(id)
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
          this.compras.splice(pos, 1);
          this.compraService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }


 //open modal, detalles
 openBox(content, compraId) {
    console.log(compraId);
      this.compraService.getRecurso(compraId).subscribe((result: any) => {
          this.cabecera= result;
        }); 
        this.detallesCompraService.getRecursoByCompraId(compraId).subscribe((result: any) => {
            this.detalles= result;
          }); 

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


  buscar(termino: String){
    if (termino == ''){
      this.compraService.listarRecurso()
      .subscribe( (resp: any ) =>  {
        console.log(resp);
        this.compras = resp;
      });
    }else{
      this.compraService.getBusqueda(termino)
      .subscribe( (resp: any ) =>  {
        console.log(resp);
        this.compras = resp;
      });
    }
  }

    
  buscarFecha(valor) {
    this.lado = valor;
    console.log(this.lado);

    // tslint:disable-next-line:prefer-const
    let dateString = (this.model.year + '-'  + this.model.month + '-' + this.model.day as string);
    console.log(dateString);
    
    this.compraService.listarporfecha(dateString.toString())
    .subscribe( (resp: any ) =>  {
      this.compras = resp;
      console.log(this.compras);
    }  );

   // this.getReservaReport(dateString.toString());
   // this.arrayObject = this.reservas as string[];
  }




  getDetallesDetalles(id) {
    this.detallesCompraService.getRecurso(id)
    .subscribe( (resp: any[]) => this.detalles = resp);
    console.log(this.detalles);
    //this.getFacturaReport(id);
  }


  getCabecera(id){
    /*this.ventasService.actualizarCabecera(id)
      .subscribe( (resp:any) => {console.log(resp)} );*/
    this.compraService.getRecurso(id)
    .subscribe( (resp: any) => {
      this.fecha = resp.fecha,
      this.montoTotal = resp.montoTotal,
      this.numeroFactura = resp.numeroFactura,
      this.timbrado = resp.timbrado,
      this.proveedorId = resp.proveedorId;
    });
  }

}
