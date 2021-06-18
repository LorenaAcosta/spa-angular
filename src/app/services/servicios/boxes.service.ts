import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {
  recurosBaseURL: string = environment.URL_BASE + '/boxes/';
  constructor(private http: HttpClient,
              private router: Router) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }
  
  listarByServicio(servicioId) {
    return this.http.get(this.recurosBaseURL + 'obtener-servicios-disponibles/' + servicioId) ;
  }

  listarByServicioId(servicioId) {
     return this.http.get(this.recurosBaseURL + 'listar-porservicio/' + servicioId) ;
  }

  agregarDisponibilidad(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar-diponibilidad', recurso);
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso).pipe(
      catchError( e=> {
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
  }
  
  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  getDisponible(id) {
    return this.http.get(this.recurosBaseURL + 'get-boxes-id/' + id);
  }

  listarBoxesDisponibles(id){
    return this.http.get(this.recurosBaseURL + 'get-boxes-disponibles/' +  id ).pipe(
      catchError( e=> {
        this.router.navigate(['/servicio/listar']);
        var cadena =  e.error.error.toString();
        var divisiones = cadena.split("Detail:", 2);
        console.log('divisiones'  + divisiones);
        Swal.fire(e.error.mensaje, divisiones[1].toString() , 'error');
        return throwError(e);
      })
    );
  }


    obtenerUnBoxLibre(fecha: any, hora: string, servicioId: number){
    return this.http.get(this.recurosBaseURL + 'obtener-box-libre/' + fecha + '/' + hora + '/' + servicioId  );
  }
}

/*
select disponible_boxes_id from disponible_boxes d
where d.disponible_boxes_id not in (select r.disponible_boxes_id from reserva_detalle r
									where fecha_reserva='2021-03-02' and hora='13:00'
								   )
								   and d.servicio_id=1*/