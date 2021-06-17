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
export class ComprasService {

  
  recurosBaseURL: string = environment.URL_BASE + '/compras/';

  constructor(private http: HttpClient, private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  getBusqueda(id) {
    return this.http.get(this.recurosBaseURL + 'busqueda-compras/' + id);
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        this.router.navigate(['/compras/listar']);
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
  }

  modificarRecurso(recurso, id) {
    console.log(recurso);
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
    }
  
    
  listarporfecha(fecha) {
      return this.http.get(this.recurosBaseURL + 'listarporfecha/' + fecha);
  }

  getPDF(){
    //const url = `${this.serviceUrl}/pdf`;
    const archivo = 'factura.pdf';
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
    
    }


}
