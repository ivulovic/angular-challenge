import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/services/BaseHttpService';

@Injectable({
  providedIn: 'root'
})
export class DetailsService extends BaseHttpService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  loadSymbolDetails(id: string):Observable<Record<string, any>>{
    return this.httpClient.get<Record<string, any>>(`${this.API_URL}/pubticker/${id}`);
  }

  loadFavorites(){
    const value = localStorage.getItem("favoriteSymbols");
    return value ? JSON.parse(value) : [];
  }

  toggleFavorite(favorites: Array<string>, id: string){
    console.log(favorites, id)
    let newFavorites = [];
    if(favorites.includes(id)){
      newFavorites = favorites.filter((x: any) => x !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    localStorage.setItem("favoriteSymbols", JSON.stringify(newFavorites));
    
    return newFavorites;
  }

}
