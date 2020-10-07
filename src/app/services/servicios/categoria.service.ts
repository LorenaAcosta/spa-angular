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
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  agregarRecurso(recurso) {
    const accessToken = localStorage.getItem('token') || ' ';
    let headers1: HttpHeaders;
    headers1 = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    const options = {
      headers: headers1
    };
    return this.http.post(this.recurosBaseURL + 'agregar', recurso, options);
  }
  modificarRecurso(recurso, id) {
    const accessToken = localStorage.getItem('token') || '';
    let headers1: HttpHeaders;
    headers1 = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    const options = {
      headers: headers1
    };
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso, options);
  }

  getRecurso(id) {
    const accessToken = localStorage.getItem('token') || '';
    let headers1: HttpHeaders;
    headers1 = new HttpHeaders({
      Authorization: 'Bearer ' + accessToken
    });
    const options = {
      headers: headers1
    };
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id, options);
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
