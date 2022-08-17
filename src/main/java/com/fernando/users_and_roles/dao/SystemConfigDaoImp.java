package com.fernando.users_and_roles.dao;  

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional; 
import org.springframework.stereotype.Repository;

import com.fernando.users_and_roles.model.SystemConfig;

@Repository
@Transactional
public class SystemConfigDaoImp implements SystemConfigDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public void modify(SystemConfig systemConfig) {
        entityManager.merge(systemConfig); 
    }

    @Override
    public List<SystemConfig> getAll() {
        String query = "SELECT SC FROM SystemConfig SC WHERE 1 = 1"; 
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public SystemConfig getById(int id) { 
        return entityManager.find(SystemConfig.class, id);
    }
    
}
