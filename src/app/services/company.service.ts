import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5000/api/v1.0/market/company';
  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('content-type', 'application/x-www-form-urlencoded')
    return headers;
  }
  //get all companies
  getCompanies() {
    return this.http.get<Company[]>(this.baseUrl + '/getall', { 'headers': this.getHeaders() })
  }
  //get company by id
  getCompanyById(id: number) {
    return this.http.get<Company>(this.baseUrl + '/info/' + id, { 'headers': this.getHeaders() })
  }
  //add company
  createCompany(company: Company) {
    return this.http.post(this.baseUrl + '/register', company, { 'headers': this.getHeaders() });
  }
  //delete company
  deleteCompany(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id, { 'headers': this.getHeaders() })
  }






}
