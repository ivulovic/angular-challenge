import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import formatNumber from 'src/app/utils/formatters/formatNumber';
import { DetailsService } from './details.service';
import { selectIsLoggedIn } from '../../app.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: any;
  isLoggedIn: boolean = false;
  favorites: Array<string> = [];

  columns = [
    {field: 'name', label: 'Name' },
    {field: 'last', label: 'Last', align: 'right'},
    {field: 'high', label: 'High', align: 'right'},
    {field: 'low', label: 'Low', align: 'right'},
  ];

  constructor(private activatedRoute: ActivatedRoute, private detailsService: DetailsService,private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select(selectIsLoggedIn).subscribe(res => {
      this.isLoggedIn = res;
    });
    this.favorites = this.detailsService.loadFavorites();
    this.activatedRoute.params.subscribe(params => {
      this.detailsService.loadSymbolDetails(params.id).subscribe(
        res => {
          console.log(res)
          this.data = {
            name: params.id,
            last: formatNumber(res.last_price),
            high: formatNumber(res.high),
            low: formatNumber(res.low),
          }
        }
      )
    });
  }
  
  handleFavoriteToggle(symbolName: string){
    this.favorites = this.detailsService.toggleFavorite(this.favorites, symbolName);
  }
}
