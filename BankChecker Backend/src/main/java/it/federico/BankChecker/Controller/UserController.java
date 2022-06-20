package it.federico.BankChecker.Controller;

import java.net.URI;
import java.net.http.HttpRequest;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import it.federico.BankChecker.Constants.SecurityConstants;
import it.federico.BankChecker.Entity.User;
import it.federico.BankChecker.Jwt.JwtTokenProvider;
import it.federico.BankChecker.Service.UserService;


@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("https://bankchecker.club")
public class UserController {
	private JwtTokenProvider jwtTokenProvider;
	private AuthenticationManager authenticationManager;
	private UserService userService;
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	public UserController(JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager,
			UserService userService) {
		super();
		this.jwtTokenProvider = jwtTokenProvider;
		this.authenticationManager = authenticationManager;
		this.userService = userService;
	}
	private HttpHeaders getJwtHeader(User user) {
		HttpHeaders headers= new HttpHeaders();
		headers.add(SecurityConstants.JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(user));
		return headers;
	}
	private void authenticate(String username, String password) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));				
	}
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user){
		System.out.println(user.getUsername());
		authenticate(user.getUsername(),user.getPassword());
		User loginUser=userService.findUserByUsername(user.getUsername());
		HttpHeaders jwtHeader = getJwtHeader(user);
		return new ResponseEntity<User> (loginUser,jwtHeader, HttpStatus.OK);		
	}
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user){
		return new ResponseEntity<User> (userService.addNewUser(user), HttpStatus.OK);		
	}
	@GetMapping("/findAll")
	public ResponseEntity<List<User>> findAll(){
		return new ResponseEntity<List<User>>(userService.findAll(), HttpStatus.OK);
	}

}
