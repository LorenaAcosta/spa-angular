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
export class ConceptosService {
  recurosBaseURL: string = environment.URL_BASE + '/conceptos/';
  constructor(private http: HttpClient,
              private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  


  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
       // this.router.navigate(['/categoria/listar']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  
  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  getDisponible(id) {
    return this.http.get(this.recurosBaseURL + 'get-boxes-id/' + id);
  }

}

