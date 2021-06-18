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
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
          var divisiones = cadena.split("Detail:", 2);
          console.log('divisiones'  + divisiones);
          Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
          return throwError(e);
        })
      );
    }

    listarRecursosActivos() {
      return this.http.get(this.recurosBaseURL + 'listarActivos');
    }

    agregarRecurso(recurso) {
      return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
        catchError( e=> {
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
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
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
          var divisiones = cadena.split("Detail:", 2);
          console.log('divisiones'  + divisiones);
          Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
          return throwError(e);
        })
      );
    }
    getRecurso(id) {
      return this.http.get(this.recurosBaseURL + 'encontrar/' + id).pipe(
        catchError( e=> {
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
          var divisiones = cadena.split("Detail:", 2);
          console.log('divisiones'  + divisiones);
          Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
          return throwError(e);
        })
      );
    }
    eliminarRecurso(id) {
      return this.http.delete(this.recurosBaseURL + 'eliminar/' + id).pipe(
        catchError( e=> {
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
          var divisiones = cadena.split("Detail:", 2);
          console.log('divisiones'  + divisiones);
          Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
          return throwError(e);
        })
      );
    }
    listarRecursoPorCategoria(id) {
      return this.http.get(this.recurosBaseURL + 'getProductosByCategoriaId/' +  id ).pipe(
        catchError( e=> {
          this.router.navigate(['/producto/listar']);
          var cadena =  e.error.error.toString();
          var divisiones = cadena.split("Detail:", 2);
          console.log('divisiones'  + divisiones);
          Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
          return throwError(e);
        })
      );
    }

    getBusqueda(id) {
      return this.http.get(this.recurosBaseURL + 'busqueda-productos/' + id);
    }

    getBusquedaPorNombre(nombre) {
      return this.http.get(this.recurosBaseURL + 'producto-por-nombre/' + nombre);
    }

    getProductoReport() {
      return this.http.get(this.recurosBaseURL + 'reporte');
    }
  
    getPDF(){
      //const url = `${this.serviceUrl}/pdf`;
      const archivo = 'productos.pdf';
      const httpOptions = {
        'responseType'  : 'arraybuffer' as 'json'
         //'responseType'  : 'blob' as 'json'        //This also worked
      };
      
      return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
      
      }

}
