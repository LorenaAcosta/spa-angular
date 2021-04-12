import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediosPagoService } from 'src/app/services/servicios/medios-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medios-pago',
  templateUrl: './medios-pago.component.html',
  styleUrls: ['./medios-pago.component.scss']
})
export class MediosPagoComponent implements OnInit {
  public formSubmitted = false;
  constructor(private mediosPagoService: MediosPagoService, 
              private fb: FormBuilder,  private route: ActivatedRoute,) { }

  medios: any[] = [];
  get valor() { return this.form.get('valor'); }

  form = this.fb.group({
    descripcion: ['', Validators.required],
    codigo: ['', Validators.required]
  });

  ngOnInit(): void {
    this.mediosPagoService.listarRecurso()
    .subscribe( (resp: any[]) =>  {this.medios = resp ;
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
      peticion = this.mediosPagoService.agregarRecurso(this.form.value);
      console.log(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
      });
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
          this.medios.splice(pos, 1);
          this.mediosPagoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
    }
}
