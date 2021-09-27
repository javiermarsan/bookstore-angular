import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// https://www.primefaces.org/primeng/#/table

@Component({
  selector: 'jm-table-query',
  templateUrl: './table-query.component.html'
})
export class TableQueryComponent implements OnInit {

  @Input() data: any[];
  @Input() cols: any[];
  @Input() title: string;
  @Input() hasDelete = true;
  @Input() hasFilters = true;

  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  edit(row: any) {
    this.onEdit.emit(row);
  }

  delete(row: any) {
    this.onDelete.emit(row);
  }
}
