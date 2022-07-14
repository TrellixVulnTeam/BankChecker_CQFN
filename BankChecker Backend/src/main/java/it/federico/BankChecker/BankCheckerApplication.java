package it.federico.BankChecker;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication
@ComponentScan(basePackages = "it.federico.BankChecker.*")
public class BankCheckerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankCheckerApplication.class, args);
	}
	@Bean
    public DataSource datasource() {
        return DataSourceBuilder.create()
          .driverClassName("org.postgresql.Driver")
          .url("jdbc:postgresql://192.168.1.44:5432/BankChecker")
          .username("ragnarok")
          .password("Hikikomori321?")
          .build();	
    }
	@Bean BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
