import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class UtilesService {

    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    cortarString(cadena, inicio, longitud){
      return cadena.substr(inicio , longitud);
    }

    getFechaCalendar(model){
      return (model.year + '-' + model.month + '-' + model.day as string);
    }

    

  }
