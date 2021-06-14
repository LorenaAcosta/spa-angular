import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    email: ['', Validators.required],
    cedula: ['', Validators.required],
    ruc: ['' ],
    telefono: ['', Validators.required],
    sexo: ['', Validators.required],
    ciudad: ['', Validators.required],
    nacionalidad: [''],
    direccion: ['', Validators.required],
    fechaNac: ['', Validators.required],
    tarjeta: ['', ],
    estado: [1],
    enabled: true
  });

  get email() { return this.form.get('email'); }
  get telefono() { return this.form.get('telefono'); }
  get cedula() { return this.form.get('cedula'); }
  get tarjeta() { return this.form.get('tarjeta'); }

  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,) {

    this.form = this.fb.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    cedula: ['', Validators.required],
    direccion: ['', Validators.required],
    ciudad: ['', Validators.required],
    nacionalidad: [''],
    ruc: [''],
    telefono: ['', Validators.required],
    tarjeta: [''],
    sexo: ['', Validators.required],
    fechaNac: ['', Validators.required],
    estado: [1],
    enabled: true
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
        email: ['', Validators.required],
        cedula: ['', Validators.required],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        ruc: ['', Validators.required],
        telefono: ['', Validators.required],
        tarjeta: ['', Validators.required],
        sexo: ['', Validators.required],
        fechaNac: ['', Validators.required],
        estado: ['']
      });
      this.clienteService.getRecurso(id).subscribe((data: any) => {
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.username.setValue(data.username);
        this.form.controls.password.setValue(data.password);
        this.form.controls.apellido.setValue(data.apellido);
        this.form.controls.email.setValue(data.email);
        this.form.controls.cedula.setValue(data.cedula.toString());
        this.form.controls.direccion.setValue(data.direccion);
        this.form.controls.ciudad.setValue(data.ciudad);
        this.form.controls.nacionalidad.setValue(data.nacionalidad);
        this.form.controls.telefono.setValue(data.telefono);
        this.form.controls.ruc.setValue(data.ruc);
        this.form.controls.sexo.setValue(data.sexo);
        this.form.controls.tarjeta.setValue(data.tarjeta);
        this.form.controls.fechaNac.setValue(data.fechaNac);
        this.form.controls.estado.setValue(1);
      });
    }
  }
  guardar() {
    // console.warn(this.form.value);
    const id = this.route.snapshot.params.id;

    
    this.form.controls.username.setValue(this.form.controls.username.value.toLowerCase());
   
    let peticion: Observable<any>;
    if (typeof id === 'undefined') {
      console.log('usuario', this.form.value);
      peticion = this.clienteService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
        this.router.navigate(['/cliente/listar']);
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error, 'error');
      });
    } else {
      peticion = this.clienteService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
        this.router.navigate(['/cliente/listar']);
      });
    }
  }
}
