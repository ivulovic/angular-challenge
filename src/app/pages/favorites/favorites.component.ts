import { Component, OnDestroy, OnInit } from '@angular/core';
import formatRealtimeTableData from 'src/app/utils/formatRealtimeData';
import { DetailsService } from '../details/details.service';
import { TradingPairs } from '../home/constants';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  
  state: any;
  rows: any = [];
  tickerSymbols: Array<string> | null = null;

  constructor(private homeService: HomeService, private detailsService: DetailsService) {

  }

  ngOnDestroy(): void {
    this.homeService.unsubscribeFromSymbols(Object.keys(this.state));
  }

  columns = [
    {field: 'name', label: 'Name', linkGenerator: (id: string) => `/details/${id}`},
    {field: 'last', label: 'Last', align: 'right'},
    {field: 'change', label: 'Change', align: 'right'},
    {field: 'changePercent', label: 'Change Percent', align: 'right'},
    {field: 'high', label: 'High', align: 'right'},
    {field: 'low', label: 'Low', align: 'right'},
  ];

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
        console.log('iv:', this.rows)
      }
    }
  };

  ngOnInit(): void {
    this.tickerSymbols = this.detailsService.loadFavorites();
    this.homeService.openWebsocketConnection(this.onMessage.bind(this))
  }

}
