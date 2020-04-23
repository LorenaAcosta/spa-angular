import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  recurosBaseURL: string = environment.URL_BASE + '/cliente/';
  constructor(private http: HttpClient) { }

  getResourse() {
    return this.http.get(this.recurosBaseURL + 'resource');
  }

  getUser(username, headers) {
    return this.http.get(this.recurosBaseURL + 'user', {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        return userData;
       }
     )

    );
  }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso);
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
 /* listarRecurso(filtros) {
    return this.http.get(this.recurosBaseURL, {params: filtros});
  }  */

}
