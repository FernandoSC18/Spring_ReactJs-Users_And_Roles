package com.fernando.users_and_roles.model; 

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
 
@Entity
@Table(name = "roles")
public class Rol { 
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="role_id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="type")
    private String type; 

    @Column(name="list_menus_allows")
    private String menusAllows;    
  

    public Rol(){  
    }


    public Rol(String name, String description, String type, String menusAllows ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.menusAllows = menusAllows; 
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public String getMenusAllows() {
        return menusAllows;
    }


    public void setMenusAllows(String menusAllows) {
        this.menusAllows = menusAllows;
    }
 
}
