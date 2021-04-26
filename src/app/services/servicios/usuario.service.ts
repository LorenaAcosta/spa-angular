import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { retry, map, filter, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  usuarioLogueado: Usuario;
  token: string;
  headers: HttpHeaders;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
    this.headers = new HttpHeaders({
      Authorization: localStorage.getItem('token')
    });
  }

  estaLogueado() {
    return ( this.token.length !== null ) ? true : false;
    // return ( this.token !== '' ) ? true : false;
  }


  getUsuarioLogueado() {
    const url = URL_SERVICIOS + '/usuarios';

    return this.http.get( url, {headers: this.headers} )
              .pipe(
                  map( (resp: any) => {

                    localStorage.setItem('usuario', JSON.stringify(resp) );
                    this.usuario = JSON.parse( localStorage.getItem('usuario') );
                    console.log(this.usuario + 'getUsuariostorage');

               })
              );
    }




   cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }

    if (localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.usuario = null;
    }

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }



crearUsuario( formData: any ) {
  const url = URL_SERVICIOS + '/usuarios/agregar';
  return this.http.post( url, formData );

}

login( formData: any ) {
  const url = URL_SERVICIOS + '/oauth/token';
  const payload = '';
  let headers1: HttpHeaders;
  headers1 = new HttpHeaders({
    Authorization: 'Basic YW5ndWxhcjoxMjM0NQ==',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const options = {
    headers: headers1,
    body: 'username=' + formData.username + '&password=' + formData.password + '&grant_type=password'
  };
  return this.http.post( url, options.body, options )
  .pipe(
     map( (resp: any) => {
       localStorage.setItem('usuario', JSON.stringify(resp.roles) );
       localStorage.setItem( 'token', resp.access_token );
       localStorage.setItem( 'refresh_token', resp.refresh_token);
       if (localStorage.getItem( 'token').length !== null) {
        this.router.navigate(['/']);
      }
     })
   );

}

validaToken(): Observable<boolean> {
  const url = URL_SERVICIOS + '/oauth/token';
  // tslint:disable-next-line: variable-name
  const refresh_token = localStorage.getItem('refresh_token') || '';
  let headers1: HttpHeaders;
  headers1 = new HttpHeaders({
    Authorization: 'Basic YW5ndWxhcjoxMjM0NQ==',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  const options = {
    headers: headers1,
    body: 'refresh_token=' + refresh_token + '&grant_type=refresh_token'
  };
  return this.http.post( url, options.body, options )
  .pipe(
    tap( (resp: any) => {
      localStorage.setItem( 'token', resp.access_token );
      localStorage.setItem( 'refresh_token', resp.refresh_token);
    }),
     map ( resp => true ),
     catchError( error => of(false) )
   );
}

}
