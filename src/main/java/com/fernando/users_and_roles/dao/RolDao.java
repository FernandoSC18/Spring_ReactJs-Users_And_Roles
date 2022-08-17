package com.fernando.users_and_roles.dao;

import java.util.List;

import com.fernando.users_and_roles.model.Rol;

public interface RolDao { 

    void create(Rol rol);
 
    void modify(Rol rol);

    void delete(Long id);  

    List<Rol> getAll(); 

    Rol getById(Long id);
    
    List<String> getRolesNames(String roles);

    String getRolesPathIds(Long [] rolesIds);
}
