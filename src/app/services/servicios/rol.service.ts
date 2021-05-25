import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  recurosBaseURL: string = environment.URL_BASE + '/roles/';
  constructor(private http: HttpClient) { }

  
  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  listarRolPorUsuario(id) {
    return this.http.get(this.recurosBaseURL + 'listar-usuario/' + id);
  }

  listarRolNoAsignadosPorUsuario(id) {
    return this.http.get(this.recurosBaseURL + 'listar-usuario-na/' + id);
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso);
  }

  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

  asignarRol( usuarioId: any, rolId: any ) {
    const url = this.recurosBaseURL + 'asignar-rol/'+ usuarioId + '/' + rolId;
    return this.http.post( url, usuarioId, rolId );
  }

  eliminarRolAsignado(usuarioId: any, rolId: any) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/rol-asignado/' + usuarioId + '/' + rolId);
  }

}
