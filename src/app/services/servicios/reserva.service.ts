import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'jquery';
import { FormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
 
 
  recurosBaseURL: string = environment.URL_BASE + '/reserva-detalle/';

  constructor(private http: HttpClient) { }

  listarRecursos() {
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

  getTurnosPorFechayEmpleado(id, date) {
    return this.http.get(this.recurosBaseURL + 'get-turnos/' + id + '/' + date);
  }

  getTurnosss(empid, serid, fecha) {
    return this.http.get(this.recurosBaseURL + 'obtener-turnos/' + empid + '/'  + '/' + fecha);
  }

  listarporfecha(fechaReserva) {
    return this.http.get(this.recurosBaseURL + 'listarporfecha/' + fechaReserva);
  }

  getBusqueda(id) {
    return this.http.get(this.recurosBaseURL + 'busqueda-reservas/' + id);
  }


}
