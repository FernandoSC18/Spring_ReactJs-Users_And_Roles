package com.fernando.users_and_roles.controller; 
 
import javax.servlet.ServletException; 
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.web.servlet.error.ErrorController; 
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;  

@Controller
public class HandleErrorController implements ErrorController { 
  
    /*
     * avoid error 404  not found in SPA, and send Http status response
     */    
    @PreAuthorize("permitAll()") 
    @RequestMapping("/error")
    public String handleError(HttpServletResponse response) throws IOException, ServletException { 
 
        return "forward:/";
    }
 
}