import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CarritoCabeceraService } from 'src/app/services/servicios/carrito-cabecera.service';
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
  ordenid: any;

  constructor(public utilService: UtilesService, private router: Router, private fb: FormBuilder
    , private carritoService: CarritoService,private carritoCabeceraService: CarritoCabeceraService,
      private usuarioService: UsuarioService
    ) { }

  carrito: Producto[] = [];
  subtotal: number;
  total: number = 0;
  fechaActual: number = Date.now();
  currentDate: number = Date.now();
  form = this.fb.group({
    cant: ['', Validators.required],
    nombre: ['', Validators.required],
    ordenId: ['', Validators.required],
    productoId: ['', Validators.required],
    subtotal: ['', Validators.required]
  });
  form1 = this.fb.group({
    orden: ['', Validators.required],
    fecha: ['', Validators.required],
    total: ['', Validators.required],
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
    this.actualizarTotal();
    //sessionStorage.removeItem(this.carrito[productoId]); 
  }

  vaciar(){
    localStorage.removeItem('carrito');
    //this.ngOnInit();
    this.router.navigate(['/']);
  }


  guardar() {
    let peticion: Observable<any>;
    let orden : number =0;
    Swal.fire({
      title: 'Desea confirmar su orden ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar!'
      }).then((result) => {

        if (result.value) {
          
      this.carritoCabeceraService.getMaxId().subscribe ((data : number ) => {
          orden = data;

      this.form1.controls.orden.setValue(orden);
      this.form1.controls.fecha.setValue(this.fechaActual);
      this.form1.controls.total.setValue(this.total);
      this.form1.controls.usuarioId.setValue(this.usuarioService.obtenerUsuarioLogueado());

      peticion = this.carritoCabeceraService.agregarRecurso(this.form1.value);
      peticion.subscribe((result: any) =>  {
        this.ordenid = result.carrito.carritoCabeceraId; //7
        console.log(this.ordenid);

        for (let car of Object.keys(this.carrito ) ) {
          this.form.controls.cant.setValue( this.carrito[car].cant);
          this.form.controls.nombre.setValue(this.carrito[car].nombre);
          this.form.controls.ordenId.setValue( this.ordenid );
          this.form.controls.productoId.setValue (this.carrito[car].productoId);
          this.form.controls.subtotal.setValue( this.carrito[car].subtotal);

          let peticion2: Observable<any>;
          console.warn(this.form.value);
          peticion2 = this.carritoService.agregarRecurso(this.form.value);
          peticion2.subscribe((result: any) =>  {
          
          });
        } 
      });
    });

    Swal.fire(
      'Pedido confirmado!',
      'Muchas gracias!'
    );

    this.vaciar();
    this.router.navigate(['/']);
     
        }
      });

     
    }


  }


export class Producto {
  constructor(public productoId: number, public nombre: String, public cant: number, public precio: number, public subtotal: number) {
  }
}