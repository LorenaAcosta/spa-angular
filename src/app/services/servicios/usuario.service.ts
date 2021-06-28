import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { retry, map, filter, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SendMailService } from './send-mail.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  usuarioLogueado: Usuario;
  token: string;
  headers: HttpHeaders;

    /*---correo---*/
    loading: any;
    buttionText: any;
    asuntoCorreo: any = '';
    cuerpoCorreo: any = '';

  constructor(
    public http: HttpClient,
    private spinnerService: NgxSpinnerService,
    private sendMailService: SendMailService,
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
                   // console.log(this.usuario + 'getUsuariostorage');

               })
              );
    }

    getRol() {
      let user: Usuario;
      user = JSON.parse( localStorage.getItem('usuario'));
      console.log ('roles', user[0].nombre);
      console.log ('roles', localStorage.getItem('usuario'));
      return user.roles;
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

  limpiarStorage(){
    this.usuario=null;
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioList');
    localStorage.removeItem('carrito');
    localStorage.removeItem('punto');
    localStorage.removeItem('admin');
  }

  logout() {
    /*localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('punto');
    localStorage.removeItem('admin');*/
    this.limpiarStorage();
    this.router.navigate(['/']);
  }



crearUsuario( formData: any ) {
  const url = URL_SERVICIOS + '/usuarios/agregar';
  return this.http.post( url, formData );

}

asignarRol( usuarioId: any, rolId: any ) {
  const url = URL_SERVICIOS + '/usuarios/asignar-rol/'+ usuarioId + '/' + rolId;
  return this.http.post( url, usuarioId, rolId );
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


confirmacionUsuario( formData: any ) {
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
      //this.spinnerService.hide();
       console.log('token', resp);
       let us = resp;
       console.log('token', us.access_token);
       this.cuerpoCorreo = '<html><head><style>.button2 {font-size: 20px;background-color: white;color: black;border: 2px solid #008CBA;}.button2:hover {background-color: #008CBA;color: white;}table{font-family: arial, sans-serif;border-collapse:collapse;width: 100%;} td,th{border: 1px solid #dddddd; text-align: left;  padding: 8px;} tr{background-color:#D1ECF1;} tr:nth-child(even) {background-color:#FFFFFF;}</style></head><body><h3>¡Solo un paso más! <br> Por favor confirma tu correo dando click en el siguiente enlace:</h3><br><a href="http://localhost:4200/confirmacion/user/' + us.access_token +'" title="Pulse Aqui"><button class="button button2"> Pulse Aqui</button></a><br><br><div>Katthy Spa S.A.<br>10 DE AGOSTO Y GRAL. CABALLERO<br>TELEFONO 021-498-690<br>SAN LORENZO - PARAGUAY</div></html>';
       this.asuntoCorreo = 'Confirmación de cuenta'
       this.mandarCorreo((us.nombre + ' ' + us.apellido), us.correo, this.asuntoCorreo, this.cuerpoCorreo);
     })
   );

}

modificarRecurso(recurso, id) {
  const url = URL_SERVICIOS + '/usuarios/habilitar-deshabilitar/';
  return this.http.put(url + id, recurso);
}

habilitarDeshabilitar(recurso, id, token) {
  const url = URL_SERVICIOS + '/usuarios/habilitar-deshabilitar/';
  return this.http.put(url + id + '?access_token=' + token, recurso);
}

spinner(): void{
  this.spinnerService.show();
  setTimeout(() => {
    this.spinnerService.hide();
  }, 1000);
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

  //devuelve true si el token expiró, false si el token aun es valido
  getExpiracion(){
    if (localStorage.getItem('token')) {
      const payload = JSON.parse( atob( localStorage.getItem('token').split('.')[1] ) );
      const ahora = new Date().getTime();
      if (ahora > payload.exp * 1000){
        return true;
      }else {
        return false;
      }
    }
  }

  obtenerUsuarioLogueado() {
    if (localStorage.getItem('token')) {
      const payload = JSON.parse( atob( localStorage.getItem('token').split('.')[1] ) );
      //console.log('usuarioId', payload.usuarioId);
      return payload.usuarioId;
    }
  }

  obtenerPerfilUsuario(id) {
    
    return this.http.get(URL_SERVICIOS + '/usuarios/encontrar/' + id);
  }
  modificarPerfilUsuario(recurso, id) {
    //const url = URL_SERVICIOS + '/usuarios/modificar/' + id, recurso;
    return this.http.put(URL_SERVICIOS + '/usuarios/modificar/' + id, recurso);
  }

  obtenerRoles() {
    const url = URL_SERVICIOS + '/usuarios/listar-roles';
    return this.http.get( url);
  }

  mandarCorreo(nombreUsuario, correo, asunto, cuerpo){
    this.spinnerService.show();
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: nombreUsuario,
      email: correo,
      subject: asunto,
      html: cuerpo
    }
    this.sendMailService.sendEmail(user).subscribe(
      data => {
        
        this.spinnerService.hide();
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} 
         El correo ha sido enviado y el ID es ${res.messageId}`
        );
        Swal.fire(
          'Guardado!',
          'Le hemos enviado un correo para confirmar su cuenta!',
          'success'
        );
      },
      err => {
        this.spinnerService.hide();
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.spinnerService.hide();
        this.loading = false;
        this.buttionText = "Submit";
      }
    );

    }
}
