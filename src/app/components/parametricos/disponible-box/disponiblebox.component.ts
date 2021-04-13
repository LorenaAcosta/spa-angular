import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { BoxesService } from 'src/app/services/servicios/boxes.service';
import { DisponibleBoxService } from 'src/app/services/servicios/disponiblebox.service';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import Swal from 'sweetalert2';
import { EmpleadoService } from '../../../services/servicios/empleado.service';

@Component({
  selector: 'app-disponiblebox',
  templateUrl: './disponiblebox.component.html',
  styleUrls: ['./disponiblebox.component.scss']
})

export class DisponibleBoxComponent implements OnInit {
  pageActual: 1;

  servicios: any[] = [];
  disponibles: any[] = [];
  listaServicios: any[] = [];
  boxes: any[] = [];
  empleadoNombre: String;
  servicioId;
  closeResult = '';
  boxesDiponibles: any[] = [];

  form = this.fb.group({
    servicioId: ['', Validators.required],
    boxesId: ['', Validators.required]
  });

  
  boxForm = this.fb.group({
    nombre: ['', Validators.required],
    estado: ['', Validators.required]
  });

  constructor(private servicioService: ServicioService,
    private disponibleboxService: DisponibleBoxService,
    private boxesService: BoxesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;
    this.servicioId = parseInt(this.route.snapshot.params.id);
 
    this.disponibleboxService.listarByServicioV2(this.servicioId).
      subscribe((resp: any[]) =>{
        this.disponibles=[];
        this.disponibles = resp;
        console.log('disponible');
        console.log(resp);
      } 
    );

    this.boxesService.listarBoxesDisponibles(this.servicioId).
      subscribe((resp: any[]) => {
        this.boxesDiponibles = resp;
        if (this.boxesDiponibles.length == 0){
          this.boxesService.listarRecurso()
            .subscribe((resp: any[]) => {
              this.boxesDiponibles = resp;
             });
        }
      });

  }

  // (click)="modal.close('Save click')"
  guardar() {
    this.form.controls.servicioId.setValue(parseInt(this.servicioId));
    console.log(this.form.value);
    let peticion: Observable<any>;

    peticion = this.disponibleboxService.agregarRecurso(this.form.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );

    });
    this.modalService.dismissAll();
    this.ngOnInit();
  }


  //open modal add service
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.form.controls.servicioId.setValue(parseInt(this.servicioId));
      console.log(this.form.value);

    this.boxesService.agregarRecurso(this.form.value)
    .subscribe((result: any) => {
        Swal.fire(
          'Guardado!',
          'Se guardaron los datos!',
          'success'
        );
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  
  
  //open modal, add box
   openBox(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.boxForm.value);
      this.boxesService.agregarRecurso(this.boxForm.value)
      .subscribe((result: any) => {
          Swal.fire(
            'Guardado!',
            'Se guardaron los datos!',
            'success'
          );
        }); 
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  //open modal, Listar Boxes
  openBoxes(content2) {
    this.boxesService.listarRecurso()
    .subscribe((result: any) => {
      this.boxes=result;
      }); 

    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  guardarBox() {
    console.log(this.boxForm.value);
    let peticion: Observable<any>;
    peticion = this.boxesService.agregarRecurso(this.boxForm.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      
    });
    this.modalService.dismissAll();
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
          this.disponibles.splice(pos, 1);
          this.boxesService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
