import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConceptosService } from 'src/app/services/servicios/conceptos.service';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { PlanillaDetalleService } from 'src/app/services/servicios/planilla-detalle.service';
import { PlanillaService } from 'src/app/services/servicios/planilla.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {
  
  getTipo: any;
  pageActual:any;
  empleados: any[] = [];
  cabecera: any;
  detalles: any[] = [];
  fbForm = this.fb.group({
    descripcion: ['', Validators.required],
    tipo: ['', Validators.required],
    valor: ['', Validators.required]
  });
  closeResult: string;
  conceptos: any[] = [];
  m: string;
  months = [
    {"cod":1, "mes": "ENERO"},
    {"cod":2, "mes": "FEBRERO"},
    {"cod":3, "mes": "MARZO"},
    {"cod":4, "mes": "ABRIL"},
    {"cod":5, "mes": "MAYO"},
    {"cod":6, "mes": "JUNIO"},
    {"cod":7, "mes": "JULIO"},
    {"cod":8, "mes": "AGOSTO"},
    {"cod":9, "mes": "SEPTIEMBRE"},
    {"cod":10, "mes": "OCTUBRE"},
    {"cod":11, "mes": "NOVIEMBRE"},
    {"cod":12, "mes": "DICIEMBRE"} 
  ]
  comisiones: any;
  detalleFinal: any;
  totalComision: any;
  salarioBase: any;
  lado: any;
  mes: any;

  constructor(private planillaService: PlanillaService,
             private conceptosService: ConceptosService,
             public utilService: UtilesService,
             private modalService: NgbModal, 
             private planillaDetalleService: PlanillaDetalleService,
             private fb: FormBuilder,
             private util: UtilesService) { }

  ngOnInit(): void {
    this.planillaService.listarRecurso()
    .subscribe( (resp: any[]) => { this.empleados = resp;  });
   
    this.conceptosService.listarRecurso().subscribe((result: any) => {
        this.conceptos= result;
    });
  }

  buscarTermino(){
  }

   
  //open modal, add conceptos
  openBox(content1) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //log(this.fbForm.value);
      this.conceptosService.agregarRecurso(this.fbForm.value)
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




  //open modal, Listar Conceptos
  openBoxes(content2) {
    this.conceptosService.listarRecurso()
    .subscribe((result: any) => {
      this.conceptos=result;
      }); 

    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }






   //open modal, detalles
 openDetalle(content3, planillaId) {

    this.planillaService.getRecurso(planillaId).subscribe((result: any) => {
        this.cabecera= result;
      }); 

      this.planillaDetalleService.getComisiones(planillaId).subscribe((result: any) => {
          this.totalComision= result;
      });

      this.planillaDetalleService.getSalario(planillaId).subscribe((result: any) => {
        this.salarioBase= result;
      });


      this.planillaDetalleService.getDetalles(planillaId).subscribe((result: any) => {
        this.detalles= result;
        console.log(this.detalles);
      }); 


  this.modalService.open(content3, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
   
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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




    
  guardarConcepto() {
    console.log(this.fbForm.value);
    let peticion: Observable<any>;
    peticion = this.conceptosService.agregarRecurso(this.fbForm.value);
    peticion.subscribe((result: any) => {
      Swal.fire(
        'Guardado!',
        'Se guardaron los datos!',
        'success'
      );
      
    });
    this.fbForm.reset(this.fbForm.controls.descripcion );
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  





  borrarBox(id: any, pos: any) {
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
          this.conceptos.splice(pos, 1);
          this.conceptosService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }
  
  
  buscarpormes(valor){
    this.mes = valor;
    console.log(this.mes);
    //this.m =  this.util.getMonth(this.mes);
    this.planillaService.listarpormes( this.mes )
    .subscribe( (resp: any ) =>  {
      this.empleados = resp;
      console.log(this.empleados);
    });
  }
}


export class PlanillaDetalle {
  constructor(public planillaDetalleId: number, 
              public conceptoId: number,
              public montoDebe: number,
              public montoHaber: number,
              public planilla: number,
              public reservas: number 
      ) {
  }
}