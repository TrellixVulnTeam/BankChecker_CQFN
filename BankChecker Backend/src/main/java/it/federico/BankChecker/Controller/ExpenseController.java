package it.federico.BankChecker.Controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;

import it.federico.BankChecker.Entity.Expense;
import it.federico.BankChecker.Service.ExpenseService;

@RestController
@RequestMapping("/api/v1/expense")
public class ExpenseController {
	private ExpenseService expenseService;
	
	@Autowired
	public ExpenseController(ExpenseService expenseService) {
		super();
		this.expenseService = expenseService;
	}

	@PostMapping("/addExpense")
	public ResponseEntity<Expense> addExpense(@RequestBody Expense expense){
		return new ResponseEntity<Expense>(expenseService.addNewExpense(expense),HttpStatus.OK);
	}
	@PostMapping("/addExpenses")
	public ResponseEntity<?> addExpenses(@RequestBody List<Expense> expenses){
		for(Expense expense : expenses) {
			expenseService.addNewExpense(expense);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PutMapping("/updateExpense")
	public ResponseEntity<Expense> updateExpense(@RequestBody Expense expense) throws ParseException{   
		return new ResponseEntity<Expense>(expenseService.updateExpense(expense),HttpStatus.OK);
	}
	
	@GetMapping("/findAll")
	public ResponseEntity<List<Expense>> findAllExpenses(){
		return new ResponseEntity<List<Expense>>(expenseService.findAll(),HttpStatus.OK);
	}
	@PostMapping("/findByDateRange/{user_id}")
	public ResponseEntity<List<Expense>> findAllExpensesByDateRange(@RequestParam("from") String from,
			@RequestParam("to")String to,@PathVariable("user_id") int user_id ) throws ParseException{ 
	    Date fromDate=new SimpleDateFormat("yyyy-MM-dd").parse(from);
	    Date toDate=new SimpleDateFormat("yyyy-MM-dd").parse(to); 
		return new ResponseEntity<List<Expense>>(expenseService.findByDateRange(fromDate,toDate,user_id),HttpStatus.OK);
	}
	@GetMapping("/findOfThisWeek/{user_id}")
	public ResponseEntity<List<Expense>> findAllExpensesOfThisWeek(@PathVariable int user_id ){
		return new ResponseEntity<List<Expense>>(expenseService.findAllExpensesOfThisWeek(user_id),HttpStatus.OK);
	}
	@GetMapping("/findOfThisMonth/{user_id}")
	public ResponseEntity<List<Expense>> findAllExpensesOfThisMonth(@PathVariable int user_id ){
		return new ResponseEntity<List<Expense>>(expenseService.findAllExpensesOfThisMonth(user_id),HttpStatus.OK);
	}
	
	@GetMapping("/getLastExpenseDate/{user_id}")
	public ResponseEntity<Expense> getLastExpenseDate(@PathVariable int user_id ){
		return new ResponseEntity<Expense>(expenseService.getLastExpenseDate(user_id),HttpStatus.OK);
	}	
	}


