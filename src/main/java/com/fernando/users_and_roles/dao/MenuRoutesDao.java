package com.fernando.users_and_roles.dao;

import java.util.List;

import com.fernando.users_and_roles.model.MenuRoutes;

public interface MenuRoutesDao {

    List<MenuRoutes> getAll (Long[]  rolesIds);
    
}
