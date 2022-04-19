import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockPrices } from '../model/stockPrices.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8001/api/v1.0/market/stock';


  //add stock
  addStock(id: number, stock: Stock) {
    return this.http.post(this.baseUrl + '/add/' + id, stock);
  }
  //get stockPrices by id
  getCompanyById(id: number, startDate: String, endDate: String) {
    return this.http.get<StockPrices[]>(this.baseUrl + '/get/' + id + '/' + startDate + '/' + endDate)
  }


}
