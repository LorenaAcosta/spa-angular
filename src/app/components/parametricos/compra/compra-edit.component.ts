import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';

@Component({
  selector: 'app-compra-edit',
  templateUrl: './compra-edit.component.html',
  styleUrls: ['./compra-edit.component.scss']
})
export class CompraEditComponent implements OnInit {

  columnas: string[] = ['codigo', 'precio', 'producto', 'borrar'];
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



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private compraService: ComprasService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private detallesService: DetallesCompraService
  ) { }

  form = this.fb.group({
    fecha: [this.fechaActual],
    montoTotal: [this.totalCompra, Validators.required],
    proveedorId: [ Validators.required]
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
    console.log('producto seleccionado' + this.selectedProd);
    this.totalCompra = this.totalCompra + (this.articuloselect.cantidad * this.articuloselect.precioCompra);
    this.datosGuardar.push(new Detalle(0, this.articuloselect.cantidad, this.articuloselect.comprasId, this.articuloselect.precioCompra,
      this.articuloselect.productoId));
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
    .subscribe( (resp: any[]) =>  this.proveedores = resp  );

    this.productoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.productos = resp  );

    const id = this.route.snapshot.params.id;
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        fecha: [this.fechaActual],
        montoTotal: [this.totalCompra, Validators.required],
        proveedorId: [ Validators.required]
      });
      this.compraService.getRecurso(id)
       .subscribe ((data: any) => {
         this.com = data;
         this.form.controls.fecha.setValue(data.fecha);
        //this.form.controls.montoTotal.setValue(data.montoTotal);
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
        compraId = result.comprasId,
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



}



export class Detalle {
  constructor(public detalleId: number, public cantidad: number, public comprasId: number,
              public precioCompra: number, public productoId: any
      ) {
  }
}