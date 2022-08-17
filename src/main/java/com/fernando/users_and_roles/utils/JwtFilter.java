package com.fernando.users_and_roles.utils;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fernando.users_and_roles.dao.RolDao;
import com.fernando.users_and_roles.dao.UserDao;
import com.fernando.users_and_roles.model.User;
import com.fernando.users_and_roles.model.UserUserDetails;

/*
 * for each request, verify token is not corrupted or expired
 */
public class JwtFilter extends OncePerRequestFilter {

    private final static Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    @Autowired
    private JwtProvider jwtProvider;
    
    @Autowired
    private UserDao userDao;

    @Autowired
    private RolDao rolDao;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException { 
                
        try {
            String token = getToken(request);

            if (token != null && jwtProvider.isValidateToken(token)){

                Long userId = jwtProvider.getUserIdToken(token); 
                if (userId != null){ 
                    User user = userDao.getById(userId); 
                    List<String> authorities = rolDao.getRolesNames(user.getRoles());

                    UserDetails userDetails = UserUserDetails.build(user, authorities); 

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
 
            }

        } catch(Exception e){ 
            logger.error("JWT doFilterInternal Error: " + e.getMessage());
        } 
        
        filterChain.doFilter(request, response); 
    }

    private String getToken (HttpServletRequest request) {  
        String header = request.getHeader("Authorization");
 
        return header == null ? null 
        : (header.startsWith("Bearer") ? header.replace("Bearer ", "") : header); 
    }
 
}
