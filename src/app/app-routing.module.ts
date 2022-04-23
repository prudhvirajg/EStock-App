import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { SearchCompanyComponent } from './search-company/search-company.component';
import { AddStockComponent } from './add-stock/add-stock.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-company', component: AddCompanyComponent },
  { path: 'list-company', component: ListCompanyComponent },
  { path: 'search-company', component: SearchCompanyComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
