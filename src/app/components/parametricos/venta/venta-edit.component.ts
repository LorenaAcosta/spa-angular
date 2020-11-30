import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { exit } from 'process';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/servicios/cliente.service';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import { DetalleVentaService } from 'src/app/services/servicios/detalles-venta.service';
import { MediosPagoService } from 'src/app/services/servicios/medios-pago.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { VentaService } from 'src/app/services/servicios/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.scss']
})
export class VentaEditComponent implements OnInit {
  columnas: string[] = ['cantidad', 'producto_servicio', 'precioVenta', 'monto', 'borrar'];
  /*
    constructor(public detalleId: number, public cantidad: number, public ventasId: number,
              public monto: number, public subtotal: number, public descuento: number, public productoId: any,
              public servicioId: any, public usuarioId: any
      )
  */
  proveedores: any[] = [];
  medios: any[] = [];
  usuarios: any[] = [];
  productos: any[] = [];
  productoId: number;
  datos: DetalleVenta[] = [];
  datosGuardar: DetalleVenta[] = [];
  datosEliminar: DetalleVenta[] = [];
  datosTemporal: DetalleVenta[] = [];
  compra: any;
  esProducto = false;
  esServicio = false;
  prefixComprobante = "001-001-";

  com: any;
  resTemp: any;
  totalVenta = 0;
  nextComprobante = 0;
  fechaActual: number = Date.now();
  index: 0;
  pageActual: 1;

