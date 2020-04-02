import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: any = []
  constructor(private sds: SidebarService) { }

  ngOnInit() {  
    this.menu = this.sds.obtenerSideBar();
  }

}
