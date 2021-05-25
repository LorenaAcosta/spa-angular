import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { exit } from 'process';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import { MediosPagoService } from 'src/app/services/servicios/medios-pago.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilesService } from 'src/app/services/servicios/utiles.service';

@Component({
  selector: 'app-compra-edit',
  templateUrl: './compra-edit.component.html',
  styleUrls: ['./compra-edit.component.scss']
})
export class CompraEditComponent implements OnInit {

  columnas: string[] = ['cantidad', 'precio', 'producto', 'borrar'];
  proveedores: any[] = [];
  productos: any[] = [];
  productoId: number;
  datos: Detalle[] = [];
  datosGuardar: Detalle[] = [];
  datosEliminar: Detalle[] = [];
  datosTemporal: Detalle[] = [];
  compra: any;
  com: any;
  resTemp: any;
  totalCompra = 0;
  fechaActual: number = Date.now();
  index: 0;
  pageActual: 1;

  selectedValue: number;
  selectedProd: any;
  esProducto: false;
  closeResult: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public util: UtilesService,
    private fmp: FormBuilder,
    private modalService: NgbModal,
    private compraService: ComprasService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private detallesService: DetallesCompraService
  ) { }

  form = this.fb.group({
    fecha: [this.fechaActual],
    numeroFactura: ['', Validators.required],
    timbrado: ['', Validators.required],
    montoTotal: [this.totalCompra, Validators.required],
    proveedorId: ['', Validators.required]
  });

  proveedorForm = this.fb.group({
    razonSocial: ['', Validators.required],
    empresa: ['', Validators.required],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    ruc: ['', Validators.required]
  });

  formMedio = this.fmp.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required]
  });


  currentDate: number = Date.now();
  articuloselect: Detalle = new Detalle(0, 0, 0, 0, 0);

  @ViewChild(MatTable) tabla1: MatTable<Detalle>;

  borrarFila(cod: number) {
    if (confirm('Realmente quiere borrarlo?')) {
      this.totalCompra = this.totalCompra - (this.datos[cod].cantidad * this.datos[cod].precioCompra);
      this.datosEliminar.push(new Detalle(this.datos[cod].detalleId, this.datos[cod].cantidad, this.datos[cod].comprasId,
         this.datos[cod].precioCompra, this.datos[cod].productoId));
      console.log(this.datosEliminar);
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
    console.log(this.datos);
  }
 
  agregar() {
     /* controlar que se seleccione el producto para agregar fila a la tabla */
    if (this.selectedProd === 0 ||  this.selectedProd === '--' || this.selectedProd === undefined) {
      console.log('hay que validar');
      console.log(this.articuloselect.productoId);
      Swal.fire(
        '',
        'Debe selecionar un producto!',
        'warning'
      );
      exit();
    }

     /* controlar que se seleccione el producto para agregar fila a la tabla */
     if (this.articuloselect.cantidad <= 0 ||  this.articuloselect.precioCompra <= 0) {
      console.log('hay que validar');
      Swal.fire(
        '',
        'Debe introducir un monto!',
        'warning'
      );
      exit();
    }

     /* controlar que no se dupliquen productos antes de agregar fila a la tabla */
     for (let detalle of this.datos) {
      console.log('articulo seleccionado');
      console.log(detalle);
          if (detalle.productoId.productoId === this.selectedProd.productoId) {
                  console.log('hay que validar producto');
                  console.log(this.articuloselect.productoId);
                  Swal.fire(
                    'Duplicado',
                    'Debes seleccionar otro producto!',
                    'warning'
                  );
                  exit();
          }
    }

    console.log('producto seleccionado' + this.selectedProd);
    this.totalCompra = this.totalCompra + (this.articuloselect.cantidad * this.articuloselect.precioCompra);
    this.datosGuardar.push(new Detalle(0, this.articuloselect.cantidad, this.articuloselect.comprasId
                           ,this.articuloselect.precioCompra,this.articuloselect.productoId));
    // this.articuloselect.productoId = this.selectedProd.descripcion;
    this.datos.push(new Detalle(0, this.articuloselect.cantidad, this.articuloselect.comprasId, this.articuloselect.precioCompra,
      this.articuloselect.productoId));
    console.log(this.datos);
    console.log(this.datosGuardar);
    this.tabla1.renderRows();
    this.articuloselect = new Detalle(0, 0, 0, 0, 0);
  }


  ngOnInit(): void {
    let currentDate = Date.now();
    this.proveedorService.listarRecurso()
    .subscribe( (resp: any[]) =>  {
      this.proveedores = resp 
      console.log(this.proveedores);
    } );

    this.productoService.listarRecursosActivos()
    .subscribe( (resp: any[]) =>  this.productos = resp  );

    const id = this.route.snapshot.params.id;
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        fecha: [this.fechaActual],
        numeroFactura: ['',Validators.required],
        timbrado: ['',Validators.required],
        montoTotal: [this.totalCompra, Validators.required],
        proveedorId: [ '', Validators.required]
      });
      this.compraService.getRecurso(id)
       .subscribe ((data: any) => {
         this.com = data;
         this.form.controls.fecha.setValue(data.fecha);
        // this.form.controls.montoTotal.setValue(data.montoTotal);
         this.totalCompra = Number(data.montoTotal);
         this.form.controls.proveedorId.setValue(data.proveedorId.proveedorId);
         this.datos = data.detallesCollection;
         console.log(this.datos);
       });
    }
  }

  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    let compraId: number;
    if (typeof id === 'undefined') {
      peticion = this.compraService.agregarRecurso(this.form.value);
      console.warn(this.form.value);
      peticion.subscribe((result: any) =>  {
        console.log(result),
        compraId = result.compras.comprasId,
        console.log(compraId);
        Swal.fire(
          'Guardado!',
          'Se guardaron  los datos!',
          'success'
        );

        for (let detalle of this.datosGuardar){
          detalle.comprasId = compraId;
          this.detallesService.agregarRecurso(detalle).subscribe(( res: any) => {
            console.log(res);
          });
        }

      });
    } else {

      peticion = this.compraService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) =>  {
        console.log(result);
        compraId = id,
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );

        for (let detalle of this.datosGuardar){
          detalle.comprasId = compraId;
          this.detallesService.agregarRecurso(detalle).subscribe(( res: any) => {
            console.log(res);
          });
        }

        for (let detalle of this.datosEliminar){
          this.borrarDetalle(detalle.detalleId);
        }

      });
    }
  }

  borrarDetalle(cod: number) {
    console.log(cod);
    this.detallesService.eliminarRecurso(cod).subscribe(( res: any) => {
      console.log(res);
    });
  }


  //open modal PROveedor
  openFormProveedor(content) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.proveedorForm.value);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }   


  guardarProveedor(){
    console.log(this.proveedorForm.value);
    let peticion: Observable<any>;
    peticion = this.proveedorService.agregarRecurso(this.proveedorForm.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
    });
    this.proveedorForm.reset(this.proveedorForm.controls.empresa );
    this.modalService.dismissAll();
    this.proveedorService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.proveedores = resp  );
    
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




}



export class Detalle {
  constructor(public detalleId: number, public cantidad: number, public comprasId: number,
              public precioCompra: number, public productoId: any
      ) {
  }
}

