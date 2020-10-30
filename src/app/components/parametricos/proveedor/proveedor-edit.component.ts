import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProveedorService } from 'src/app/services/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.scss']
})
export class ProveedorEditComponent implements OnInit {
  form = this.fb.group({
    nombre_proveedor: ['', Validators.required],
    telefono: ['', Validators.required],
    empresa: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService
    ) { }

  ngOnInit(): void {
  }

  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    console.log(id);
    console.log(typeof id);
    if (typeof id === 'undefined') {
      peticion = this.proveedorService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
      });
    } else {
      peticion = this.proveedorService.modificarRecurso(this.form.value, id);
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
