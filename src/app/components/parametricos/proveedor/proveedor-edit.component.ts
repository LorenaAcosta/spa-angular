import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    razonSocial: ['', Validators.required],
    empresa: ['', Validators.required],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    ruc: ['', Validators.required],
    telefono: ['', Validators.required],
    celular: ['', Validators.required],
    correo: ['',  Validators.required ],
    nombreGerente: ['', Validators.required],
    nombreProveedor: ['', Validators.required],
    cargo: ['', Validators.required],
    telefonoContacto: ['', Validators.required],
    estado: ['', Validators.required],
  });

  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
  get celular() { return this.form.get('celular'); }
  get telefonoContacto() { return this.form.get('telefonoContacto'); }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService
    ) { }

  ngOnInit(): void {
    // this.categoriaService.obtenerPorTipo('producto').subscribe( (resp: any[]) =>  this.categorias = resp );
    const id = this.route.snapshot.params.id;
   // console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        razonSocial: ['', Validators.required],
        empresa: ['', Validators.required],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        ruc: ['', Validators.required],
        telefono: ['', Validators.required],
        celular: ['', Validators.required],
        correo: ['',  Validators.required ],
        nombreGerente: ['', Validators.required],
        nombreProveedor: ['', Validators.required],
        cargo: ['', Validators.required],
        telefonoContacto: ['', Validators.required],
        estado: ['', Validators.required],
      });
      this.proveedorService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.razonSocial.setValue(data.razonSocial);
        this.form.controls.empresa.setValue(data.empresa);
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.ciudad.setValue(data.ciudad);
        this.form.controls.ruc.setValue(data.ruc);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.celular.setValue(data.celular);
        this.form.controls.correo.setValue(data.correo);
        this.form.controls.nombreGerente.setValue(data.nombreGerente);
        this.form.controls.nombreProveedor.setValue(data.nombreProveedor);
        this.form.controls.cargo.setValue(data.cargo);
        this.form.controls.telefonoContacto.setValue(data.telefonoContacto);
        this.form.controls.estado.setValue(data.estado);
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
          'Se agregaron los datos!',
          'success'
        );
        this.router.navigate(['/proveedor/listar']);
      });
    } else {
      peticion = this.proveedorService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
        this.router.navigate(['/proveedor/listar']);
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
