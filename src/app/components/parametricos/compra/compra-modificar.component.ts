import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import { Detalle } from './compra-edit.component';

@Component({
  selector: 'app-compra-modificar',
  templateUrl: './compra-modificar.component.html',
  styleUrls: ['./compra-modificar.component.scss']
})
export class CompraModificarComponent implements OnInit {

  columnas: string[] = ['codigo', 'precio', 'producto', 'borrar'];
  proveedores: any[] = [];
  productos: any[] = [];
  productoId: number;
  datos: Detalle[] = [];
  datosGuardar: Detalle[] = [];
  compra: any;
  resTemp: any;
  totalCompra = 0;
  proveedorId = 0;
  fechaActual: number = Date.now();
  index: 0;
  pageActual: 1;

  selectedValue: number;
  selectedProd: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private compraService: ComprasService,
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private detallesService: DetallesCompraService
  ) { }

  form = this.fb.group({
    fecha: [this.fechaActual],
    montoTotal: ['', Validators.required],
    proveedorId: [this.proveedorId, Validators.required]
  });

  currentDate: number = Date.now();
  articuloselect: Detalle = new Detalle(0, 0, 0, 0);

  @ViewChild(MatTable) tabla1: MatTable<Detalle>;

  borrarFila(cod: number) {
    if (confirm('Realmente quiere borrarlo?')) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
    console.log(this.datos);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    let currentDate = Date.now();
    this.proveedorService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.proveedores = resp  );

    this.productoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.productos = resp  );

    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        fecha: [this.fechaActual],
        montoTotal: [this.totalCompra, Validators.required],
        proveedorId: ['', Validators.required]
      });
      this.compraService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.fecha.setValue(data.fecha);
        this.form.controls.montoTotal.setValue(data.montoTotal);
        this.form.controls.proveedorId.setValue(data.proveedorId.proveedorId);
        this.datos = data.detallesCollection;
        this.datosGuardar = data.detallesCollection;
        console.log(this.datos);
       });
    }

  }

  borrarDetalle(cod: number) {
    console.log(cod);
  }
}