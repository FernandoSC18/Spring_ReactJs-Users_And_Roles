package com.fernando.users_and_roles.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional; 
import org.springframework.stereotype.Repository;

import com.fernando.users_and_roles.model.MenuRoutes;

@Repository
@Transactional
public class MenuRoutesDaoImp implements MenuRoutesDao {
 
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<MenuRoutes> getAll (Long[] menusIds) { 

        String query = "SELECT MR FROM MenuRoutes MR WHERE 1 = 1"
        + "AND MR.id IN (''";
        
        for (int i = 0; i < menusIds.length; i++ ){
            query += ", :menu_id" + i + "";
        }
        query += ")";

        Query queryObject = (Query) entityManager.createQuery(query);
        for (int i = 0; i < menusIds.length; i++ ){
            queryObject.setParameter("menu_id" + i, menusIds[i]);
        }
        List<MenuRoutes> listMenus = queryObject.getResultList();  

        return listMenus; 
    }
    
}
