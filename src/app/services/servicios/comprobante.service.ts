import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  
  recurosBaseURL: string = environment.URL_BASE + '/comprobante/';
  constructor(private http: HttpClient,  private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/comprobante/agregar']);
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
  }
    listarPaginadoRecurso(filtros) {
      return this.http.post(this.recurosBaseURL + 'comprobante-list', filtros);
    }
    modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
    }
    getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
    }
    eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
    }

    getBusqueda(id) {
      return this.http.get(this.recurosBaseURL + 'busqueda-comprobantes/' + id);
    }

    getNumeroActual(id){
      return this.http.get(this.recurosBaseURL + 'numero-actual-por-punto/' + id);
    }

    
    getComprobanteActivo(){
      return this.http.get(this.recurosBaseURL + 'comprobante-activo/');
    }

    getComprobanteActivoPorPuntoExpedicion(id){
      return this.http.get(this.recurosBaseURL + 'comprobante-activo-por-punto/' + id);
    }
}

