import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {
  
  empleados: any[] = [];
  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.empleados = resp );
  }

}
