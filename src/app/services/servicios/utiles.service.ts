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

    fotmatDecimales(x){
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

    

  }
