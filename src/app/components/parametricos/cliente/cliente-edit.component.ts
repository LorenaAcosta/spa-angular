import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ClienteService } from 'src/app/services/servicios/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {
  form = this.fb.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', Validators.required],
    cedula: ['', Validators.required],
    ruc: ['', Validators.required],
    telefono: ['', Validators.required],
    sexo: ['', Validators.required],
    ciudad: ['', Validators.required],
    nacionalidad: ['', Validators.required],
    direccion: ['', Validators.required],
    fechaNac: ['', Validators.required],
    tarjeta: ['', Validators.required]
  });

  get correo() { return this.form.get('correo'); }
  get telefono() { return this.form.get('telefono'); }
  get cedula() { return this.form.get('cedula'); }

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      cedula: ['', Validators.required],
      ruc: ['', Validators.required],
      telefono: ['', Validators.required],
      sexo: ['', Validators.required],
      ciudad: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNac: ['', Validators.required],
      tarjeta: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    // console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        ruc: ['', Validators.required],
        cedula: ['', Validators.required],
        telefono: ['', Validators.required],
        sexo: ['', Validators.required],
        ciudad: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        direccion: ['', Validators.required],
        fechaNac: ['', Validators.required],
        tarjeta: ['', Validators.required]
      });
      this.clienteService.getRecurso(id).subscribe((data: any) => {
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.username.setValue(data.username);
        this.form.controls.password.setValue(data.password);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.correo.setValue(data.correo);
        this.form.controls.cedula.setValue(data.cedula);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.sexo.setValue(data.sexo);
        this.form.controls.ruc.setValue(data.ruc);
        this.form.controls.ciudad.setValue(data.ciudad);
        this.form.controls.nacionalidad.setValue(data.nacionalidad);
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.fechaNac.setValue(data.fechaNac);
        this.form.controls.tarjeta.setValue(data.tarjeta);
      });
    }
  }
  guardar() {
    // console.warn(this.form.value);
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    if (typeof id === 'undefined') {
      peticion = this.clienteService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
      });
    } else {
      peticion = this.clienteService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
      });
    }
  }
}
