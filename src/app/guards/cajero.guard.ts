import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/servicios/usuario.service';
import { AutenticadoGuard } from './autenticado.guard';

@Injectable({
  providedIn: 'root'
})
export class CajeroGuard implements CanActivate {
  constructor(
    public router: Router,
    public autenticado: AutenticadoGuard,
    private usuarioService: UsuarioService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (JSON.parse(localStorage.getItem('usuario'))){
      console.log('autenticado');
        let roles: any[];
        roles = JSON.parse(localStorage.getItem('usuario') || ' ');
        let band = 0;
        
        for ( let i = 0; i < roles.length; i++) {
          console.log(roles[i].nombre)
          if (roles[i].nombre === 'ROLE_CAJERO' ||  roles[i].nombre === 'ROLE_ADMIN') {
            band = 1;
            break;
          }
        }
        
        if (band === 0 ) {
          Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
          this.router.navigateByUrl('/');
          return false;
        } else {
          console.log('Tiene rol cajero');
        }
        return true;
    } else {
      Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
      this.router.navigateByUrl('/');
      return false;
    }
  }
  
}
