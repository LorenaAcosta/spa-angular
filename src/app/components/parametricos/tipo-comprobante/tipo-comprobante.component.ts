import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoComprobanteService } from 'src/app/services/servicios/tipo-comprobante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-comprobante',
  templateUrl: './tipo-comprobante.component.html',
  styleUrls: ['./tipo-comprobante.component.scss']
})
export class TipoComprobanteComponent implements OnInit {
  pageActual: 1;
  
  public formSubmitted = false;
  constructor(private tipoComprobanteService: TipoComprobanteService, 
    private fb: FormBuilder,  private route: ActivatedRoute,) { }

  tipos: any[] = [];

  form = this.fb.group({
    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {
    this.tipoComprobanteService.listarRecurso()
    .subscribe( (resp: any[]) =>  {this.tipos = resp ;
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
      peticion = this.tipoComprobanteService.agregarRecurso(this.form.value);
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
          this.tipos.splice(pos, 1);
          this.tipoComprobanteService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
    }


}
