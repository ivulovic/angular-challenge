import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-body',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss']
})
export class TableBodyComponent implements OnInit {
  
  @Input() columns: any = [];
  @Input() rows: any = [];

  
  constructor() { }
  
  ngOnInit(): void {
  }

}
