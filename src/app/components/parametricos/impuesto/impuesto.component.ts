import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ImpuestoService } from 'src/app/services/servicios/impuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.scss']
})
export class ImpuestoComponent implements OnInit {
  pageActual: 1;
  public formSubmitted = false;
  constructor(private impuestoService: ImpuestoService, 
              private fb: FormBuilder,  private route: ActivatedRoute,) { }

  impuestos: any[] = [];
  get valor() { return this.form.get('valor'); }

  form = this.fb.group({
    descripcion: ['', Validators.required],
    valor: ['', Validators.required]
  });

  ngOnInit(): void {
    this.impuestoService.listarRecurso()
    .subscribe( (resp: any[]) =>  {this.impuestos = resp ;
      console.log(resp);} );
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
      peticion = this.impuestoService.agregarRecurso(this.form.value);
      console.log(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
      });
      this.form.reset(this.form.controls.descripcion);
    }
    this.ngOnInit();
  }


  borrar( id: any, pos: any) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podrás revertir esta operación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.value) {
          this.impuestos.splice(pos, 1);
          this.impuestoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
    }
}