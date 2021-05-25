import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/servicios/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanActivate {

  constructor(
    public router: Router,
    private usuarioService: UsuarioService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('expiro?', this.usuarioService.getExpiracion());

      if ( this.usuarioService.getExpiracion() ) {
        Swal.fire('Error', 'Su sesión ha expirado...', 'error');
        this.router.navigateByUrl('/');
        return false;
      }

      return this.usuarioService.validaToken()
        .pipe(
          tap( estaAutenticado => {
            if ( !estaAutenticado ) {
              Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
              this.router.navigateByUrl('/');
            } 
          })
        );
  }
}
