import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../model/stock.model';
import { StockPrices } from '../model/stockPrices.model';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  OAuthExpTime = new Date().getTime();
  OAuthToken: string;
  token: Token;
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://6exsfckr39.execute-api.ap-south-1.amazonaws.com/cloud/api/v1.0/market/stock';

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json')
    console.log(this.OAuthExpTime);
    if (this.OAuthExpTime!=null&& this.OAuthExpTime < new Date().getTime()) {
      console.log(this.OAuthExpTime);
      let headers1 = new HttpHeaders();
      headers1 = headers1.append('Authorization', 'Basic ' + btoa('7qgru7oigopom3bp4iskf3225u:61a6g40kjcgdlutl7b4m6av38o7v5ut9in8h66pee1miqqd6nla'))
      headers1 = headers1.append('content-type', 'application/x-www-form-urlencoded')
      console.log(headers1);
      var response = this.http.post<Token>('https://api-dt-dev-stockmarket.auth.ap-south-1.amazoncognito.com/oauth2/token', "grant_type=client_credentials", { headers: headers1 });
      response.subscribe(data => {
        console.log(data);
        this.token = data
      });
       console.log(this.token.token_type)
      this.OAuthExpTime = new Date(new Date().getTime() + 59 * 60000).getTime();
      this.OAuthToken = this.token.token_type + ' ' + this.token.access_token;
      //  console.log(this.OAuthToken);
      headers = headers.append('Authorization', this.OAuthToken);
    }
    else headers = headers.append('Authorization', this.OAuthToken);
     console.log(this.OAuthToken);
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
