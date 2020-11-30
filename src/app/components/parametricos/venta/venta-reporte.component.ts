import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DetalleVentaService } from 'src/app/services/servicios/detalles-venta.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


export class Ranking {
  constructor(public cantidad: number, public producto: string, public total: number) {
  }
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-venta-reporte',
  templateUrl: './venta-reporte.component.html',
  styleUrls: ['./venta-reporte.component.scss']
})
export class VentaReporteComponent implements OnInit { 
  displayedColumns: string[] = ['cantidad', 'producto', 'total'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = null;
  datos: Ranking[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private ventaDetalleService: DetalleVentaService,
  ) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);


    this.dataSource = new MatTableDataSource(this.datos);
  }
  ngOnInit(): void {
    this.ventaDetalleService.getRankingProductos()
    .subscribe( (resp: any) =>  {
        for (let d of resp){
          this.datos.push(new Ranking(d.max, d.producto, d.total));
          this.dataSource = new MatTableDataSource(this.datos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
    } );


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

