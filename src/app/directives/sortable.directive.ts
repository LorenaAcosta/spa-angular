import {Directive, EventEmitter, Input, Output, HostBinding, HostListener} from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}


@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableHeader {

    constructor() { }

  sortable: string;
  @HostBinding('class.asc')  direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostListener('click')rotate() {
    
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }

}
