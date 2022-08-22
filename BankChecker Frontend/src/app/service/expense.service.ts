import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../model/expense';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
   private host = environment.apiUrl;
  constructor(private http: HttpClient) { }
  public getExpensesOfWeek(user_id: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.host + "/api/v1/expense/findOfThisWeek/" + user_id);
  }
  public getExpensesOfMonth(user_id: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.host + "/api/v1/expense/findOfThisMonth/" + user_id);
  }
  public getLastExpenseDate(user_id: number): Observable<Expense> {
    return this.http.get<Expense>(this.host + "/api/v1/expense/getLastExpenseDate/" + user_id);
  }
  public getExpenseByDateRange(dateRangeForm: FormData, user_id: number): Observable<Expense[]> {
    return this.http.post<Expense[]>(this.host + "/api/v1/expense/findByDateRange/" + user_id, dateRangeForm)
  }
  public insertExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.host + "/api/v1/expense/addExpense", expense)
  }
  public updateExpense(expense: Expense):Observable<Expense> {
    return this.http.put<Expense>(this.host + "/api/v1/expense/updateExpense/", expense);
  }
}
