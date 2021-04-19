import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  recurosBaseURL: string = environment.URL_BASE + '/ventas/';
  constructor(private http: HttpClient) { }

  listarRecurso() {
    return this.http.get(this.recurosBaseURL + 'listar');
  }

  listarRecursoPorPuntoExpedicion(id) {
    return this.http.get(this.recurosBaseURL + 'listar/' + id);
  }

  getNextId() {
    return this.http.get(this.recurosBaseURL + 'next-id');
  }

  getRecurso(id) {
    return this.http.get(this.recurosBaseURL + 'encontrar/' + id);
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL + 'agregar', recurso);
  }

  modificarRecurso(recurso, id) {
    console.log(recurso);
    return this.http.put(this.recurosBaseURL + 'modificar/' + id, recurso);
  }

  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + 'eliminar/' + id);
  }

  actualizarCabecera(id) {
    return this.http.get(this.recurosBaseURL + 'actualizar-cabecera/' + id);
  }

  getFacturaReport(id) {
    return this.http.get(this.recurosBaseURL + 'report/' + id);
  }

  getPDF(){
    //const url = `${this.serviceUrl}/pdf`;
    const archivo = 'factura.pdf';
    const httpOptions = {
      'responseType'  : 'arraybuffer' as 'json'
       //'responseType'  : 'blob' as 'json'        //This also worked
    };
    
    return this.http.get<any>(this.recurosBaseURL + 'files/' + archivo, httpOptions);
    
    }

}
