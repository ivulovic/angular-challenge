import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from 'src/app/core/services/BaseHttpService';
import { providerURL } from './constants';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseHttpService {
  ws: any;

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  loadTickerSymbols():Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(`${this.API_URL}/symbols`);
  }

  unsubscribeFromSymbols(channels: Array<string>){
    console.log("making unsubscribe")
    for(let id of channels){
      if(id){
        this.ws.send(JSON.stringify({ event: 'unsubscribe', chanId: id}))
      }
    }
  }
  

  makeSubscription(tickerSymbols: Array<string>){
    console.log("making subscription")
    for(let symbol of tickerSymbols){
      if(symbol){
        this.ws.send(JSON.stringify({ event: 'subscribe', channel: 'ticker', symbol: symbol}))
      }
    }
  }
  
  mapToEntity (payload: any, key: string){
    if(!payload || !key) return {};
    return  {
      [payload[key]] : payload
    }
  }

  openWebsocketConnection(onMessage: any): void {
    this.ws = new WebSocket(providerURL);
    this.ws.onopen = () => {
      console.log("opened")
    };
    this.ws.onclose = () => {
      console.log("closed")
    };
    this.ws.onmessage = onMessage;
  }

}
