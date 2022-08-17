package com.fernando.users_and_roles.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;

import com.fernando.users_and_roles.dao.RolDao;
import com.fernando.users_and_roles.model.Rol;

@RestController
@RequestMapping("/api")
public class RolController {

    @Autowired
    private RolDao rolDao;  
  
    @PreAuthorize( "hasRole('GET') and hasRole('ADMIN')") 
    @GetMapping("/roles") 
    public List<Rol> getAllRoles(){  
        return rolDao.getAll();
    }
    
    @PreAuthorize( "hasRole('POST') and hasRole('ADMIN')") 
    @PostMapping("/roles") 
    public void addRol(@RequestBody Rol rol){  
        rolDao.create(rol);
    }
    
    @PreAuthorize( "hasRole('PUT') and hasRole('ADMIN')") 
    @PutMapping("/roles") 
    public void editRol(@RequestBody Rol rol){    
        Rol rolDB = rolDao.getById(rol.getId());
        rol.setType(rolDB.getType());
        rolDao.modify(rol);
    }
    
    @PreAuthorize( "hasRole('DELETE') and hasRole('ADMIN')") 
    @DeleteMapping("/roles") 
    public void deleteRol(@RequestBody Rol rol){  
        rolDao.delete(rol.getId());
    }
    
}
