import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit {
  companies:Company[];
  constructor(private router:Router,private companyService:CompanyService) { }

  ngOnInit() {
    this.companyService.getCompanies()
      .subscribe(data=>{this.companies=data;
      });
  }

  deleteCompany(company:Company):void{
    let result=confirm("Do you want to Delete Company..??")
    if(result){
    this.companyService.deleteCompany(company.companyCode)
    .subscribe(data=>{
      this.companies=this.companies.filter(c=>c!==company)
    })
    }
    }

  searchCompany(company:Company):void{
    localStorage.removeItem("companyCode");
    localStorage.setItem("companyCode",company.companyCode.toString());
    console.log(localStorage.getItem("companyCode"));
    this.router.navigate(['search-company']);
  }  
  addStockPrice(company:Company):void{
    localStorage.removeItem("companyCode");
    localStorage.setItem("companyCode",company.companyCode.toString());
    console.log(localStorage.getItem("companyCode"));
    this.router.navigate(['add-stock']);
  }

  }





