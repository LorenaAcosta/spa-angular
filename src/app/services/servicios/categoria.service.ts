import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  recurosBaseURL: string = environment.URL_BASE + '/categoria/';

  constructor(private http: HttpClient,
              private router: Router) { }


  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  listarRecursoDescripcion() {
    return this.http.get(this.recurosBaseURL + 'descripcion');
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso ).pipe(
      catchError( e=> {
        this.router.navigate(['/categoria/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/categoria/clientes']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/categoria/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/categoria/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  
  obtenerPorTipo(id) {
    return this.http.get(this.recurosBaseURL + 'obtener-por-tipo/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/categoria/listar']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  listarPaginadoRecurso(filtros) {
    return this.http.post(this.recurosBaseURL + 'categorias-list', filtros);
  }

   
  getBusqueda(id) {
    return this.http.get(this.recurosBaseURL + 'busqueda-categorias/' + id);
  }

  getCategoriaReport() {
    return this.http.get(this.recurosBaseURL + 'reporte');
  }

  getPDF(){
    //const url = `${this.serviceUrl}/pdf`;
    const archivo = 'categorias.pdf';
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
    
    }

}


