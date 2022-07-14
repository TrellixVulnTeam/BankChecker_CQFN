package it.federico.BankChecker.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.federico.BankChecker.Entity.Expense;
import it.federico.BankChecker.Repository.ExpenseRepository;

@Service
public class ExpenseService {
	@Autowired
	private ExpenseRepository expenseRepository;
	
	public Expense addNewExpense(Expense expense) {
		return expenseRepository.save(expense);
	}
	
	public List<Expense> findByDateRange(Date From,Date to,int UserId){
		return expenseRepository.findByDateRange(From, to, UserId);
	}
	
	public List<Expense> findAll(){
		return expenseRepository.findAll();
	}
	
	public List<Expense> findAllExpensesOfThisWeek(int user_id){
		return expenseRepository.findAllOfThisWeek(user_id);
	}

	public List<Expense> findAllExpensesOfThisMonth(int user_id) {
		return expenseRepository.findAllOfThisMonth(user_id);
	}

	public Expense getLastExpenseDate(int user_id) {
		// TODO Auto-generated method stub
		return expenseRepository.getLastExpenseDate(user_id);
	}

	public Expense updateExpense(Expense expense) {
		// TODO Auto-generated method stub
	 return expenseRepository.save(expense);
	}

}
