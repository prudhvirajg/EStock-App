import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8010/api/v1.0/market/company';

  //get all companies
  getCompanies() {
    return this.http.get<Company[]>(this.baseUrl + '/getall')
  }
  //get company by id
  getCompanyById(id: number) {
    return this.http.get<Company>(this.baseUrl + '/info/' + id)
  }
  //add company
  createCompany(company: Company) {
    return this.http.post(this.baseUrl + '/register', company);
  }
  //delete company
  deleteCompany(id: number) {
    return this.http.delete(this.baseUrl + '/delete/' + id)
  }






}
