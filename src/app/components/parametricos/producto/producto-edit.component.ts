import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/services/servicios/producto.service';
import { CategoriaService } from 'src/app/services/servicios/categoria.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UtilesService } from 'src/app/services/servicios/utiles.service';
import { ArchivosSubidosService } from 'src/app/services/archivos-subidos.service';
import { ImpuestoService } from 'src/app/services/servicios/impuesto.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})

export class  ProductoEditComponent implements OnInit {

  selectedFiles: FileList;
  imagenValida: boolean;
  //Es el array que contiene los  items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  message = '';
  fileName = "";
  fileInfos: Observable<any>;
  imagen="";
  costo : any;
  precioVenta: any;

  form = this.fb.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    costo: ['', Validators.required],
    precioVenta: ['', Validators.required],
    stockActual: ['', Validators.required],
    impuestoId: ['', Validators.required],
    imageName: [''],
    estado: ['', Validators.required]
  });
  productos: any[] = [];
  categorias: any[] = [];
  impuestos: any[] = [];
  public formSubmitted = false;

  constructor(private fb: FormBuilder,
              private productoService: ProductoService,
              private categoriaService: CategoriaService,
              private impuestoService: ImpuestoService,
              private route: ActivatedRoute,
              private archivosSubidosService: ArchivosSubidosService,
              private router: Router,
              private util: UtilesService ) {
                this.form = this.fb.group({
                  codigo: ['', Validators.required],
                  descripcion: ['', Validators.required],
                  costo: ['', Validators.required],
                  precioVenta: ['', Validators.required],
                  stockActual: ['', Validators.required],
                  categoriaId: ['', Validators.required],
                  impuestoId: ['', Validators.required],
                  imageName: [''],
                  estado: ['', Validators.required]
                });
    }

  ngOnInit() {
    this.categoriaService.obtenerPorTipo('producto').subscribe( (resp: any[]) =>  this.categorias = resp );
    this.impuestoService.listarRecurso().subscribe( (resp: any[]) =>  this.impuestos = resp );
    const id = this.route.snapshot.params.id;
   // console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        costo: ['', Validators.required],
        precioVenta: ['', Validators.required],
        stockActual: ['', Validators.required],
        categoriaId: ['', Validators.required],
        impuestoId: ['', Validators.required],
        imageName: [''],
        estado: [1]
      });
      this.productoService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.costo.setValue(data.costo);
        this.form.controls.precioVenta.setValue(data.precioVenta);
        this.form.controls.stockActual.setValue(data.stockActual);
        this.form.controls.categoriaId.setValue(data.categoriaId.categoriaId);
        this.form.controls.impuestoId.setValue(data.impuestoId.impuestoId);
        this.form.controls.imageName.setValue(data.imageName);
        this.form.controls.estado.setValue(data.estado);
       });
    }
  }

  guardar() {
    
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    console.log(id);
    console.log(typeof id);
    if (typeof id === 'undefined') {
      peticion = this.productoService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
        this.router.navigate(['/producto/listar']);
      });
    } else {
      peticion = this.productoService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
        this.router.navigate(['/producto/listar']);
      });
    }
  }

  campoNoValido(): boolean {
    if ((this.form.get('costo').value > this.form.get('precioVenta').value) && this.formSubmitted ) {
      this.formSubmitted = true;
      return true;
    } else {
      return false;
    }
  }



  /*subida de imagenes*/
  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
    this.imagenValida = false;
    //controlamos que el archivo sea una imagen
    if ( !(/\.(jpe?g|png|gif|bmp)$/i.test(this.fileName)) ) {
      console.log('error de imagen');
      this.imagenValida = true;
    }
    //this.imagen = "http://localhost:8084/api/files/" + this.fileName;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let fileUpload:any;
      fileUpload = this.upload(i, this.selectedFiles[i]);
      //this.form.controls.imageName.setValue( this.upload(i, this.selectedFiles[i]));
      this.form.controls.imageName.setValue(fileUpload);
      //this.imagen = "http://localhost:8084/api/files/" + fileUpload;
      this.imagen = fileUpload;
      console.log(this.imagen);
    }
  }

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.archivosSubidosService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.archivosSubidosService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
      return this.fileName;
  }

  deleteFile(filename: string) {
    this.archivosSubidosService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.archivosSubidosService.getFiles();
    });
  }

  getFilesPorNombre(filename: string){
    this.archivosSubidosService.getFilePorNombre(filename)
      .subscribe ((data : any ) => {
        this.form.controls.imageName.setValue(data.imageName);
      });
  }

  public onChange(event: any): void {
    /*if (this.form.controls.precioVenta.value < this.form.controls.costo.value) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1000
      })
    }*/
  }


}
  
