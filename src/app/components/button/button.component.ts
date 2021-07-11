import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title!: string;
  @Input() type: 'error' | 'primary' = 'primary';
  @Output() onClick = new EventEmitter<MouseEvent>();


  public onClickHandler(event: MouseEvent): void{
    this.onClick.emit(event);
  }
  ngOnInit(): void {
  }

}
