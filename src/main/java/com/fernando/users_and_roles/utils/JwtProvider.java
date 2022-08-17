package com.fernando.users_and_roles.utils;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication; 
import org.springframework.stereotype.Component;

import com.fernando.users_and_roles.dao.SystemConfigDao;
import com.fernando.users_and_roles.model.SystemConfig;
import com.fernando.users_and_roles.model.UserUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException; 

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key; 


/* JwtProvider
 * Validate correct build of any Token
 */

@Component
public class JwtProvider {
    
    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Autowired
    SystemConfigDao systemConfigDao;
 
    //secret secret key for token
    @Value("${security.jwt.secret}")
    private String secret; 
    
    //ttlMillis session time, control from database and default time is define in properties
    @Value("${security.jwt.ttlMillis}")
    private int ttlMillis;
     
    /* 
     * Create a new Token 
    */
    public String generateToken (Authentication auth) { 
 
        UserUserDetails userDetails =(UserUserDetails) auth.getPrincipal(); 
  
        // The JWT signature algorithm used to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        //  set the JWT Claims
        JwtBuilder builder = Jwts.builder();
        long nowMillis = System.currentTimeMillis();
        Date currentDate = new Date(nowMillis);
        
        //  sign JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        builder.setId("" + userDetails.getId());           //ID   
        builder.setSubject(userDetails.getEmail());   //email  userDetails.getName()
        builder.setIssuedAt(currentDate);
        builder.signWith(signingKey); 

        //Get time token from Database 
        SystemConfig systemConfigTimeSession = systemConfigDao.getById(1); 
        int minutesDB = Integer.parseInt(systemConfigTimeSession.getValue());
        ttlMillis = minutesDB * 60 * 1000;  
        
        // JWT time expire current time + timer
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }

    public String getUserSubjectToken (String jwt){ 
        // This line will throw an exception if it is not a signed JWS (as
        // expected)
        Claims claims =  Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).build()
                .parseClaimsJws(jwt).getBody();

        return claims.getSubject(); 
    }

    public Long getUserIdToken (String jwt){ 
        // This line will throw an exception if it is not a signed JWS (as
        // expected)
        Claims claims = Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).build()
        .parseClaimsJws(jwt).getBody();

        return claims != null && claims.getId() != null ? Long.parseLong(claims.getId()) : null; 
    }

    public boolean isValidateToken (String jwt) { 
 
        try{
            Jwts.parserBuilder().setSigningKey(DatatypeConverter.parseBase64Binary(secret)).build()
                    .parseClaimsJws(jwt); 
            return true;  
        }catch(MalformedJwtException mjwt) {
            logger.error("JWT malformed: " + mjwt.getMessage());
        }catch(UnsupportedJwtException uje) { 
            logger.error("JWT unsoported: " + uje.getMessage());
        }catch(ExpiredJwtException eje) { 
            logger.error("JWT Expire: " + eje.getMessage());
        }catch(IllegalArgumentException iae) {
            logger.error("JWT Empty: " + iae.getMessage());
        }catch(SignatureException se) {
            logger.error("JWT Signature Failure: " + se.getMessage());
        }
        
        return false;  
    }

}
