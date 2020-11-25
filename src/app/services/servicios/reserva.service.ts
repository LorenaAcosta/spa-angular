import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  recurosBaseURL: string = environment.URL_BASE + '/reserva-detalle/';

  constructor(private http: HttpClient) { }

  listarRecursosHoy() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso);
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

  getTurnos(id) {
    return this.http.get(this.recurosBaseURL + 'get-turnos/' + id);
  }

  getTurnosss(empid, serid, fecha) {
    return this.http.get(this.recurosBaseURL + 'obtener-turnos/' + empid + '/'  + '/' + fecha);
  }

}
