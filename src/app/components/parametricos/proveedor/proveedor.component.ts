import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {
  proveedores: any[] = [];
  index: 0;
  pageActual: 1;

  constructor(private proveedorService: ProveedorService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.proveedorService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.proveedores = resp  );
  }

}
