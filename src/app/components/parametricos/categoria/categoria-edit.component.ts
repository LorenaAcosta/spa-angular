import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/servicios/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {

  form = this.fb.group({
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    dataType: ['', Validators.required ]
  });

  SelectedFile: File = null;

  title = 'ImageUploaderFrontEnd';

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;


  constructor(private fb: FormBuilder,
              private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private httpClient: HttpClient) {
   }



   ngOnInit() {
    const id = this.route.snapshot.params.id;
    console.log(id);
    if (typeof id !== 'undefined') {
      this.form = this.fb.group({
        codigo: ['', Validators.required],
        descripcion: ['', Validators.required],
        dataType: ['', Validators.required ]
      });

      this.categoriaService.getRecurso(id)
       .subscribe ((data: any) => {
        this.form.controls.codigo.setValue(data.codigo);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.dataType.setValue(data.dataType);
       });
    }
  }

  ver() {
    console.warn(this.form.value);
  }


  guardar() {
    const id = this.route.snapshot.params.id;
    let peticion: Observable<any>;
    console.log(id);
    console.log(this.form.value);

  //  this.createUploadImage();
  //  console.log(this.form.value);

    if (typeof id === 'undefined') {
      console.warn(this.form.value);
      peticion = this.categoriaService.agregarRecurso(this.form.value);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se guardaron  los datos!',
          'success'
        );
      });
    } else {
      peticion = this.categoriaService.modificarRecurso(this.form.value, id);
      peticion.subscribe((result: any) =>  {
        Swal.fire(
          'Guardado!',
          'Se actualizaron los datos!',
          'success'
        );
      });
    }
  }

  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
   };
 }
 // This part is for uploading
 onUpload() {
  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

  this.httpClient.post('http://localhost:8084/api/categoria/upload', uploadData)
  .subscribe(
               res => {console.log(res);
                       this.receivedImageData = res;
                       this.base64Data = this.receivedImageData.imageName;
                       this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
               err => console.log('Error Occured duringng saving: ' + err)
            );
 }

}
