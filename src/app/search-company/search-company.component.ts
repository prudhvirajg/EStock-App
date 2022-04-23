import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Company } from '../model/company.model';
import { CompanyService } from '../services/company.service';
import { DatePipe } from '@angular/common';
import { StockPrices } from '../model/stockPrices.model';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {
  company: Company;
  submitted: boolean = false;
  searchForm: FormGroup;
  stockPrices: StockPrices[];
  stockProceList: number[];
  min: number;
  max: number;
  avg: number;
  constructor(private stockService: StockService, private router: Router, private companyService: CompanyService, private datePipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let companyCode = localStorage.getItem("companyCode");
    if (companyCode != null) {
      this.companyService.getCompanyById(parseInt(companyCode))
        .subscribe(data => {
          this.company = data;
          console.log(data);
        });
    }
    this.searchForm = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', Validators.required],
    }
      , { validator: this.dateLessThan('startDate', 'endDate') }
    );
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Start Date from should less than End Date"
        };
      }
      return {};
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    let companyCode = localStorage.getItem("companyCode");
    let startDate = this.datePipe.transform(this.searchForm.controls.startDate.value, "yyyy-MM-dd");;
    let endDate = this.datePipe.transform(this.searchForm.controls.endDate.value, "yyyy-MM-dd");
    console.log(companyCode, startDate, endDate);
    // this.router.navigate(['search-stock']);
    if (companyCode != null && startDate != null && endDate != null) {
      this.stockService.getCompanyById(parseInt(companyCode), startDate, endDate).subscribe(data => {
        this.stockPrices = data;
        let priceList = this.stockPrices.map(s => s.stockPrice);
        this.min = Math.min(...priceList);
        this.max = Math.max(...priceList);
        this.avg = this.findAvgPrice(priceList)
        console.log(priceList);
      });
    }
  }

  findAvgPrice(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum = sum + +arr[i];
    }
    return sum / arr.length;
  }


  addStockPrice(company: Company): void {
    localStorage.removeItem("companyCode");
    localStorage.setItem("companyCode", company.companyCode.toString());
    console.log(localStorage.getItem("companyCode"));
    this.router.navigate(['add-stock']);
  }
}
