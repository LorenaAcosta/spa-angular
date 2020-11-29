import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/servicios/reserva.service';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: ['./reserva-list.component.scss']
})
export class ReservaListComponent implements OnInit {

  reservas: any[] = [];
  auxiliar: any[] = [];

  i: number;

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.reservaService.listarRecursos().subscribe( (resp: any[]) => {
      this.auxiliar = resp;
      console.log(this.auxiliar);
     });

  }

  changeState( reservaId ) {
  }

  getReservasToday() {
    const date: Date = new Date();
    // tslint:disable-next-line:ban-types
    // const fechaActual: String =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    const fechaActual = '2020-11-27';
    console.log(fechaActual);
    for (this.i = 0; this.i < this.auxiliar.length; this.i++ ) {
      console.log('auxiliar[i] ' + this.auxiliar[this.i].fechaReserva);
      console.log('fecha actual ' + fechaActual);
      if (this.auxiliar[this.i].fechaReserva === fechaActual ) {
        this.reservas.push(this.auxiliar[this.i]);
      }
    }
    console.log(this.reservas);
  }

  getReservasPrev() {
    this.reservas = [];
    let datex = new Date();
    datex = new Date(datex.getTime() - (1000 * 60 * 60 * 24));
    console.log(datex);
    const fechaActual =  datex.getFullYear() + '-' + datex.getMonth() + '-' + datex.getDate();
    for (this.i = 0; this.i < this.auxiliar.length; this.i++ ) {
      console.log('auxiliar[i] ' + this.auxiliar[this.i].fechaReserva);
      console.log('fecha actual ' + fechaActual);
      if (this.auxiliar[this.i].fechaReserva === fechaActual ) {
        this.reservas.push(this.auxiliar[this.i]);
      }
    }
  }

  getReservasNext() {
    this.reservas = [];
    let date: Date = new Date();
    date = new Date(date.getTime() + (1000 * 60 * 60 * 24));
    console.log(date);
    const fechaActual =  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    for (this.i = 0; this.i < this.auxiliar.length; this.i++ ) {
      console.log('auxiliar[i] ' + this.auxiliar[this.i].fechaReserva);
      console.log('fecha actual ' + fechaActual);
      if (this.auxiliar[this.i].fechaReserva === fechaActual ) {
        this.reservas.push(this.auxiliar[this.i]);
      }
    }
  }
}
