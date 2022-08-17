package com.fernando.users_and_roles.dao;

import java.util.ArrayList; 
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.fernando.users_and_roles.model.Rol;
import com.fernando.users_and_roles.utils.StringArrayUtil;

@Repository
@Transactional
public class RolDaoImp implements RolDao {

    @PersistenceContext 
    EntityManager entityManager; 

    @Override
    public void create(Rol rol) {
        entityManager.persist(rol);  
    }

    @Override
    public void modify(Rol rol) {
        entityManager.merge(rol); 
    }

    @Override
    public void delete(Long id) { 
        Rol rol = entityManager.find(Rol.class, id); 
        if (!rol.getType().equalsIgnoreCase("SYSTEM")){
            entityManager.remove(rol); 
        }
    }

    @Override
    public List<Rol> getAll() {
        String query = "SELECT R FROM Rol R WHERE 1 = 1";

        return entityManager.createQuery(query).getResultList(); 
    }

    @Override
    public Rol getById(Long id) {
        return entityManager.find(Rol.class, id);
    } 

    @Override
    public List<String> getRolesNames(String roles) { 

        if (roles == null || roles.equals("")) return List.of("");

        String query = "SELECT R FROM Rol R WHERE 1 = 1 "
        + "AND R.id IN (" + roles + ")";

        List<String> resultNames = new ArrayList<String>();
        for (Rol rol : (List<Rol>) entityManager.createQuery(query).getResultList() ) {
            resultNames.add(rol.getName());
        }

        return resultNames; 
    }

    @Override
    public String getRolesPathIds(Long [] rolesIds) {  

        String query = "SELECT R FROM Rol R WHERE 1 = 1 "
        + "AND R.id IN (''";

        for (int i = 0; i < rolesIds.length; i++ ){
            query += ", :roles_id" + i + "";
        }
        query += ")";

        Query queryObject = (Query) entityManager.createQuery(query);
        for (int i = 0; i < rolesIds.length; i++ ){
            queryObject.setParameter("roles_id" + i, rolesIds[i]);
        }
        List<Rol> listRol = queryObject.getResultList(); 
 
        String resultPaths = "";
        for (Rol rol : listRol ) {
            resultPaths += rol.getMenusAllows() != null && !rol.getMenusAllows().equals("") 
            ? rol.getMenusAllows() + "," : "";
        } 

        String stringArray = StringArrayUtil.stringArrayToString(resultPaths.split(","), true);  
        return stringArray;  
    }
    
    
}
