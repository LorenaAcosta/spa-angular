
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ArchivosSubidosService } from 'src/app/services/archivos-subidos.service';

@Component({
  selector: 'app-archivos-subidos',
  templateUrl: './archivos-subidos.component.html',
  styleUrls: ['./archivos-subidos.component.scss']
})
export class ArchivosSubidosComponent implements OnInit {

  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = []
  message = '';
  fileName = "";
  fileInfos: Observable<any>;

  constructor(private archivosSubidosService: ArchivosSubidosService) { }

  ngOnInit(): void {
    this.fileInfos = this.archivosSubidosService.getFiles();
  }

  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let a:any;
      //a = this.upload(i, this.selectedFiles[i]);
      console.log(this.upload(i, this.selectedFiles[i]));
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

}

