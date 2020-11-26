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
  public formSubmitted = false;

  form = this.fb.group({
    nombreProveedor: ['', Validators.required],
    telefono: ['', Validators.required],
    empresa: ['', Validators.required],
    direccion: ['', Validators.required],
    ruc: ['', Validators.required],
    correo: ['', 
    Validators.compose([
      Validators.required,
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])
    ]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService
    ) { }

  ngOnInit(): void {
    // this.categoriaService.obtenerPorTipo('producto').subscribe( (resp: any[]) =>  this.categorias = resp );
    const id = this.route.snapshot.params.id;
   // console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        nombreProveedor: ['', Validators.required],
        telefono: ['', Validators.required],
        empresa: ['', Validators.required],
        direccion: ['', Validators.required],
        ruc: ['', Validators.required],
        correo: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])
        ]
      });
      this.proveedorService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.nombreProveedor.setValue(data.nombreProveedor);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.empresa.setValue(data.empresa);
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.ruc.setValue(data.ruc);
        this.form.controls.correo.setValue(data.correo);
       });
    }
  }

  guardar() {
    this.formSubmitted = true;
    if ( this.form.invalid ) {
      return;
    }
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    console.log(id);
    console.log(typeof id);
    if (typeof id === 'undefined') {
      peticion = this.proveedorService.agregarRecurso(this.form.value);
      console.log(this.form.value);
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

  campoNoValido( campo: string ): boolean {
    if (this.form.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


}
