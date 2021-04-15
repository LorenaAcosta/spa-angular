import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  templateUrl: './disponible-listar.component.html',
  styleUrls: ['./disponible-listar.component.scss']
})
export class ListarComponent implements OnInit {

  disponible: any[] = [];
  index = 0;
  pageActual: 1;
  closeResult = '';

  constructor(private fb: FormBuilder,
              private disponibleService: DisponibleService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  

}
