import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company.model';
import { HttpHeaders } from '@angular/common/http';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient, private stockService: StockService) { }

  baseUrl: string = 'https://o9sdppjabg.execute-api.ap-south-1.amazonaws.com/cloud/api/v1.0/market/company';

  //get all companies
  getCompanies() {
    return this.http.get<Company[]>(this.baseUrl + '/getall', { 'headers': this.stockService.getHeaders() })
  }
  //get company by id
  getCompanyById(id: number) {
    return this.http.get<Company>(this.baseUrl + '/info/' + id, { 'headers': this.stockService.getHeaders() })
  }
  //add company
  createCompany(company: Company) {
    return this.http.post(this.baseUrl + '/register', company, { 'headers': this.stockService.getHeaders() });
  }
  //delete company
  deleteCompany(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id, { 'headers': this.stockService.getHeaders() })
  }






}
