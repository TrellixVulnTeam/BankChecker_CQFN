import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { InsertExpenseComponent } from './insert-expense/insert-expense.component';
import { LoginComponent } from './login/login.component';
import { SearchExpensesComponent } from './search-expenses/search-expenses.component';
import { AuthenticationGuard } from './service/guard.service';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path :"home", component:HomepageComponent,canActivate:[AuthenticationGuard]},
  {path:"search", component:SearchExpensesComponent,canActivate:[AuthenticationGuard]},
  {path:"insert", component:InsertExpenseComponent,canActivate:[AuthenticationGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
