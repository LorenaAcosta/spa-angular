import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { ProductoService } from '../../../services/servicios/producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SortableHeader, SortEvent } from 'src/app/directives/sortable.directive';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.scss']
})

export class ProductoListarComponent implements OnInit {
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
  column = 'idConductor';
  direction = 'ASC';
  previousPage: any;

  dataGridColumns = [
    {
      modelo: 'descripcion',
      titulo: 'Nombre'
    },
    {
      modelo: 'costo',
      titulo: 'Costo'
    },
    {
      modelo: 'stockActual',
      titulo: 'Stock Actual'
    },
  ];
  constructor(
    private service: ProductoService
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



}


/**
 *



  productos: any[] = [];
  index = 0;
  constructor(private productoService: ProductoService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.productoService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.productos = resp );
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
          this.productos.splice(pos, 1);
          this.productoService.eliminarRecurso(id).subscribe();
          Swal.fire(
            'Eliminado!',
            'Los datos han sido eliminados.',
            'success'
          );
        }
      });
  }
 */
