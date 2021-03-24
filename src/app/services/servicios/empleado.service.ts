import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  recurosBaseURL: string = environment.URL_BASE + '/empleado/';
  constructor(private http: HttpClient,
              private router: Router) { }

              
  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/listar']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/empleado/clientes']);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
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

  getRecursoByCedula(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar-por-cedula/' + id).pipe(
      catchError( e=> {
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


  obtenerTurnos(id, fecha) {
    return this.http.get(this.recurosBaseURL + 'obtener-turnos/' + id + fecha ).pipe(
      catchError( e=> {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  
  getBusqueda(id) {
    return this.http.get(this.recurosBaseURL + 'busqueda-empleados/' + id);
  }

  

}
