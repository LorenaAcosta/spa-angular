import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillaDetalleService {

  recurosBaseURL: string = environment.URL_BASE + '/planilla-detalle/';
  constructor(private http: HttpClient) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar-detalles/' + id);
  }

  getRecursoByPlanillaId(id) {
    return this.http.get(this.recurosBaseURL + 'get-by-planilla/' + id);
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

  getComisiones(id) {
    return this.http.get(this.recurosBaseURL + 'get-comisiones/' + id);
  }
  getSalario(id) {
    return this.http.get(this.recurosBaseURL + 'get-salario/' + id);
  }

  getDetalles(id) {
    return this.http.get(this.recurosBaseURL + 'get-detalles/' + id);
  }

}
