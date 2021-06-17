import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'jquery';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
 
  recurosBaseURL: string = environment.URL_BASE + '/reserva-detalle/';

  constructor(private http: HttpClient,  private router: Router) { }

  listarRecursos() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso);
  }

  modificarRecurso(id, valorEstado) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, valorEstado).pipe(
      catchError( e=> {
        this.router.navigate(['/reserva/listar']);
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
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

  getReservaReport(fecha) {
    return this.http.get(this.recurosBaseURL + 'reporte/' + fecha);
  }

  getPDF(){
    //const url = `${this.serviceUrl}/pdf`;
    const archivo = 'reservas_por_fecha.pdf';
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
    
    }

    confirmarReserva(id: any) {
      return this.http.post(this.recurosBaseURL + 'confirmar', id);
    }

    anularReserva(id: any) {
      return this.http.post(this.recurosBaseURL + 'confirmar', id);
    }

    getReservasConfirmadasEmpleado(id, mes) {
      return this.http.get(this.recurosBaseURL + 'reservas-confirmadas/' + id + '/' + mes);
    }
 
    misReservas(id) {
      return this.http.get(this.recurosBaseURL + 'mis-reservas/' + id);
    }

    cambiarEstadoPagado(reservaId: any) {
      const url = URL_SERVICIOS + '/reserva-detalle/cambiar-estado-pagado/' + reservaId;
      return this.http.get( url);
    }

    asignarVenta(reservaId: any, ventasId: any) {
      const url = URL_SERVICIOS + '/reserva-detalle/asignar-venta/' + reservaId + '/' + ventasId;
      return this.http.get( url);
    }


}
