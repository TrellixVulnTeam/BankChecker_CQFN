import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { ExpenseService } from './service/expense.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotificationService } from './service/notification.service';
import { NotificationModule } from './notification.module';
import { FormsModule } from '@angular/forms';
import { InsertExpenseComponent } from './insert-expense/insert-expense.component';
import { SearchExpensesComponent } from './search-expenses/search-expenses.component';
import { FullTextSearchPipe } from './search-expenses/FullTextSearchPipe'
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    InsertExpenseComponent,
    SearchExpensesComponent,
    FullTextSearchPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    
   
  ],
  providers: [AuthenticationService, DatePipe, UserService, ExpenseService, NotificationService, {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
