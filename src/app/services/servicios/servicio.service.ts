import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {
   
    recurosBaseURL: string = environment.URL_BASE + '/servicio/';
    constructor(private http: HttpClient,
                private router: Router) { }

    listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
    }

    getBusquedaPorNombre(nombre) {
      return this.http.get(this.recurosBaseURL + 'servicio-por-nombre/' + nombre);
    }

    listarRecursosActivos() {
      return this.http.get(this.recurosBaseURL + 'listarActivos');
      }
      
    agregarRecurso(recurso) {
      return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
        catchError( e=> {
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }
    modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso).pipe(
      catchError( e=> {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        this.router.navigate(['/servicio/listar']);
        return throwError(e);
      })
    );
    }
    listarRecursoPorCategoria(id) {
      return this.http.get(this.recurosBaseURL + 'getServciosByCategoriaId/' +  id ).pipe(
        catchError( e=> {
          this.router.navigate(['/servicio/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    listarRecursoPorEstado(estado) {
      return this.http.get(this.recurosBaseURL + 'getServiciosByEstado/' +  estado ).pipe(
        catchError( e=> {
          this.router.navigate(['/servicio/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getServiciosCalendar(categoriaId) {
      return this.http.get(this.recurosBaseURL + 'getServiciosActivos/' +  categoriaId  ).pipe(
        catchError( e=> {
          this.router.navigate(['/servicio/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getRecurso(id) {
      return this.http.get(this.recurosBaseURL + 'encontrar/' + id).pipe(
        catchError( e=> {
          this.router.navigate(['/servicio/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getServiciosReservadosPorUsuarioFecha(id) {
      return this.http.get(environment.URL_BASE + '/reserva-detalle/servicios-re-by-usuario/'  + id);
    }

    eliminarRecurso(id) {
      return this.http.delete(this.recurosBaseURL + 'eliminar/' + id).pipe(
        catchError( e=> {
          this.router.navigate(['/servicio/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    listarServiciosDisponibles(id){
      return this.http.get(this.recurosBaseURL + 'get-servicios-disponibles/' +  id ).pipe(
        catchError( e=> {
          this.router.navigate(['/empleado/listar']);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getBusqueda(id) {
      return this.http.get(this.recurosBaseURL + 'busqueda-servicios/' + id);
    }

    getServicioReport() {
      return this.http.get(this.recurosBaseURL + 'reporte');
    }
  
    getPDF(){
      //const url = `${this.serviceUrl}/pdf`;
      const archivo = 'servicios.pdf';
      const httpOptions = {
        'responseType'  : 'arraybuffer' as 'json'
         //'responseType'  : 'blob' as 'json'        //This also worked
      };
      
      return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
      
      }
}
