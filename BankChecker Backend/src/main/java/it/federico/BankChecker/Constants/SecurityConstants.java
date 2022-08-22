package it.federico.BankChecker.Constants;

import java.math.BigInteger;

public class SecurityConstants {
	public static final BigInteger EXPIRATION_TIME = new BigInteger("2629800000") ;
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String JWT_TOKEN_HEADER = "Jwt-Token";
	public static final String TOKEN_CANNOT_BE_VERIFIED ="Token Cannot be verified.";
	public static final String BANKCHECKER ="BankChecker Application";
	public static final String GET_ARRAYS_ADMINISTRATION = "User Management Portal";
	public static final String AUTHORITIES = "authorities";
	public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page.";
	public static final String ACCESS_DENIED_MESSAGE = "You do not have permission to access this page.";
	public static final String[] PUBLIC_URLS = {"/api/v1/user/login","/api/v1/user/validateToken","/api/v1/user/register"};

}
