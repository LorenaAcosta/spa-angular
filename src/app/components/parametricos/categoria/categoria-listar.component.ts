import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.scss']
})
export class CategoriaListarComponent implements OnInit {

   categoria: any[] = [];
   index = 0;

  constructor(private categoriaService: CategoriaService,  private route: ActivatedRoute) {   }

  ngOnInit() {
    this.categoriaService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.categoria = resp );
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
          this.categoria.splice(pos, 1);
          this.categoriaService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }
}
