
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import Swal from 'sweetalert2';

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UtilesService } from 'src/app/services/servicios/utiles.service';

// import { jsPDF } from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'app-servicio-listar',
  templateUrl: './servicio-listar.component.html',
  styleUrls: ['./servicio-listar.component.scss']
})
export class ServicioListarComponent implements OnInit {

  servicios: any[] = [];
  categorias: any[] = [];
  index = 0;
  pageActual: 1;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private servicioService: ServicioService, 
              private util: UtilesService) { }

  ngOnInit() {
    this.servicioService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.servicios = resp );
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
          this.servicios.splice(pos, 1);
          this.servicioService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }


  public openPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.fromHTML(DATA.innerHTML, 15, 15);
    doc.output('dataurlnewwindow');
  }

  public downloadPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc =  new jsPDF('p', 'pt', 'a4');
    doc.setFont('arial', 'bold');
    doc.setFontSize(14);
    const handleElement = {
      '#editor'(element, renderer) {
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 10, 10, {
      width: 100,
      elementHandlers: handleElement
    });
    doc.save('servicio-reporte.pdf');
  }


  buscar(termino: String){
    if (termino == ''){
      this.servicioService.listarRecurso()
      .subscribe( (resp: any ) =>  {
        console.log(resp);
        this.servicios = resp;
      });
    }else{
      this.servicioService.getBusqueda(termino)
      .subscribe( (resp: any ) =>  {
        console.log(resp);
        this.servicios = resp;
      });
    }
  }
}
