package com.fernando.users_and_roles.utils;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


/* JwtEntryPoint
 * Reject all request UNAUTHORIZED 
 * also catch errors HTTP when token is parameter binding 
 */
@Component
public class JwtEntryPoint implements AuthenticationEntryPoint {

    private final static Logger logger = LoggerFactory.getLogger(JwtEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
  
                logger.error("Fail en el metodo commence"+ authException.getCause());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado");
 
    }
    
}
