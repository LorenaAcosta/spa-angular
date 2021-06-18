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
export class PuntosExpedicionService {


  recurosBaseURL: string = environment.URL_BASE + '/punto-expedicion/';
  constructor(private http: HttpClient,  private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/puntos-expedicion/listar']);
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
  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }
  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

}
