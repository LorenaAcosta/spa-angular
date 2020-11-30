import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/servicios/reserva.service';


@Component({
  selector: 'app-reserv-edit',
  templateUrl: './reserv-edit.component.html',
  styleUrls: ['./reserv-edit.component.scss']
})
export class ReservEditComponent implements OnInit {

  constructor(private reservaService: ReservaService) { }

  ngOnInit() {
  }

}
