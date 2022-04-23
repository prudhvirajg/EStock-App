import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private companyService: CompanyService) { }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value);
    this.companyService.createCompany(this.addForm.value).subscribe((data) => {
      console.warn("registered succesfully", data)
    })
    this.alert = true;
  }
  closeAlert() {
    this.alert = false;
  }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      ceo: ['', Validators.required],
      turnOver: ['', [Validators.required, Validators.min(100000000)]],
      website: ['', Validators.required],
      stockExchange: ['', Validators.required],
    });
  }
}
