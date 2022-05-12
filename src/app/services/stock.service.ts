import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockPrices } from '../model/stockPrices.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8011/api/v1.0/market/stock';

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('content-type', 'application/x-www-form-urlencoded')
    return headers;
  }
  //add stock
  addStock(id: number, stock: Stock) {
    return this.http.post(this.baseUrl + '/add/' + id, stock, { 'headers': this.getHeaders() });
  }
  //get stockPrices by id
  getCompanyById(id: number, startDate: String, endDate: String) {
    return this.http.get<StockPrices[]>(this.baseUrl + '/get/' + id + '/' + startDate + '/' + endDate, { 'headers': this.getHeaders() })
  }


}
