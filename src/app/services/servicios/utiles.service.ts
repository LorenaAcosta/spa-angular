import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class UtilesService {

    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    numberWithDash(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '-');
    }

    cortarString(cadena, inicio, longitud){
      return cadena.substr(inicio , longitud);
    }

    getFechaCalendar(model){
      return (model.year + '-' + model.month + '-' + model.day as string);
    }

    formatDecimales(x){
      x = x.toFixed(2);
      return x;
    }

    getDayOfTheWeek(day){
      if (day == 1) return "Lunes";
      if (day == 2) return "Martes";
      if (day == 3) return "Miércoles";
      if (day == 4) return "Jueves";
      if (day == 5) return "Viernes";
      if (day == 6) return "Sábado";
      if (day == 0) return "Domingo";
    }

    getMonth(cod){
      if (cod == 1) return "ENERO";
      if (cod == 2) return "FEBRERO";
      if (cod == 3) return "MARZO";
      if (cod == 4) return "ABRIL";
      if (cod == 5) return "MAYO";
      if (cod == 6) return "JUNIO";
      if (cod == 7) return "JULIO";
      if (cod == 8) return "AGOSTO";
      if (cod == 9) return "SEPTIEMBRE";
      if (cod == 10) return "OCTUBRE";
      if (cod == 11) return "NOVIEMBRE";
      if (cod ==12) return "DICIEMBRE";
    }

    

  }
