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
export class DisponibleService {
  recurosBaseURL: string = environment.URL_BASE + '/disponible/';
  constructor(private http: HttpClient) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  listarByEmpleado(servicioId) {
    return this.http.get(this.recurosBaseURL + 'obtener-empleados-disponibles/' + servicioId) ;
  }

  listarByEmpleadoV2(empleadoId) {
     return this.http.get(this.recurosBaseURL + 'listar-porempleado/' + empleadoId) ;
  }

  agregarDisponibilidad(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar-diponibilidad', recurso);
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
       // this.router.navigate(['/categoria/listar']);
       var cadena =  e.error.error.toString();
       var divisiones = cadena.split("Detail:", 2);
       console.log('divisiones'  + divisiones);
       Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
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
  getDatosRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar-datos/' + id);
  }

  getDisponible(id) {
    return this.http.get(this.recurosBaseURL + 'get-disponibilidad/' + id);
  }

  getHorasDisponibles(categoriaId, servicioId, empleadoId, fecha) {
    return this.http.get(this.recurosBaseURL + 'getHorariosDisponibles/' + categoriaId +"/" + servicioId + "/" + empleadoId + "/" + fecha);
  }
}
