import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeService } from './pages/home/home.service';
import { BaseHttpService } from './core/services/BaseHttpService';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { TableBodyComponent } from './components/table/table-body/table-body.component';
import { DetailsService } from './pages/details/details.service';
import { StoreModule } from '@ngrx/store';
import {reducers} from './store/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    FavoritesComponent,
    HeaderComponent,
    ButtonComponent,
    TableComponent,
    TableHeaderComponent,
    TableBodyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [AuthGuard, BaseHttpService, HomeService, DetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