  selectedValue: number;
  selectedProd: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private compraService: ComprasService,
    private ventaService: VentaService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private servicioService: ServicioService,
    private detallesService: DetalleVentaService,
    private medioService: MediosPagoService,
    private usuarioService: ClienteService) { }

    form = this.fb.group({
      fecha: [this.fechaActual],
      montoTotal: [this.totalVenta, Validators.required],
      numeroComprobante: [ this.nextComprobante, Validators.required],
      medioPagoId: ['', Validators.required],
      usuarioId: [ Validators.required],
      estado: ['Activo']
    });

    currentDate: number = Date.now();
    articuloselect: DetalleVenta = new DetalleVenta(0, 1, 0, 0, 0, 0, 0);

    @ViewChild(MatTable) tabla1: MatTable<DetalleVenta>;
    @ViewChild(MatTable) tab: MatTable<DetalleVenta>;

    cargaServicio(){
      console.log('cargaServicio funciona');
      this.esServicio = true;
      this.servicioService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.productos = resp  );
    }

    cargaProducto(){
      console.log('cargaProducto funciona');
      this.esProducto = true;
      this.esServicio = false;
      this.productoService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.productos = resp  );
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


    borrarFila(cod: number) {
      if (confirm('Realmente quiere borrarlo?')) {
        this.totalVenta = this.totalVenta - (this.datos[cod].cantidad * this.datos[cod].monto);
        this.datosEliminar.push(new DetalleVenta(this.datos[cod].detalleId, this.datos[cod].cantidad, this.datos[cod].ventasId,
          this.datos[cod].precio, this.datos[cod].monto, this.datos[cod].productoId,
           this.datos[cod].servicioId));
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
          'Debe selecionar un producto o servicio!',
          'warning'
        );
        exit();
      }
      /***/

      /* controlar que no se dupliquen productos antes de agregar fila a la tabla */
      for (let detalle of this.datos) {
        if (detalle.productoId !== null) {
            if (detalle.productoId.productoId === this.selectedProd.productoId) {
                    console.log('hay que validar');
                    console.log(this.articuloselect.productoId);
                    Swal.fire(
                      'Duplicado',
                      'Debes seleccionar otro producto o servicio!',
                      'warning'
                    );
                    exit();
            }
        } else {
          if (detalle.servicioId.servicioId === this.selectedProd.servicioId) {
            console.log('hay que validar');
            console.log(this.articuloselect.productoId);
            Swal.fire(
              'Duplicado',
              'Debes seleccionar otro producto o servicio!',
              'warning'
            );
            exit();
          }
        }
      }
      /***/

      console.log('producto seleccionado' + this.selectedProd);
      if (this.esServicio) {
        this.articuloselect.precio = this.articuloselect.productoId.costo * this.articuloselect.cantidad;
        this.articuloselect.monto = this.articuloselect.precio * this.articuloselect.cantidad;
        this.articuloselect.servicioId = this.articuloselect.productoId;
        console.log('asfsf' + this.articuloselect.monto);
        this.datosGuardar.push(new DetalleVenta(0, this.articuloselect.cantidad, this.articuloselect.ventasId,
          this.articuloselect.precio, this.articuloselect.monto, null,
          this.articuloselect.servicioId));
      } else {
        // controlar existencia del producto
        const stock = this.articuloselect.productoId.stockActual - this.articuloselect.cantidad;
        console.log(stock < this.articuloselect.productoId.stockActual);
        if (stock < 0) {
            Swal.fire(
              'Existencia insuficiente',
              'La cantidad supera el stock actual : ' + this.articuloselect.productoId.stockActual,
              'warning'
            );
            exit();
        }

        this.articuloselect.precio = this.articuloselect.productoId.precioVenta;
        this.articuloselect.monto = this.articuloselect.productoId.precioVenta * this.articuloselect.cantidad;
        this.datosGuardar.push(new DetalleVenta(0, this.articuloselect.cantidad, this.articuloselect.ventasId,
          this.articuloselect.precio, this.articuloselect.monto, this.articuloselect.productoId,
          null));
      }

      // this.articuloselect.subtotal = this.articuloselect.productoId.precioVenta * this.articuloselect.cantidad
      this.totalVenta = this.totalVenta + this.articuloselect.monto;
      console.log('this.totalVenta');
      console.log(this.articuloselect.monto);
     /* this.datosGuardar.push(new DetalleVenta(0, this.articuloselect.cantidad, this.articuloselect.ventasId, 
        this.articuloselect.precio, this.articuloselect.monto, this.articuloselect.productoId,
        this.articuloselect.servicioId));*/
      // this.articuloselect.productoId = this.selectedProd.descripcion;
      this.datos.push(new DetalleVenta(0, this.articuloselect.cantidad, this.articuloselect.ventasId, 
        this.articuloselect.precio, this.articuloselect.monto, this.articuloselect.productoId,
        this.articuloselect.servicioId));
      this.datosTemporal.push(new DetalleVenta(0, this.articuloselect.cantidad, this.articuloselect.ventasId, 
          this.articuloselect.precio, this.articuloselect.monto, this.articuloselect.productoId,
          this.articuloselect.servicioId));
      console.log(this.datos);
      console.log(this.datosGuardar);
      if (this.esServicio){
        this.tabla1.renderRows();
      } else {
        this.tabla1.renderRows();
      }
      // this.articuloselect = new DetalleVenta(0, 1, 0, 0, 0, 0, 0, 0 , 0);
      
    }

    ngOnInit(): void {
      this.esServicio = false;
      let currentDate = Date.now();
      this.proveedorService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.proveedores = resp  );

      this.medioService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.medios = resp  );

      this.ventaService.getNextId()
      .subscribe( (resp: any) =>  this.nextComprobante = resp + 1);


      this.usuarioService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.usuarios = resp  );

      this.productoService.listarRecurso()
      .subscribe( (resp: any[]) =>  this.productos = resp  );

      const id = this.route.snapshot.params.id;
      if (typeof id !== 'undefined') {
        /*this.form = this.fb.group({
          fecha: [this.fechaActual],
          montoTotal: [this.totalVenta, Validators.required],
          proveedorId: [ Validators.required]*/
          this.form = this.fb.group({
            fecha: [this.fechaActual],
            montoTotal: [this.totalVenta, Validators.required],
            numeroComprobante: ['', Validators.required],
            medioPagoId: ['', Validators.required],
            usuarioId: [ Validators.required],
            estado: ['Activo']
        });

          this.ventaService.getRecurso(id)
         .subscribe ((data: any) => {
          console.log(data); 
          this.com = data;
          this.form.controls.fecha.setValue(data.fecha);
          this.totalVenta = Number(data.montoTotal);
          this.form.controls.numeroComprobante.setValue('001-001-'+ this.ceroIzquierda(data.numeroComprobante, 7));
          this.form.controls.medioPagoId.setValue(data.medioPagoId.medioPagoId);
          this.form.controls.usuarioId.setValue(data.usuarioId.usuarioId);
          this.datos = data.ventasDetalleCollection;
          // this.datosGuardar = data.ventasDetalleCollection;
          console.log(this.datos);
         });
      }
    }

    guardar() {
      const id = this.route.snapshot.params.id;
      let peticion: Observable<any>;
      let ventasId: number;
      if (typeof id === 'undefined') {
        peticion = this.ventaService.agregarRecurso(this.form.value);
        console.warn(this.form.value);
        peticion.subscribe((result: any) =>  {
          console.log(result),
          ventasId = result.ventasId,
          Swal.fire(
            'Guardado!',
            'Se guardaron  los datos!',
            'success'
          );
  
          for (let detalle of this.datosGuardar){
            console.warn(detalle);
            detalle.ventasId = ventasId;
            this.detallesService.agregarRecurso(detalle).subscribe(( res: any) => {
              console.log(res);
            });
          }

        });
      } else {
        this.form.controls.numeroComprobante.setValue(id);
        peticion = this.ventaService.modificarRecurso(this.form.value, id);
        peticion.subscribe((result: any) =>  {
          console.log(result);
          ventasId = id,
          Swal.fire(
            'Guardado!',
            'Se actualizaron los datos!',
            'success'
          );
  
          for (let detalle of this.datosGuardar){
            detalle.ventasId = ventasId;
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

}

export class DetalleVenta {
  constructor(public detalleId: number, public cantidad: number, public ventasId: number,
              public precio: number , public monto: number, public productoId: any,
              public servicioId: any
      ) {
  }
}


