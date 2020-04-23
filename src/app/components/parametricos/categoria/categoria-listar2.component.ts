import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';

@Component({
  selector: 'app-categoria-listar2',
  templateUrl: './categoria-listar2.component.html',
  styleUrls: ['./categoria-listar2.component.scss']
})
export class CategoriaListar2Component implements OnInit {

  categorias: any[] = [];
  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.listarRecurso()
    .subscribe( (resp: any[]) =>  this.categorias = resp  );
  }

}
