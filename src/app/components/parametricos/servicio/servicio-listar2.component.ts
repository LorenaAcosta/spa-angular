import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicios/servicio.service';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  /* timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }  */
});

@Component({
  selector: 'app-servicio-listar2',
  templateUrl: './servicio-listar2.component.html',
  styleUrls: ['./servicio-listar2.component.scss']
})
export class ServicioListar2Component implements OnInit {

  servicios: any[] = [];
  categorias: any[] = [];
  arrayList: any [] = [];
  index: 0;
  value: any;
  sum = 0;
  constructor(private categoriaService: CategoriaService,
              private servicioService: ServicioService,
              private route: ActivatedRoute) {
               }

  ngOnInit(): void {
    /*Mostrar categorias arriba */
    this.categoriaService.obtenerPorTipo('servicio')
    .subscribe( (resp: any[]) =>  this.categorias = resp );
    /*Mostrar los servicios */
    const id = this.route.snapshot.params.id;
    if (typeof id !== 'undefined') {
    /* this.servicioService.listarRecursoPorCategoria(id)
     .subscribe( (resp: any[]) =>  this.servicios = resp );
     } */


    // Parse the serialized data back into an aray of objects
    this.arrayList = JSON.parse(localStorage.getItem('items')) || [];
    // this.sumar();
  }



}


recargar(id: any) {
  /* this.servicioService.listarRecursoPorCategoria(id)
   .subscribe( (resp: any[]) =>  this.servicios = resp ); */
 }
addItem(item: any) {
  // Push the new data (whether it be an object or anything else) onto the array
  this.arrayList.push(item);
  // Alert the array value
  // console.log(this.arrayList );  // Should be something like [Object array]

  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('items', JSON.stringify(this.arrayList));
  // console.log(this.arrayList);
  Toast.fire({
    icon: 'success',
    title: 'Tratamiento Añadido'
  });
 // this.sumar();
}
eraseItem(idToRemove: any) {
  this.arrayList.splice(idToRemove, 1);
  this.sumar();
}


sumar() {
  this.sum = 0;
  this.value =  this.arrayList;
  for ( let j = 0; j < this.arrayList.length; j++) {
       this.sum +=  this.value[j].costo;
       console.log(this.value[j].costo);
       }
}


}
