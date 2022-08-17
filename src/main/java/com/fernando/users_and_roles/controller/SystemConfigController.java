package com.fernando.users_and_roles.controller;
  
import org.springframework.security.access.prepost.PreAuthorize;   
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fernando.users_and_roles.dao.SystemConfigDao;
import com.fernando.users_and_roles.model.SystemConfig;

import java.util.List; 

@RestController
@RequestMapping("/api")
public class SystemConfigController { 
    
    @Autowired
    private SystemConfigDao systemConfigDao; 
 
    @PreAuthorize( "hasRole('GET') and hasRole('PUT') and hasRole('DEV')") 
    @PutMapping("/config")
    public void changeConfigs ( @RequestBody SystemConfig systemConfig) {  
        SystemConfig systemConfigDB = systemConfigDao.getById(systemConfig.getId());
        systemConfigDB.setValue(systemConfig.getValue());
        systemConfigDao.modify(systemConfigDB);
    }
    
    @PreAuthorize( "hasRole('GET') and hasRole('DEV')") 
    @GetMapping("/config")
    public ResponseEntity<?> getConfigs ( ) {   
        List<SystemConfig> systemConfigs = systemConfigDao.getAll( );
        return new ResponseEntity<List<SystemConfig>>(systemConfigs, HttpStatus.OK); 
    } 
    
}