import { Component, OnInit, Input } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {

  servicios: any[] = [];
  constructor(private servicioService: ServicioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    

  }

}
