import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  recurosBaseURL: string = environment.URL_BASE + '/categoria/';
  constructor(private http: HttpClient) { }

  listarRecurso() {
    const accessToken = localStorage.getItem('token') || '';
    let headers1: HttpHeaders;
    headers1 = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = {
      headers: headers1
    };
    return this.http.get(this.recurosBaseURL + 'listar', options);
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
  
  obtenerPorTipo(tipo) {
    return this.http.get(this.recurosBaseURL + 'getDataType/' + tipo);
  }

  listarPaginadoRecurso(filtros) {
    return this.http.post(this.recurosBaseURL + 'categorias-list', filtros);
  }
}
