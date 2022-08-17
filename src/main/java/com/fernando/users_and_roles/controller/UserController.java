package com.fernando.users_and_roles.controller;
 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;

import com.fernando.users_and_roles.dao.UserDao;
import com.fernando.users_and_roles.model.User; 

@RestController
@RequestMapping("/api")
public class UserController { 

    @Autowired
    private UserDao userDao;  

    @Autowired
    private PasswordEncoder passwordEncoder;

    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
    @PreAuthorize("hasAuthority('ROLE_GET')") 
    @GetMapping("/users") 
    public ResponseEntity<?> getAllUsers(){   
        
        List<User> userDB = userDao.getAll();
        for (User user : userDB) {
            user.setPassword("");
        }   
        return new ResponseEntity<List<User>>(userDB, HttpStatus.OK); 
    }
     
    @PreAuthorize("hasAuthority('ROLE_GET')") 
    @GetMapping("/user/{id}") 
    public User getUser( @PathVariable Long id ){    
        User userDB = userDao.getById(id);
        userDB.setPassword("");
        return id != null ? userDao.getById(id) : null;
    }

    @PreAuthorize("hasRole('POST') and hasRole('ADMIN')" )   
    @PostMapping("/user")
    public void addUser (@RequestBody User user) {  
        
        if (user.getPassword() != null && !user.getPassword().equals("") 
        && user.getPassword().length() >= 8 && user.getPassword().length() <= 15){ 
            user.setPassword( passwordEncoder.encode(user.getPassword()) ); 
            userDao.create(user); 
        }  
    }
    

    @PreAuthorize("hasRole('PUT') and hasRole('ADMIN')" )  
    @PutMapping("/user")
    public void editUser (@RequestBody User user) {   
        User userDb = userDao.getById(user.getId());   

        if (user.getPassword() != null && !user.getPassword().equals("") 
        && user.getPassword().length() >= 8 && user.getPassword().length() <= 15){  
            user.setPassword( passwordEncoder.encode(user.getPassword()) );  
        }else{   
            user.setPassword( userDb.getPassword() );  
        }
        userDao.modify(user); 
    }
      
    @PreAuthorize("hasRole('DELETE') and hasRole('ADMIN')" ) 
    @DeleteMapping("/user")   
    public void deleteUser (@RequestBody User user  ) { 
        User userDB = userDao.getById(user.getId());  
        //Check if userid is user from database
        if (userDB != null){    
            userDao.delete(userDB);  
        }  
    }

     
}
