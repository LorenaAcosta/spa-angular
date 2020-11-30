import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.scss']
})

export class CategoriaListarComponent implements OnInit {
  index: 1;
  categorias: any[] = [];
  pageActual: 1;


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.categorias = resp  );
  }

  borrar(id: any) {
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
          // this.categorias.splice(pos + 1, 1);

          this.categoriaService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }

  productos() {
      this.categoriaService.obtenerPorTipo('producto')
      .subscribe( (resp: any[]) =>  this.categorias = resp  );
  }
  servicios() {
    this.categoriaService.obtenerPorTipo('servicio')
    .subscribe( (resp: any[]) =>  this.categorias = resp  );
}
}
