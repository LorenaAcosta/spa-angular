import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, RouteReuseStrategy, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public router: Router,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // tslint:disable-next-line: prefer-const
    let roles: any[];
    let band = 0;
    if (localStorage.getItem('usuario')){
      roles = JSON.parse(localStorage.getItem('usuario') || '');
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < roles.length; i++) {
        console.log(roles[i].nombre)
        if (roles[i].nombre === 'ROLE_ADMIN') {
          band = 1;
          break;
        }
      }
      if (band === 0 ) {
        Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
        this.router.navigateByUrl('/');
        return false;
      } else {
        return true;
        console.log('Tiene rol admin');
      }
    } else {
      Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
