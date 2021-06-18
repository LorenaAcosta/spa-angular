import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbDatepickerConfig, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from 'src/app/services/servicios/horario.service';

import { ReservaService } from 'src/app/services/servicios/reserva.service';
import { Time } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { DisponibleService } from '../../../services/servicios/disponibilidad.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { EmpleadoService } from 'src/app/services/servicios/empleado.service';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { BoxesService } from 'src/app/services/servicios/boxes.service';
import { HttpService } from 'src/app/services/servicios/http.service';
import { UsuarioService } from '../../../services/servicios/usuario.service';
import { SendMailService } from 'src/app/services/servicios/send-mail.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from 'src/app/services/servicios/cliente.service';
import { NavbarService } from '../../../shared/navbar/navbar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  disponibleId: number;
  disponible: any;
  empleadoId: any;
  servicioId: number;
  horario: [];
  clientes: any;
  box: any;
  selectedDate: any = null;
  categoriaId:any;
  //model: NgbDateStruct;
  private _model: NgbDate;
  date: {year: number, month: number, day: number};
  turnosArray: any[] = [];
  selectedOption: string = null;
  printedOption: string;
  /*---correo---*/
  loading: any;
  buttionText: any;
  asuntoCorreo: any = '¡Reserva registrada!';
  cuerpoCorreo: any = '';
  /*---modal cliente---*/
  usuario: any;
  usuarioLogueado: any;
  closeResult: string;
  usuarioPerfil: any;
  logueado: boolean = false;
  cedula: any;
  /*-----------filtrado de clientes---- */
public placeholder: string = 'Buscar';
public keyword = 'cedula';
public historyHeading: string = 'Seleccionados recientemente';
/***************Menus para login**************** */
menuItems: any[] = [];
menuCliente: any[] = [];
menuCajero: any[] = [];
menuRecepcion: any[] = [];
menuAdmin: any[] = [];

public formSubmitted = false;

public loginForm = this.fb.group({
  username: [localStorage.getItem('username') || '', Validators.required],
  password: ['', [ Validators.required, Validators.minLength(3) ]],
  remember: [false]
});

