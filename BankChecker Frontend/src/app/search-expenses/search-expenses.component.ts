import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable, timer } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Expense } from '../model/expense';
import { AuthenticationService } from '../service/authentication.service';
import { ExpenseService } from '../service/expense.service';
import { NotificationService } from '../service/notification.service';
@Component({
  selector: 'app-search-expenses',
  templateUrl: './search-expenses.component.html',
  styleUrls: ['./search-expenses.component.css']
})
export class SearchExpensesComponent implements OnInit {
  public expensesLoaded: boolean = false;
  public expenses: Expense[] = [];
  public totExpenses: number = 0;
  public query:string="";
  public dateObj:Date=new Date()
  public editExpense: Expense=new Expense(0,new Date(),0,"",0);
  constructor(private notificationService: NotificationService, private expenseService: ExpenseService,
    private authenticationService: AuthenticationService, private router: Router,public datepipe: DatePipe) { }
  ngOnInit(): void {
    }
  public search(dateRangeForm: NgForm): void {
    this.totExpenses = 0;
    document.getElementById("table")!.style.visibility = "visible";
    const formData = new FormData();
    formData.append("from", dateRangeForm.value["from"]);
    formData.append("to", dateRangeForm.value["to"])
    this.expenseService.getExpenseByDateRange(formData, this.authenticationService.getUserFromLocalCache().id)
      .subscribe((response: Expense[]) => {
        this.expenses = response;
        response.forEach(element => {
          this.totExpenses += element.value
        });
      },
        (error: HttpErrorResponse) => {
          this.notificationService.notify(NotificationType.ERROR, error.message)
        }, () => {
          this.expensesLoaded = true
        })
  }
  public onEditExpense(editExpense:Expense):void{
    this.editExpense=editExpense;
    document.getElementById('openUserInfo')?.click()
    console.log(this.datepipe.transform(editExpense.date,"dd/MM/yyyy","","en-EN"))
    this.dateObj=editExpense.date
    console.log("Caricata : "+this.dateObj) 
    
    
  }

  public updateExpense():void{
    this.editExpense.user_id=this.authenticationService.getUserFromLocalCache().id
    this.editExpense.date=this.dateObj;
    this.expenseService.updateExpense(this.editExpense)
    .subscribe((response:Expense)=>{
      console.log(response)
      this.notificationService.notify(NotificationType.SUCCESS, 'Aggiornamento completato correttamente.')
    }),(error: HttpErrorResponse) =>{
      this.notificationService.notify(NotificationType.ERROR, error.message)
    }
    this.totExpenses=0;
    this.expenses.forEach(element => {
      this.totExpenses += element.value
    });
    this.expenses.sort((b, a) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

}
