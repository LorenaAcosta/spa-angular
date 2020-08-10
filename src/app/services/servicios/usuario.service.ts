import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { retry, map, filter, catchError } from 'rxjs/operators';


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


  renuevaToken() {
    const url = URL_SERVICIOS + '/refresh';
    return this.http.get( url, {headers: this.headers})
                                .pipe(
                                  map( (resp: any) => {

                                    this.token = resp.access_token;
                                    localStorage.setItem('token', this.token );
                                    return true;

                                  }),
                                  catchError( (err: any) =>
                                    this.router.navigate(['/login'])
                                  )
                                 );

  }


  estaLogueado() {
    return ( this.token.length !== null ) ? true : false;
    // return ( this.token !== '' ) ? true : false;
  }


  getUsuarioLogueado() {
    const url = URL_SERVICIOS + '/user';

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

    this.router.navigate(['/login']);
    // this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

  }
/*original
  login( usuario: Usuario, recuerdame: boolean = false ){
    const url = URL_SERVICIOS + '/auth';

    return this.http.post( url, usuario )
               .pipe(
                  map( (resp: any) => {

                    localStorage.setItem( 'token', resp.token );
                  })
                );

  }*/

  login( usuario: Usuario, recuerdame: boolean = false ) {
    const url = URL_SERVICIOS + '/oauth/token';
    let headers1: HttpHeaders;
    headers1 = new HttpHeaders({
      // Authorization: localStorage.getItem('token')
      Authorization: 'Basic YW5ndWxhcjoxMjM0NQ==', // 'Basic ' + btoa('YW5ndWxhcjoxMjM0NQ=='),//'YW5ndWxhcjoxMjM0NQ==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    // usuario.grant_type = 'password';
    const options = {
      headers: headers1,
      body: 'username=' + usuario.username + '&password=' + usuario.password + '&grant_type=password'
    }
    // options.body.grant_type = 'password';

    return this.http.post( url, options.body, options )
               .pipe(
                  map( (resp: any) => {

                    localStorage.setItem( 'token', resp.access_token );
                  })
                );

  }



crearUsuario( usuario: Usuario ) {

  const url = URL_SERVICIOS + '/auth/token';
  return this.http.post( url, usuario );

}

}