public registerForm = this.fb.group({
  nombre: ['', Validators.required],
  apellido: ['', Validators.required],
  cedula: ['', Validators.required],
  fechaNac: ['', Validators.required],
  sexo: ['', Validators.required],
  telefono: ['', Validators.required],
  nacionalidad: [''],
  ciudad: [''],
  direccion: [''],
  ruc: [''],
  username: ['', Validators.required],
  email: ['', Validators.compose([
    Validators.required,
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' + '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
  password: ['', [ Validators.minLength(3), Validators.required ]],
  password2: ['', [ Validators.minLength(3), Validators.required ]],
  enabled: true,
});

get username() { return this.registerForm.get('username'); }
get password() { return this.registerForm.get('password'); }
get password2() { return this.registerForm.get('password2'); }


admin: any;

  disabledDates:NgbDateStruct[]=[
    {year:2021,month:4,day:26}, {year:2021,month:4,day:20}
  ]

//  disabledDates:NgbDateStruct[]=[]

  form = this.fb.group({
    empleado: ['', Validators.required],
    fechaReserva: ['', Validators.required],
    hora: ['', Validators.required],
    disponibleId: ['',Validators.required],
    usuarioId: ['', Validators.required],
    estado: ['pendiente', Validators.required],
    disponibleBoxesId:['',Validators.required]
  });

  minDate = undefined;


  horarioEmpleado = []

  constructor(private fb: FormBuilder,
              private navbarService: NavbarService,
              private router: Router,
              private modalService:   NgbModal,
              private fbc: FormBuilder,
              private clienteService: ClienteService,
              public http: HttpService,
              private calendar: NgbCalendar,
              private usuarioService: UsuarioService,
              private config: NgbDatepickerConfig,
              private route: ActivatedRoute,
              private horarioService: HorarioService,
              private boxesService: BoxesService,
              private reservaService: ReservaService,
              private sendmailService: SendMailService,
              private empleadoService: EmpleadoService ,
              private spinnerService: NgxSpinnerService,
              private disponibleService: DisponibleService,
              public util: UtilesService ) {
               //deshabilita los dias desde HOY hacia atras 
                const current = new Date();
                this.minDate = {
                  year: current.getFullYear(),
                  month: current.getMonth() + 1,
                  day: current.getDate()
                };

                this.formCliente = this.fbc.group({
                  nombre: ['', Validators.required],
                  username: ['', Validators.required],
                  apellido: ['', Validators.required],
                  email: ['', Validators.required],
                  cedula: ['', Validators.required],
                  ruc: [''],
                  telefono: ['', Validators.required],
                  sexo: ['', Validators.required],
                  estado: [1]
                });
  }

  
  weekDays = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    0: 'Domingo'
  }

  formCliente = this.fbc.group({
    nombre: ['', Validators.required],
    username: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    cedula: ['', Validators.required],
    ruc: [''],
    telefono: ['', Validators.required],
    sexo: ['', Validators.required],
    estado: [1]
    });

  get correo() { return this.formCliente.get('email'); }
  get telefono() { return this.formCliente.get('telefono'); }


  ngOnInit(): void {

    if(localStorage.getItem('admin') == 'true'){
      this.admin = true;
    } else{
      this.admin = false;
    }

    this.agendar2();
    this.usuario = this.usuarioService.obtenerUsuarioLogueado();
    if (this.usuarioService.obtenerUsuarioLogueado()){
      this.logueado = true;
    }else{
      this.logueado = false;
    }

    console.log(this.http.test);

    /* Obtiene el objeto disponible { disponible_id} */
    this.disponibleId = this.route.snapshot.params.id;
    this.disponibleService.getDatosRecurso(this.disponibleId)
     .subscribe( (resp: any) =>  {
       this.disponible = resp.disponible.disponibleId;
       this.empleadoId = resp.disponible.empleadoId.empleadoId;
       this.servicioId =  resp.disponible.servicioId.servicioId;
       this.categoriaId =  resp.disponible.servicioId.categoriaId.categoriaId;
       const array  = resp.horario;
       this.horario = resp.horario;

       for (let index = 0; index < array.length; index++) {
         const element:any = array[index];
         this.horarioEmpleado.push(parseInt(element.diaTrabajo, 10));  //{1,3,0}
       }
       this.selectToday();
     });

     this.clienteService.listarRecurso()
     .subscribe( (resp: any) =>  {
       this.clientes = resp ; 
     });

  }



  isDisabled=(date:NgbDateStruct, current: {day:number, month: number,year:number})=> {
      //in current we have the month and the year actual
      if(this.horarioEmpleado.length == 0) return false;
      const fecha = new Date( date.year, date.month-1,date.day )
      const dia_semana = fecha.getDay(); //0,1,2,3,4,5,6,7
     // const dia_encontrado = this.disabledDates.find(x=>new NgbDate(x.year,x.month,x.day).equals(date))?true:false;
      const e = this.horarioEmpleado.find(val=> val == dia_semana); //3, 
      return  typeof e == 'undefined' ? true:false   
  }





  
  selectedDay: string = '';
  set model(val) {
    this._model = val;
    this.selectedDay = this.weekDays[this.calendar.getWeekday(this.model)]
  }
  
  get model() {
    return this._model;
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }


  agendar() {
    
    this.spinnerService.show()
    if (!this.usuarioService.obtenerUsuarioLogueado()){
      console.log('no está logueado');
      Swal.fire(
        'Atención!',
        'Debe iniciar sesión para continuar!',
        'info'
        );
      this.router.navigateByUrl('/login');
      return false;
    }
    this.printedOption = this.selectedOption;
    this.form.controls.empleado.setValue( this.empleadoId);
    this.form.controls.fechaReserva.setValue( this.selectedDate );
    this.form.controls.hora.setValue(this.selectedOption.toString().substr(-20, 5));
    this.form.controls.disponibleId.setValue(Number(this.disponibleId));
    if (this.admin !== true ){
      this.form.controls.usuarioId.setValue(this.usuarioService.obtenerUsuarioLogueado());
    }else {
      this.form.controls.estado.setValue('confirmado');
    }

    
    
    //setear el box -> disponibilidadBoxId
    let peticion: Observable<any>;
    peticion = this.boxesService.obtenerUnBoxLibre(this.selectedDate, this.selectedOption.toString().substr(-20, 5), 
    this.servicioId); //veo todos los boxes que ya se usaron en esa fecha y hora con el servicio
    peticion.subscribe((result: any) =>  {
      this.box = result;
      console.log(result);
      if (result!=0){
        //SE GRABA LA RESERVA
        this.form.controls.disponibleBoxesId.setValue(this.box);
        console.log(this.form);
        peticion = this.reservaService.agregarRecurso(this.form.value);
        peticion.subscribe((result: any) =>  {

            let r = result;
            this.reservaService.getRecurso(r.reservaId)
            .subscribe((r:any)=> {
              let data = r;
              let servicio = data.disponibleId.servicioId.descripcion;
              let fecha = data.fechaReserva;
              let hora = data.hora;
              let terapista = data.disponibleId.empleadoId.nombre + ' ' + data.disponibleId.empleadoId.apellido;
              console.log('servicio', servicio);
  
              this.usuarioService.obtenerPerfilUsuario(this.usuarioService.obtenerUsuarioLogueado())
              .subscribe((resp: any) =>  {
                let us = resp;  
                this.cuerpoCorreo = '<html><head><style>table{font-family: arial, sans-serif;border-collapse:collapse;width: 100%;} td,th{border: 1px solid #dddddd; text-align: left;  padding: 8px;} tr{background-color:#D1ECF1;} tr:nth-child(even) {background-color:#FFFFFF;}</style></head><body><h3>Su reserva se ha registrado exitosamente segun el siguiente detalle:</h3><br><table><tr><th>Servicio</th><th>Fecha</th>    <th>Hora</th>    <th>Terapista</th>  </tr><tr><td>' + servicio +'</td><td>' + fecha +'</td><td>' + hora +'</td><td>' + terapista +'</td></tr></table></body><br><div>Katthy Spa S.A.<br>10 DE AGOSTO Y GRAL. CABALLERO<br>TELEFONO 021-498-690<br>SAN LORENZO - PARAGUAY</div></html>';
                if (this.admin !== true ){
                  this.mandarCorreo((us.nombre + ' ' + us.apellido), us.email, this.asuntoCorreo, this.cuerpoCorreo);
                } else {
                  this.spinnerService.hide();
                  Swal.fire(
                    'Reserva Confirmada!',
                    'Se guardaron  los datos!',
                    'success'
                    );
                    this.router.navigateByUrl('booking/categorias');
                  
                }
                
              });

            });

          });

      
        } else{
          this.spinnerService.hide();
        Swal.fire(
          'Lo siento!',
          'No hay lugar disponible para este horario!',
          'error'
          );
        }
      });
    
  }




  getHorariosDisponibles() {
      this.selectedDate = Date(); 
      this.selectedDate = ( this.model.year + '-' + this.model.month + '-' + this.model.day as string);
      console.log(this.selectedDate);
      console.log(this.disponible);
  
      this.disponibleService.getHorasDisponibles(this.categoriaId,this.servicioId,this.empleadoId,
        this.selectedDate)
      .subscribe( (resp: any) =>  {
          localStorage.setItem("horasDisponibles", JSON.stringify(resp));
          this.turnosArray = JSON.parse(localStorage.getItem("horasDisponibles"));
          console.log(this.turnosArray);
          console.log(this.turnosArray[0]); //{[0]=null};
        });
  }

  mandarCorreo(nombreUsuario, correo, asunto, cuerpo){
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: nombreUsuario,
      email: correo,
      subject: asunto,
      html: cuerpo
    }
    this.sendmailService.sendEmail(user).subscribe(
      data => {
        this.spinnerService.hide();
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} 
         El correo ha sido enviado y el ID es ${res.messageId}`
        );
        Swal.fire(
          'Reserva Confirmada!',
          'Se guardaron  los datos!',
          'success'
          );
          this.router.navigateByUrl('booking/categorias');
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

  validaBotonAgendar(){
    if (this.selectedOption == null || this.selectedOption == '...' || this.selectedOption == '' ){
      return true;
    }else{
      if (this.admin === true && (this.form.controls.usuarioId.value === '')){
        return true;
      }
      return false;
    }
  }

  validaHoraNoNula(){
    if (this.selectedDate != null && (this.selectedOption == null || this.selectedOption == '...' || this.selectedOption == '')){
      return true;
    }else{
      return false;
    }
  }

  agendar2(){
    if (this.usuarioService.obtenerUsuarioLogueado()){
    this.usuarioService.obtenerPerfilUsuario(this.usuarioService.obtenerUsuarioLogueado())
    .subscribe((resp:any) =>{
      this.usuarioLogueado = resp;
      this.cedula = this.usuarioLogueado.cedula
      if (this.usuarioLogueado.cedula == null || this.usuarioLogueado.cedula == '' || this.usuarioLogueado.cedula == 'undefined'){
        return true;
      }else{
        return false;
      }
    });
    }
  }
  


  /*-----------modal para cliente--------------------*/
  open(content) {
    if(this.usuarioService.obtenerUsuarioLogueado()){
      //cargar los datos del usuario
      this.usuarioService.obtenerPerfilUsuario(this.usuarioService.obtenerUsuarioLogueado())
      .subscribe( (resp: any[]) => {
         this.usuarioPerfil = resp,
         this.formCliente.controls.username.setValue(this.usuarioPerfil.username);
         this.formCliente.controls.nombre.setValue(this.usuarioPerfil.nombre);
         this.formCliente.controls.apellido.setValue(this.usuarioPerfil.apellido);
         this.formCliente.controls.email.setValue(this.usuarioPerfil.email);
         this.formCliente.controls.cedula.setValue(this.usuarioPerfil.cedula);
         this.formCliente.controls.ruc.setValue(this.usuarioPerfil.ruc);
         this.formCliente.controls.telefono.setValue(this.usuarioPerfil.telefono);
         this.formCliente.controls.sexo.setValue(this.usuarioPerfil.sexo);
         this.formCliente.controls.estado.setValue(this.usuarioPerfil.estado);
      });;
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      Swal.fire('Error', 'No tiene permisos para acceder a esta pagina...', 'error');
      this.router.navigateByUrl('/');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  guardarCliente() {
    // console.warn(this.form.value);
      const id = this.usuarioService.obtenerUsuarioLogueado();
      let peticion: Observable<any>;
      console.log(this.formCliente.value)
         peticion = this.clienteService.modificarRecurso(this.formCliente.value, id);
         peticion.subscribe((result: any) =>  {
           Swal.fire(
             'Guardado!',
             'Se actualizaron los datos!',
             'success'
           );
           this.ngOnInit();
         });
         this.modalService.dismissAll();
  }

    //filtrosClientes
    submitReactiveForm() {
      if (this.form.valid) {
        console.log(this.form.value);
      }
    }

    filtroCedula(){
      this.keyword = 'cedula'
    }
    filtroNombre(){
      this.keyword = 'nombres'
    }
    filtroRuc(){
      this.keyword = 'ruc'
    }

    open2(content) {
      this.modalService.dismissAll();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    open3(content) {
      this.modalService.dismissAll();
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    
/************************Login************************************ */  
  login() {
    this.spinnerService.show();
    this.usuarioService.login( this.loginForm.value)
    .subscribe( resp => {
      this.spinnerService.hide();
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('username', this.loginForm.get('username').value);
      } else {
        localStorage.removeItem('username');
      }
      
      let roles: any[];
      roles = JSON.parse(localStorage.getItem('usuario')) || ' ';
      let band:any = null;
      localStorage.setItem('admin', 'false');
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < roles.length; i++) {
          console.log(roles[i]);
          if (roles[i].nombre === 'ROLE_ADMIN') {
            localStorage.setItem('admin', 'true');
            this.menuAdmin = this.navbarService.menu;
            console.log(this.menuItems);
            break;
          }
          if (roles[i].nombre === 'ROLE_CLIENTE') {
            this.menuCliente = this.navbarService.menu1;
            console.log(this.menuCliente);
          }
          if (roles[i].nombre === 'ROLE_CAJERO') {
            this.menuCajero = this.navbarService.menuCaja;
            console.log(this.menuCajero);
          }
          if (roles[i].nombre === 'ROLE_RECEPCION') {
            this.menuRecepcion = this.navbarService.menuRecepcion;
            console.log(this.menuRecepcion);
          }
      }
      //se concatena los menus en caso de tener mas de un rol
      this.menuItems = [].concat(this.menuCliente, this.menuCajero, this.menuAdmin, this.menuRecepcion);
      console.log(this.menuItems, this.menuItems.length);
      this.loginForm.reset(this.loginForm.controls.username );
      this.loginForm.reset(this.loginForm.controls.password );
    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
      Swal.fire('Error', err.error.error === 'invalid_grant' || 'unauthorized' ? 'Usuario o contraseña incorrectos' : ' ', 'error');
    });

    this.modalService.dismissAll();
  }
  /************************************************************************************* */

  /************************Registro******************************************************************* */
  crearUsuario(content) {
    this.spinnerService.show();
    let usuarioId;
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      this.spinnerService.hide();
      console.log('no anda');
      return;
    }

    this.registerForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.username.setValue(this.registerForm.controls.username.value.toLowerCase());
    this.loginForm.controls.password.setValue(this.registerForm.controls.password.value);


    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( (resp:any) => {

        usuarioId = resp.usuarioId;
        console.log('usuario creado')
        this.usuarioService.asignarRol(usuarioId, 2 )
        .subscribe( (resp:any) => {});
        /*-----------generar token de confirmacion------*/
        //console.log('login', this.loginForm.value)
        this.usuarioService.confirmacionUsuario(this.loginForm.value).subscribe((r:any) => {
          //this.spinnerService.hide();
          let valor = false;
          this.usuarioService.modificarRecurso(valor, usuarioId).subscribe((resp:any) => {
            //console.log(resp);
          });
        });
        /*-----------------------------------------------*/
        //limpiar login form
        this.loginForm.reset(this.loginForm.controls.username );
        this.loginForm.reset(this.loginForm.controls.password );
        //limpiar register form
        this.registerForm.reset(this.registerForm.controls.nombre );
        this.registerForm.reset(this.registerForm.controls.apellido );
        this.registerForm.reset(this.registerForm.controls.cedula );
        this.registerForm.reset(this.registerForm.controls.fechaNac );
        this.registerForm.reset(this.registerForm.controls.sexo );
        this.registerForm.reset(this.registerForm.controls.telefono );
        this.registerForm.reset(this.registerForm.controls.nacionalidad );
        this.registerForm.reset(this.registerForm.controls.cedula );
        this.registerForm.reset(this.registerForm.controls.direccion );
        this.registerForm.reset(this.registerForm.controls.ruc );
        this.registerForm.reset(this.registerForm.controls.username );
        this.registerForm.reset(this.registerForm.controls.email );
        this.registerForm.reset(this.registerForm.controls.password );
        this.registerForm.reset(this.registerForm.controls.password2 );
        this.modalService.dismissAll();
        this.open2(content);

      }, (err) => {
        console.log(err);
        this.spinnerService.hide();
        Swal.fire('Error', err.error, 'error');
      });
  }

  campoNoValido( campo: string ): boolean {
    if (this.registerForm.get(campo).invalid && (this.registerForm.get(campo).touched || this.registerForm.get(campo).dirty)) {
      return true;
    } else {
      return false;
    }
  }

  campoNoValidoSexo( campo: string ): boolean {
    if (this.registerForm.get(campo).invalid && (this.registerForm.get(campo).touched || this.registerForm.get(campo).dirty) || ((this.registerForm.get('username').touched) && this.registerForm.get(campo).invalid)) {
      return true;
    } else {
      return false;
    }
  }

  userNoValido() {
    const user = this.registerForm.get('username').value;
    if (user.length < 3 && (this.username.touched || this.username.dirty) ) {
      return true;
    } else {
      return false;
    }
  }

  passwordNoValido() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if (pass1.length < 3 && (this.password.touched || this.password.dirty) ) {
      return true;
    } else {
      return false;
    }
  }
  passwordIguales() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ( pass1 !== pass2 && (this.password2.touched || this.password2.dirty) ) {
      return true;
    } else {
      return false;
    }
  }


}



