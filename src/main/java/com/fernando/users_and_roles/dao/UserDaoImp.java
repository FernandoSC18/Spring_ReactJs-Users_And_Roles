package com.fernando.users_and_roles.dao; 

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fernando.users_and_roles.model.User;

import java.util.List; 
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class UserDaoImp implements UserDao {

    @PersistenceContext
    EntityManager entityManager;
    
  
    @Override
    public List<User> getAll() { 
        String query = "SELECT U FROM User U WHERE 1 = 1"; 
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public User getById(Long id) {
        String query = "SELECT U FROM User U WHERE U.id = :user_id";

        List<User> listUser = entityManager.createQuery(query)
            .setParameter("user_id", id)
            .getResultList();

        return listUser.isEmpty() ? new User() : listUser.get(0);
    }

    @Override
    public User getByEmail(String email) {
        
        String query = "SELECT U FROM User U WHERE email = :email";
        List<User> listUser = entityManager.createQuery(query)
            .setParameter("email", email)
            .getResultList();

        if (listUser.isEmpty()) return null;

        User userDB = listUser.get(0); 

        return userDB;  
    }

    @Override
    public void create(User user) { 
        entityManager.persist(user); 
    }

    @Override
    public void modify(User user) { 
        entityManager.merge(user);
        
    }

    @Override
    public void delete(User user) {  
        entityManager.remove(entityManager.contains(user) ? user : entityManager.merge(user));
    } 

    
    
}
