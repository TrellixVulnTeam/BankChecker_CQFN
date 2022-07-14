package it.federico.BankChecker.Repository;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import it.federico.BankChecker.Entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

	@Query(value= "Select * from public.spese where date >= ?1 and date <= ?2 and user_id=?3 order by date asc",nativeQuery = true)
	public List<Expense> findByDateRange(Date from, Date to,int UserId);
	@Query(value="Select * From spese Where date >= date_trunc('week', current_date) AND date<=date_trunc('week', current_date+6) and user_id=?1 order by date asc",nativeQuery = true)
	public List<Expense> findAllOfThisWeek(int user_id);
	@Query(value="Select * From spese Where date >= date_trunc('month', current_date) AND date<=date_trunc('month', current_date) + interval '1 month' - interval '1 day' and user_id=?1 order by date asc",nativeQuery = true)
	public List<Expense> findAllOfThisMonth(int user_id);
	@Query(value="select * from spese where user_id=?1 ORDER BY date DESC LIMIT 1", nativeQuery = true)
	public Expense getLastExpenseDate(int user_id);
}
