import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isLoggedIn: boolean | null = false;
  @Output() onLogin = new EventEmitter();

  constructor(private router: Router) { }

  navigateTo(path: Array<string>) {
    this.router.navigate(path);
  }

  onClickHandler(e: MouseEvent){
    this.onLogin.emit();
  }
  
  ngOnInit(): void {
  }

}
