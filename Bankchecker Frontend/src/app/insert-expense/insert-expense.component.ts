import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { Expense } from '../model/expense';
import { AuthenticationService } from '../service/authentication.service';
import { ExpenseService } from '../service/expense.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-insert-expense',
  templateUrl: './insert-expense.component.html',
  styleUrls: ['./insert-expense.component.css']
})
export class InsertExpenseComponent implements OnInit {
  public expense: Expense = new Expense(0, new Date(), 0, "", 0);
  public showAlert: boolean = true;
  constructor(private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private router: Router,
    private expenseService: ExpenseService) { }
  ngOnInit(): void {
    
  }
  public insert(insertForm: NgForm) {
    var expense = (new Expense(0, new Date(insertForm.value["date"]),
      insertForm.value["value"], insertForm.value["notes"],
      this.authenticationService.getUserFromLocalCache().id))
    this.expenseService.insertExpense(expense).subscribe((response) => {
      this.expense = response
      this.notificationService.notify(NotificationType.SUCCESS, "Spesa inserita con Successo.")
    }, (error: HttpErrorResponse) => {
      this.notificationService.notify(NotificationType.ERROR, "Errore nell'inserimento della spesa. Riprovare.")
    })
    insertForm.reset();
    this.showAlert = true;
  }
  public invalid(): void {
    this.showAlert = true;
  }
}
