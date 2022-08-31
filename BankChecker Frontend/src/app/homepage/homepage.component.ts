import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Expense } from '../model/expense';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { ExpenseService } from '../service/expense.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public expenses: Expense[] = [];
  public user: User = new User();
  public totExpensesWeek: number = 0;
  public lastExpense: any;
  public totExpenseMonth: number = 0;
  public subscriptions: Subscription[] = [];
  public editExpense: Expense=new Expense(0,new Date(),0,"",0);
  public dateObj: Date=new Date()
  constructor(private expenseService: ExpenseService, private userService: UserService, private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private router: Router,public datepipe: DatePipe) { }
  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getExpenses();
  }
  public getExpenses(): void {
    this.expenseService.getExpensesOfWeek(this.user.id).subscribe((response => {
      this.expenses = response
      this.expenses.forEach(element => {
        this.totExpensesWeek += element.value;
      });
      this.expenseService.getLastExpenseDate(this.user.id).subscribe((response => {
        if (response != null)
          this.lastExpense = response.date
        else
          this.lastExpense = null
      }))
      this.expenseService.getExpensesOfMonth(this.user.id).subscribe((response => {
        response.forEach(element => {
          this.totExpenseMonth += element.value;
        });
      }))
    }));
  }
  public logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login")
    this.notificationService.notify(NotificationType.SUCCESS, "Logout eseguito correttamente.")
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message)
    }
    else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.')
    }
  }

  public onEditExpense(editExpense:Expense):void{
    this.editExpense=editExpense;
    document.getElementById('openUserInfo')?.click()
    this.dateObj=editExpense.date
    console.log("Caricata : "+editExpense.date) 
    
      
  }

  public updateExpense(editExpense:Expense):void{
    console.log("Inviata : "+ this.datepipe.transform(this.dateObj, "yyyy-MM-dd"))
    this.editExpense.date=this.dateObj;
    this.editExpense.user_id=this.authenticationService.getUserFromLocalCache().id
    this.expenseService.updateExpense(editExpense)
    .subscribe((response:Expense)=>{
      console.log(response)
      this.notificationService.notify(NotificationType.SUCCESS, 'Aggiornamento completato correttamente.')
    },(error: HttpErrorResponse) =>{
      this.notificationService.notify(NotificationType.ERROR, error.message)
    },()=>{
      this.totExpenseMonth=0;
    this.totExpensesWeek=0;
    this.getExpenses()
    })
    
    }
}
