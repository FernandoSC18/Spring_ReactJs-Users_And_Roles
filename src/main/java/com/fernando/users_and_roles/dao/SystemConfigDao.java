package com.fernando.users_and_roles.dao;

import java.util.List;

import com.fernando.users_and_roles.model.SystemConfig;

public interface SystemConfigDao {  
 
    void modify(SystemConfig systemConfig); 

    List<SystemConfig> getAll(); 

    SystemConfig getById(int id); 
}
