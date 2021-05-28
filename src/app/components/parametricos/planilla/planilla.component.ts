import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { PlanillaService } from 'src/app/services/servicios/planilla.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {
  
  empleados: any[] = [];
  pageActual: any;
  constructor(private planillaService: PlanillaService) { }

  ngOnInit(): void {
    this.planillaService.listarRecurso()
    .subscribe( (resp: any[]) => { this.empleados = resp; console.log(this.empleados); });
  }

  buscarTermino(){
    
  }

}
