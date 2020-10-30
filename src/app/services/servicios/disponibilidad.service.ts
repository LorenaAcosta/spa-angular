import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisponibleService {
  recurosBaseURL: string = environment.URL_BASE + '/disponibilidad/';
  constructor(private http: HttpClient) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  listarByEmpleado(empleadoId) {
    return this.http.get(this.recurosBaseURL + 'listar-por-empleado-id/' + empleadoId) ;
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

}
