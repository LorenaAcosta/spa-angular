import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {

  form = this.fb.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    dataType: ['', Validators.required ],
    imageName: ['']
  });
  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute) {
   }

   ngOnInit() {
    const id = this.route.snapshot.params.id;
    console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        dataType: ['', Validators.required ],
        imageName: ['']
      });

      this.categoriaService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.dataType.setValue(data.dataType);
        this.form.controls.imageName.setValue(data.imageName);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
   // console.log(id);
    if (typeof id === 'undefined') {
      console.warn(this.form.value);
      peticion = this.categoriaService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron  los datos!',
          'success'
        );
      });
    } else {
      peticion = this.categoriaService.modificarRecurso(this.form.value, id);
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
