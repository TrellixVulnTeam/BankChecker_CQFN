package it.federico.BankChecker.Jwt;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import static it.federico.BankChecker.Constants.SecurityConstants.*;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import it.federico.BankChecker.Entity.User;


@Component
public class JwtTokenProvider  {
	
	@Value("jwt.secret")
	private String secret;
	
	public String generateJwtToken(User user) {
		return JWT.create().withIssuer(BANKCHECKER).withAudience(GET_ARRAYS_ADMINISTRATION)
				.withIssuedAt(new Date()).withSubject(user.getUsername())
				.withExpiresAt(new Date( EXPIRATION_TIME.add(new BigInteger(""+System.currentTimeMillis())).longValue()))
							.sign(Algorithm.HMAC512(secret.getBytes()));
	}
	public Authentication getAuthentication(String username, List<GrantedAuthority> authorities, HttpServletRequest request) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
				new UsernamePasswordAuthenticationToken(username,null, authorities);
		usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		return usernamePasswordAuthenticationToken;
	}
	public boolean isTokenValid(String username, String token) {
		JWTVerifier verifier=getJWTVerifier();
		return StringUtils.isNotEmpty(username) && !isTokenExpired(verifier, token);
		
	}
	public String getSubject(String token) {
		JWTVerifier verifier=getJWTVerifier();
		return verifier.verify(token).getSubject();
	}
	public boolean isTokenExpired(JWTVerifier verifier, String token) {
		Date expiration = verifier.verify(token).getExpiresAt();
		return expiration.before(new Date());
	}
	private JWTVerifier getJWTVerifier() {
		JWTVerifier verifier;
		try {
			Algorithm algorithm = Algorithm.HMAC512(secret);
			verifier = JWT.require(algorithm).withIssuer(BANKCHECKER).build();
		}
		catch (JWTVerificationException e) {
			throw new JWTVerificationException(TOKEN_CANNOT_BE_VERIFIED);
		}
	return verifier;
	}
}
