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

}



