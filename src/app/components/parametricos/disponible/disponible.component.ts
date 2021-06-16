import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DisponibleService } from 'src/app/services/servicios/disponibilidad.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.component.html',
  styleUrls: ['./disponible.component.scss']
})

export class DisponibleComponent implements OnInit {

  servicios: any[] = [];
  listaServicios: any[] = [];
  disponibles: any[] = [];
  empleadoNombre: String;
  empleadoId;
  closeResult = '';
  pageActual: 1;
  input=0;
  

  form = this.fb.group({
    comision: ['', Validators.required],
    empleadoId: [''],
    servicioId: ['', Validators.required]
  });

  constructor(private servicioService: ServicioService,
    private disponibleService: DisponibleService,
    private empleadoService: EmpleadoService,
    private utilService: UtilesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    console.log(id);
    this.empleadoId = parseInt(this.route.snapshot.params.id);

    this.disponibleService.listarByEmpleadoV2(this.empleadoId).
      subscribe((resp: any[]) =>{
        this.disponibles = resp;
        console.log('disponible');
        console.log(resp);
      } 
      );

      this.servicioService.listarServiciosDisponibles(this.empleadoId).
      subscribe((resp: any[]) => {
        this.servicios =  resp;
     /*  if (this.servicios.length == 0){
          this.servicioService.listarRecurso()
            .subscribe((resp: any[]) => {
              this.servicios = resp;
             }); 
        }*/
      });
  }


  // (click)="modal.close('Save click')"
  guardar() {
    this.form.controls.empleadoId.setValue(parseInt(this.empleadoId));
    console.log(this.form.value);
    let peticion: Observable<any>;

    peticion = this.disponibleService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      this.ngOnInit();
    });
    this.form.reset(this.form.controls.nombre );
    this.ngOnInit();
  }

  borrar(id: any, pos: any) {
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
          this.disponibleService.eliminarRecurso(id).subscribe();
          this.disponibles.splice(pos, 1);
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }
   plainNumber(number) {
    return number.split('.').join('');
  }
 

   oneDot(input) {
    var value = input.target.value,
        value = this.plainNumber(value);
    
    if (value.length > 2) {
      value = value.substring(0, value.length - 2) + '.' + value.substring(value.length - 2, value.length);
    }
    console.log(value);
    input.target.value = value;
  }
}