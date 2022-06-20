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
  public editExpense: Expense=new Expense(0,new Date(),0,"",0);
  constructor(private notificationService: NotificationService, private expenseService: ExpenseService,
    private authenticationService: AuthenticationService, private router: Router) { }
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
    document.getElementById('openUserInfo')?.click()
    this.editExpense=editExpense;
    
  }

  public updateExpense():void{
    this.editExpense.user_id=this.authenticationService.getUserFromLocalCache().id
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
    }

}
