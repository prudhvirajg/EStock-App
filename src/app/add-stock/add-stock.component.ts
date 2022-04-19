import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../services/stock.service';


@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  addForm: FormGroup;
  submitted: boolean = false;
  alert: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private stockService: StockService) { }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value);
    let companyCode = localStorage.getItem("companyCode");
    console.log(companyCode);
    if (companyCode != null) {
      this.stockService.addStock(parseInt(companyCode), this.addForm.value).subscribe((data) => {
        alert(this.addForm.controls.stockPrice.value + ' stock added successfully..!!');
      })
      this.alert = true;
    }
  }
  closeAlert() {
    this.alert = false;
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      stockPrice: ['', [Validators.required
        // , Validators.pattern('/^\d*\.\d{0,2}$/g')
      ]]
    });
  }

}
