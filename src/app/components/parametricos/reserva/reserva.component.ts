import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/servicios/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
  }

}
