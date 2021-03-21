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
export class HorarioService {
 

  recurosBaseURL: string = environment.URL_BASE + '/horario/';

  constructor(private http: HttpClient,
              private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  
  obtenerHorario(id) {
    return this.http.get(this.recurosBaseURL + 'obtener-horario-empleado/' + id).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
