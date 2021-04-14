import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.scss']
})

export class ReservaListComponent implements OnInit {
  pageActual: 1;

  constructor(private reservaService: ReservaService,
              private empleadoService: EmpleadoService,
              private fb: FormBuilder) { }
  reservas: any;
  model: NgbDateStruct;
  fecha;
  arrayObject: any[] = [];
  empleados: any[] = [];
  lado;
  selectedOption: number;
  filtroEmpleado:'';

  ngOnInit() {
    this.empleadoService.listarRecurso()
    .subscribe( (resp: any) =>  this.empleados = resp  );
  }

  // tslint:disable-next-line:member-ordering
  form = this.fb.group({
    model: ['']
  });




  cambiaLado(valor) {
    this.lado = valor;
    console.log(this.lado);

    // tslint:disable-next-line:prefer-const
    let dateString = (this.model.year + '-'  + this.model.month + '-' + this.model.day as string);
    console.log(dateString);
    this.reservaService.listarporfecha(dateString.toString())
    .subscribe( (resp: any ) =>  {
      this.reservas = resp;
      console.log(this.reservas);
    }  );

    this.getReservaReport(dateString.toString());
   // this.arrayObject = this.reservas as string[];
  }


buscar(termino: String){
  console.log(termino);
  this.reservaService.getBusqueda(termino)
  .subscribe( (resp: any ) =>  {
    console.log(resp);
    this.reservas = resp;
  });
}

getReservaReport(fecha) {
  this.reservaService.getReservaReport(fecha)
  .subscribe( (resp: any[]) =>  resp  );
}

//obtiene el pdf generado
clickEvent(){
  this.reservaService.getPDF().subscribe((response)=>{

  let file = new Blob([response], { type: 'application/pdf' });            
  var fileURL = URL.createObjectURL(file);
  window.open(fileURL, "popup","width=800,height=800");
})
}

}