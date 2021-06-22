import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/services/servicios/carrito.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/servicios/usuario.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  constructor(public utilService: UtilesService, private router: Router, private fb: FormBuilder
    , private carritoService: CarritoService,
      private usuarioService: UsuarioService
    ) { }

  carrito: Producto[] = [];
  subtotal: number;
  total: number = 0;
  
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

    this.actualizarTotal();
    
  }

  actualizarTotal(){
    this.total = 0;
    for (let cat of this.carrito) {
      this.total =  this.total + cat.subtotal;
    }
  }

  incrementar(productoId:number){
    this.carrito[productoId].cant=  this.carrito[productoId].cant + 1;
    this.carrito[productoId].subtotal=  this.carrito[productoId].cant * this.carrito[productoId].precio ;
    //this.total = this.total + (this.carrito[productoId].cant * this.carrito[productoId].precio);
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));
    this.actualizarTotal();
  }

  disminuir(productoId:number){
    this.carrito[productoId].cant=  this.carrito[productoId].cant - 1;
    this.carrito[productoId].subtotal=  this.carrito[productoId].cant * this.carrito[productoId].precio ;
    //this.total = this.total - (this.carrito[productoId].cant * this.carrito[productoId].precio);
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));
    this.actualizarTotal();
  }
  borrar(pos:number){
    this.carrito.splice(pos, 1);
    localStorage.setItem('carrito',  JSON.stringify(this.carrito));
    //sessionStorage.removeItem(this.carrito[productoId]); 
  }

  vaciar(){
    localStorage.removeItem('carrito');
    //this.ngOnInit();
    this.router.navigate(['/']);
  }


  guardar() {
    this.carrito = JSON.parse(localStorage.getItem("carrito"));
    for (let car of this.carrito) {
      this.form.controls.productoId.setValue(car.productoId);
      this.form.controls.nombre.setValue(car.nombre);
      this.form.controls.cant.setValue(car.cant);
      this.form.controls.subtotal.setValue(car.subtotal);
      this.form.controls.usuarioId.setValue(this.usuarioService.obtenerUsuarioLogueado());
    
      let peticion: Observable<any>;
        console.warn(this.form.value);
        peticion = this.carritoService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {
          localStorage.removeItem('carrito');
        });
      } 
      Swal.fire(
        'Guardado!',
        'Su pedido ha sido guardado!',
        'success'
      );
      this.router.navigate(['/pedidos/listar']);
    }


  }


export class Producto {
  constructor(public productoId: number, public nombre: String, public cant: number, public precio: number, public subtotal: number) {
  }
}