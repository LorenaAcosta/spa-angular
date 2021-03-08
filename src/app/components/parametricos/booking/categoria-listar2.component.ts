import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';

@Component({
  selector: 'app-categoria-listar2',
  templateUrl: './categoria-listar2.component.html',
  styleUrls: ['./categoria-listar2.component.scss']
})
export class CategoriaListar2Component implements OnInit {

  categorias: any[] = [];
  urlImagen: string = 'http://localhost:8084/api/files/';
  constructor(private categoriaService: CategoriaService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.obtenerPorTipo('servicio')
    .subscribe( (resp: any[]) =>  this.categorias = resp  );
  }

  btnClick() {
    this.router.navigateByUrl('booking/servicios');
  }

}
