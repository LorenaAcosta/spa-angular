import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    recurosBaseURL: string = environment.URL_BASE + '/producto/';
    constructor(
        private http: HttpClient,
        private router: Router) { }

    listarRecurso() {
      return this.http.get(this.recurosBaseURL + 'listar').pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
    agregarRecurso(recurso) {
      return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
    listarPaginadoRecurso(filtros) {
      return this.http.post(this.recurosBaseURL + 'productos-list', filtros);
    }
    modificarRecurso(recurso, id) {
      return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
    getRecurso(id) {
      return this.http.get(this.recurosBaseURL + 'encontrar/' + id).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
    eliminarRecurso(id) {
      return this.http.delete(this.recurosBaseURL + 'eliminar/' + id).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
    listarRecursoPorCategoria(id) {
      return this.http.get(this.recurosBaseURL + 'getProductosByCategoriaId/' +  id ).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          this.router.navigate(['/producto/listar']);
          return throwError(e);
        })
      );
    }
}
