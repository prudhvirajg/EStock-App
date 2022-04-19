import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../model/company.model';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  company :Company;
  constructor(private router:Router,private companyService:CompanyService) { }

  ngOnInit(){
    let companyCode = localStorage.getItem("companyCode");
    if(companyCode!=null){
      this.companyService.getCompanyById(parseInt(companyCode))
      .subscribe(data=>{this.company=data;
        console.log(data);
      });
    }
    
}
}
