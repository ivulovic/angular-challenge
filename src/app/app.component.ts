import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { login } from './app.actions';
import { selectIsLoggedIn } from './app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean> = of(false);
  
  constructor(private store: Store<any>){
  }
  
  ngOnInit(): void{
    this.isLoggedIn = this.store.select(selectIsLoggedIn);
  }
  
  login(){
    localStorage.setItem("isLoggedIn", "true");
    this.store.dispatch(login());
  }
}
