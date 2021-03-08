import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosSubidosService{

  //Url obtenida de la variable de enviroments
  //baseUrl = environment.baseUrl;
  recurosBaseURL: string = environment.URL_BASE;

  //Inyeccion de HttpClient
  constructor(private http: HttpClient) { }

  //Metodo que envia los archivos al endpoint /upload 
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `${this.recurosBaseURL}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get(`${this.recurosBaseURL}/files`);
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get(`${this.recurosBaseURL}/delete/${filename}`);
  }

    //Metodo para Obtener los archivos
    getFilePorNombre(filename: string){
      //return this.http.get(`${this.recurosBaseURL}/files`);
      console.log(`${this.recurosBaseURL}/files/${filename}`);
      return this.http.get(`${this.recurosBaseURL}/files/${filename}`);
    }

}
