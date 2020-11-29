import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServicioService } from '../../../services/servicios/servicio.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-edit',
  templateUrl: './servicio-edit.component.html',
  styleUrls: ['./servicio-edit.component.scss']
})
export class ServicioEditComponent implements OnInit {

  categorias: any[] = [];

  form = this.fb.group({
    nombre: ['', Validators.required],
    estado: ['', Validators.required],
    descripcion: ['', Validators.required],
    categoriaId: ['', Validators.required],
    costo: ['', Validators.required],
    duracion: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private servicioService: ServicioService,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.categorias$ = this.categoriaService.listarRecurso();
     this.categoriaService.obtenerPorTipo('servicio').
     subscribe( (resp: any[]) =>  this.categorias = resp );
     const id = this.route.snapshot.params.id;
     if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        estado: ['', Validators.required],
        descripcion: ['', Validators.required],
        categoriaId: ['', Validators.required],
        costo: ['', Validators.required],
        duracion: ['', Validators.required]
      });
      this.servicioService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.estado.setValue(data.estado);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.categoriaId.setValue(data.categoriaId.categoriaId);
        this.form.controls.costo.setValue(data.costo);
        this.form.controls.duracion.setValue(data.duracion);
       });
    }
  }
  guardar() {
    console.warn(this.form.value);
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    if (typeof id === 'undefined') {
        peticion = this.servicioService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
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
      }
    }
}
