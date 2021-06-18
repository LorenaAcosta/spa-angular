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
export class DisponibleBoxService {
  recurosBaseURL: string = environment.URL_BASE + '/disponible-boxes/';
  constructor(private http: HttpClient) { }

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

  
  listarByServicioV2(servicioId) {
    return this.http.get(this.recurosBaseURL + 'listar-porservicio/' + servicioId) ;
 }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  listarByServicio(servicioId) {
    return this.http.get(this.recurosBaseURL + 'obtener-servicios-disponibles/' + servicioId) ;
  }


  agregarDisponibilidad(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar-diponibilidad', recurso);
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
    return this.http.get(this.recurosBaseURL + 'get-disponibilidad/' + id);
  }


}
