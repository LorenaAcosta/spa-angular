import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicio-listar',
  templateUrl: './servicio-listar.component.html',
  styleUrls: ['./servicio-listar.component.scss']
})
export class ServicioListarComponent implements OnInit {

  servicios: any[] = [];
  index = 0;
  constructor(private servicioService: ServicioService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.servicioService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.servicios = resp );
  }

  borrar(id: any, pos: any) {
  }

}
