import { Component, OnDestroy, OnInit } from '@angular/core';
import formatRealtimeTableData from 'src/app/utils/formatRealtimeData';
import { TradingPairs } from './constants';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  state: any;
  rows: any = [];
  tickerSymbols: Array<string> | null = null;
 
  columns = [
    {field: 'name', label: 'Name', linkGenerator: (id: string) => `/details/${id}`},
    {field: 'last', label: 'Last', align: 'right'},
    {field: 'change', label: 'Change', align: 'right'},
    {field: 'changePercent', label: 'Change Percent', align: 'right'},
    {field: 'high', label: 'High', align: 'right'},
    {field: 'low', label: 'Low', align: 'right'},
  ];
  
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.loadTickerSymbols().subscribe(
      response => {
        this.tickerSymbols = response.slice(0, 5).map(x => x.toUpperCase());
        this.homeService.openWebsocketConnection(this.onMessage.bind(this))
      }
    );
  }

  ngOnDestroy(): void{
    this.homeService.unsubscribeFromSymbols(Object.keys(this.state));
  }

  onMessage(event: any){
    let data = JSON.parse(event.data);
    if(data.event === 'info'){
      this.state = {};
      if(this.tickerSymbols){
        this.homeService.makeSubscription(this.tickerSymbols);
      }
    }
    if(data.event === 'subscribed'){
        this.state = {
          ...this.state,
          ...this.homeService.mapToEntity(data, 'chanId'),
        };
    }
    if(!data.event){
      const isHeartbeat = data[1] === 'hb';

      if(!isHeartbeat){
        const [channelId, value] = data;
        const values = [value[TradingPairs.LAST_PRICE], value[TradingPairs.DAILY_CHANGE], value[TradingPairs.DAILY_CHANGE_PERC], value[TradingPairs.HIGH], value[TradingPairs.LOW], new Date().getTime()];
        
        const newObj = {
          [channelId]:{
            ...(this.state[channelId] || {}),
            values,
          }
        }

        this.state = {
          ...this.state,
          ...newObj,
        };
        this.rows = formatRealtimeTableData(Object.values(this.state));
      }
    }
  };
}
