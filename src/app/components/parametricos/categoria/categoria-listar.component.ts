import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { SortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.scss']
})

export class CategoriaListarComponent implements OnInit {
  @ViewChildren(SortableHeader) headers: QueryList<SortableHeader>;

  data$: any[];
  // tslint:disable-next-line:no-input-rename
  @Input('total$')
  total$ = 0;
    // tslint:disable-next-line:no-input-rename
  @Input('pageSize')
  pageSize = 5;
  // tslint:disable-next-line:no-input-rename
  @Input('page')
  page = 0;
  column = 'categoriaId';
  direction = 'ASC';
  previousPage: any;
  index: 0;

  dataGridColumns = [
    {
      modelo: 'categoriaId',
      titulo: '#'
    },
    {
      modelo: 'codigo',
      titulo: 'Codigo'
    },
    {
      modelo: 'descripcion',
      titulo: 'Categoria'
    }
  ];
  constructor(
    // private service: categoriaService
    private service: CategoriaService
  ) { }
  ngOnInit() {
    this.buscar();
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
      this.column = column;
      this.direction = direction;
    });
    this.buscar();
  }

  buscar() {
    const params = {
      cantidad: this.pageSize,
      pagina: this.page,
      orderBy: this.column,
      orderDir: this.direction,
      filtros: {}
    };

    this.service.listarPaginadoRecurso(params).subscribe( (res: any) => {
        this.data$ = res.lista;
        this.total$ = res.total;
        this.page = res.pagina;
    });
  }
  cargarPagina(page) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.buscar();
    }
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
          // this.categoria.splice(id, 1);
          this.service.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
          this.buscar();
        }
      });
  }
}
