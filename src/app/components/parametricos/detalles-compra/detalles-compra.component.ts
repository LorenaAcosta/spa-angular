import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from 'src/app/services/servicios/compras.service';
import { DetallesCompraService } from 'src/app/services/servicios/detalles-compra.service';

@Component({
  selector: 'app-detalles-compra',
  templateUrl: './detalles-compra.component.html',
  styleUrls: ['./detalles-compra.component.scss']
})
export class DetallesCompraComponent implements OnInit {
  detalles: any[] = [];
  index: 0;
  pageActual: 1;
  constructor(
    private detalleService: DetallesCompraService,
    private route: ActivatedRoute,
    private compraService: ComprasService
    ) {  }

  ngOnInit(): void {
    this.detalleService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.detalles = resp  );
    console.log(this.detalles);
  }
}
