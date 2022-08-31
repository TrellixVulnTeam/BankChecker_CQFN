package it.federico.BankChecker.Entity;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="spese")
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	@Column(name="date")
	private Date date;
	@Column(name="value")
	private double value;
	@Column(name="notes")
	private String notes;
	@Column(name="user_id")
	private int user_id;
	public Expense() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Expense(int id, Date date, double value, String notes,int user_id) {
		super();
		this.id=id;
		this.date = date;
		this.value = value;
		this.notes = notes;
		this.user_id = user_id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getValue() {
		return value;
	}
	public void setValue(double value) {
		this.value = value;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
