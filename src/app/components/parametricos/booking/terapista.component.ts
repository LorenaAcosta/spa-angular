import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';


@Component({
  selector: 'app-terapista',
  templateUrl: './terapista.component.html',
  styleUrls: ['./terapista.component.scss']
})
export class TerapistaComponent implements OnInit {

  disponible: any[] = [];

  servicioId: number;

  constructor(
    private disponibleService: DisponibleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*Mostrar los empleados disponibles de ese servicio */
    this.servicioId = this.route.snapshot.params.id;
    this.disponibleService.listarByEmpleado(this.servicioId)
      .subscribe((resp: any[]) => this.disponible = resp);
  }


}
