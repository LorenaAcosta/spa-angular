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
export class CarritoService {


  recurosBaseURL: string = environment.URL_BASE + '/carrito/';

  constructor(private http: HttpClient,
              private router: Router) { }


  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso ).pipe(
      catchError( e=> {
        this.router.navigate(['/pedido/listar']);
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
        this.router.navigate(['/pedido/listar']);
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
        this.router.navigate(['/pedido/listar']);
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
  }
  


  listarPaginadoRecurso(filtros) {
    return this.http.post(this.recurosBaseURL + 'categorias-list', filtros);
  }

   
}


