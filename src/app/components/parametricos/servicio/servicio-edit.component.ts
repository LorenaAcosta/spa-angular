import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../../services/servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaModel } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-edit',
  templateUrl: './servicio-edit.component.html',
  styleUrls: ['./servicio-edit.component.scss']
})
export class ServicioEditComponent implements OnInit {

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    fechaVigenciaIni: ['', Validators.required],
    fechaVigenciaFin: ['', Validators.required],
    estado: ['', Validators.required],
    categoriaId: ['', Validators.required],
    duracion: ['', Validators.required],
    costo: ['', Validators.required],
    porcComision: ['', Validators.required]
  });
  productos: any[] = [];
  categorias: any[] = [];

  constructor(private fb: FormBuilder,
              private servicioService: ServicioService,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute) {
                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                  descripcion: ['', Validators.required],
                  fechaVigenciaIni: ['', Validators.required],
                  fechaVigenciaFin: ['', Validators.required],
                  estado: ['', Validators.required],
                  categoriaId: ['', Validators.required],
                  duracion: ['', Validators.required],
                  costo: ['', Validators.required],
                  porcComision: ['', Validators.required]
                });
              }

  ngOnInit() {
    this.categoriaService.listarRecurso().subscribe( (resp: any[]) =>  this.categorias = resp );
  }
  guardar() {
      console.log(this.form.value);
     /* const id = this.route.snapshot.params.id;
      let peticion: Observable<any>;
      console.log(id);
      console.log(typeof id);
      if (typeof id === 'undefined') {
        peticion = this.servicioService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se actualizaron los datos!',
            'success'
          );
        });
      } else {
        peticion = this.servicioService.modificarRecurso(this.form.value, id);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se actualizaron los datos!',
            'success'
          );
        });
      } */
    }

}
