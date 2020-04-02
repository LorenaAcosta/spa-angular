import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MediosPagoService } from '../../../services/servicios/medios-pago.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medios-pago-edit',
  templateUrl: './medios-pago-edit.component.html',
  styleUrls: ['./medios-pago-edit.component.scss']
})
export class MediosPagoEditComponent implements OnInit {

  form = this.fmp.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required]
  });
  
  medioPago: any[] = [];


  constructor(private fmp: FormBuilder,
              private medioPagoService: MediosPagoService,
              private route: ActivatedRoute ) {

    this.form = this.fmp.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
   // console.log(id);
    if (id !== null) {
    this.medioPagoService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
       });
}
  }

  imprimir() {
    alert(this.form.value.codigo);
  }
  guardar() {
    const id = this.route.snapshot.paramMap.get('id');
    let peticion: Observable<any>;
    // console.log(id);
    if (this.form.invalid) {
        console.log('Formulario no valido');
    }

    if (id !== null) {
     peticion = this.medioPagoService.modificarRecurso(this.form.value, id);
    } else {
    peticion = this.medioPagoService.agregarRecurso(this.form.value);
    }
    peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
      });
  }

}
