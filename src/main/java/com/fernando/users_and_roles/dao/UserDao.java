package com.fernando.users_and_roles.dao;

import java.util.List;

import com.fernando.users_and_roles.model.User;

public interface UserDao {
    
    List<User> getAll();

    User getById(Long id);
    
    User getByEmail(String email); 

    void create(User user);
 
    void modify(User user);

    void delete(User id);   

}
