import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ArchivosSubidosComponent } from '../../archivos-subidos/archivos-subidos.component';
import { ArchivosSubidosService } from '../../../services/archivos-subidos.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {

  selectedFiles: FileList;
  imagenValida: boolean;
  //Es el array que contiene los  items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  message = '';
  fileName = "";
  fileInfos: Observable<any>;
  imagen="";


  form = this.fb.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    dataType: ['', Validators.required ],
    imageName: ['']
  });
  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private archivosSubidosService: ArchivosSubidosService) {
              private router: Router,
              private cd: ChangeDetectorRef,
              private httpClient: HttpClient) {
   }

   ngOnInit() {
    //this.fileInfos = this.archivosSubidosService.getFilePorNombre('zoom.png');

    const id = this.route.snapshot.params.id;
    console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        dataType: ['', Validators.required ],
        imageName: ['']
      });

      this.categoriaService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.dataType.setValue(data.dataType);
        this.form.controls.imageName.setValue(data.imageName);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }

  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
   // console.log(id);
    if (typeof id === 'undefined') {
      console.warn(this.form.value);
      peticion = this.categoriaService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron  los datos!',
          'success'
        );
        this.router.navigate(['/categoria/listar']);
      });
    } else {
      peticion = this.categoriaService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
        this.router.navigate(['/categoria/listar']);
      });
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

/*
      this.categoriaService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.dataType.setValue(data.dataType);
        this.form.controls.imageName.setValue(data.imageName);
       });

*/



}

