import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/services/servicios/carrito.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(private utilService: UtilesService, private router: Router, private fb: FormBuilder
    , private carritoService: CarritoService) { }

  carrito: Producto[] = [];
  subtotal: number;
  total: number;
  
  form = this.fb.group({
    productoId: ['', Validators.required],
    nombre: ['', Validators.required],
    cant: ['', Validators.required],
    subtotal: ['', Validators.required],
    usuarioId: ['', Validators.required]
  });

  ngOnInit(): void {

    this.carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(this.carrito);


    for (let cat of this.carrito) {
         this.total =  this.total + cat.subtotal;
    }
  
    
  }

  incrementar(productoId:number){
    this.carrito[productoId].cant=  this.carrito[productoId].cant + 1;
    this.carrito[productoId].subtotal=  this.carrito[productoId].cant * this.carrito[productoId].precio ;
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));

  }
  disminuir(productoId:number){
    this.carrito[productoId].cant=  this.carrito[productoId].cant - 1;
    this.carrito[productoId].subtotal=  this.carrito[productoId].cant * this.carrito[productoId].precio ;
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));
  }
  borrar(pos:number){
    this.carrito.splice(pos, 1);
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));
    //sessionStorage.removeItem(this.carrito[productoId]); 
  }

  vaciar(){
    localStorage.removeItem('carrito');
    this.router.navigate(['/pedidos']);
  }


  guardar() {
    let peticion: Observable<any>;




 
      console.warn(this.form.value);
      peticion = this.carritoService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Su pedido ha sido guardado!',
          'success'
        );
        this.router.navigate(['/categoria/listar']);
      });
    } 
  }


export class Producto {
  constructor(public productoId: number, public nombre: String, public cant: number, public precio: number, public subtotal: number) {
  }
}