import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  submitted: boolean = false;
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    console.log(this.searchForm.value);
    localStorage.removeItem("companyCode");
    localStorage.setItem("companyCode", this.searchForm.controls.companyCode.value.toString());
    console.log(localStorage.getItem("companyCode"));
    this.router.navigate(['search-company']);
  }


  registerCompany(): void {
    this.router.navigate(['add-company']);
  }
  listCompanies(): void {
    this.router.navigate(['list-company']);
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      companyCode: ['', Validators.required]
    });



  }

}
