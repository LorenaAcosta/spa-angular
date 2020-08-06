import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
