import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected API_URL = "/bitfinex";
  constructor(protected httpClient: HttpClient) { }
}