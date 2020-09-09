import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';

@Component({
  selector: 'app-empleado-edit',
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.scss']
})
export class EmpleadoEditComponent implements OnInit {

  form = this.fb.group({
    cedula: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    fechaNac: ['', Validators.required]
  });
  // categorias$: Observable<any>;
  categorias: any[] = [];
  selectedPersonId = 'Elegir';

  constructor(private fb: FormBuilder,
              private empleadoService: EmpleadoService,
              private route: ActivatedRoute) {

      this.form = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNac: ['', Validators.required]
      });
              }

  ngOnInit() {
   // this.categorias$ = this.categoriaService.listarRecurso();
     const id = this.route.snapshot.params.id;
     if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        fechaNac: ['', Validators.required]
      });
      this.empleadoService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.cedula.setValue(data.cedula);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.fechaNac.setValue(data.fechaNac);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
    //  console.warn(this.form.value);
     const id = this.route.snapshot.params.id;
     let peticion: Observable<any>;
     console.log(id);
     if (typeof id === 'undefined') {
        peticion = this.empleadoService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
            'success'
          );
        });
      } else {
        peticion = this.empleadoService.modificarRecurso(this.form.value, id);
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
