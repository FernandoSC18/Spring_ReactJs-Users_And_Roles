package com.fernando.users_and_roles.controller;
 
 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult; 

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fernando.users_and_roles.dao.RolDao;
import com.fernando.users_and_roles.dao.SystemConfigDao;
import com.fernando.users_and_roles.dao.UserDao;
import com.fernando.users_and_roles.model.JwtResponse;
import com.fernando.users_and_roles.model.SystemConfig;
import com.fernando.users_and_roles.model.User;
import com.fernando.users_and_roles.model.UserUserDetails;
import com.fernando.users_and_roles.utils.JwtProvider;
  
@RestController
@RequestMapping("/session")
public class SessionController { 
    
    @Autowired
    private UserDao userDao;

    @Autowired
    private RolDao rolDao;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder; 
    
    @Autowired
    SystemConfigDao systemConfigDao;


    @PreAuthorize("permitAll()") 
    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody User user, BindingResult bindingResult) {  
        
        if (bindingResult.hasErrors()){
            return new ResponseEntity<>("Datos Incorrectos", HttpStatus.BAD_REQUEST); 
        }
  
        if (user.getEmail() == null || user.getPassword() == null) { 
            return new ResponseEntity<>("Datos Incorrectos", HttpStatus.BAD_REQUEST); 
        }else { 
            //Here JWT Token implementation
            User userFromDB = userDao.getByEmail(user.getEmail()); 

            if (userFromDB != null && passwordEncoder.matches( user.getPassword() , userFromDB.getPassword() )){     
 
                List<String> authorities = rolDao.getRolesNames(userFromDB.getRoles());  
                UserDetails userDetails = UserUserDetails.build(userFromDB, authorities);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()); 
                      
                SecurityContextHolder.getContext().setAuthentication(auth);
                String jwt = jwtProvider.generateToken(auth);  
                
                //Get time token from Database 
                SystemConfig systemConfigTimeSession = systemConfigDao.getById(1); 
                int sessionMinutesFromDB = Integer.parseInt(systemConfigTimeSession.getValue()); 

                JwtResponse jwtResponse = new JwtResponse(jwt, sessionMinutesFromDB, userDetails.getUsername(), userDetails.getAuthorities());
                return new ResponseEntity <JwtResponse>(jwtResponse, HttpStatus.OK);  
            }else {  
                return new ResponseEntity<String>("Unautorized", HttpStatus.UNAUTHORIZED); 
            } 
        }  
    }  
 
    @PreAuthorize("permitAll()") 
    @PostMapping("/register")
    public ResponseEntity<?> addUser (@RequestBody User user, BindingResult bindingResult) {
        
        System.out.println("TOKEN: user" + user  ); 

        if (bindingResult.hasErrors()){
            return new ResponseEntity("Datos Incorrectos", HttpStatus.BAD_REQUEST); 
        }

        //Check if user id exist
        if (userDao.getByEmail(user.getEmail()) != null ) {
            return new ResponseEntity("Ya cuentas con una cuenta, Inicia sessión", HttpStatus.BAD_REQUEST); 
        } 
        
        user.setRoles("3,7"); 
        user.setPassword( passwordEncoder.encode(user.getPassword()) ); 

        userDao.create(user); 
 
        return new ResponseEntity("Registro Completado.", HttpStatus.CREATED); 
    }

}
