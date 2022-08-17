package com.fernando.users_and_roles.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List; 
 
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails; 

public class UserUserDetails implements UserDetails {
 
    private Long id;  
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities; 
    
    public UserUserDetails(Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id; 
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserUserDetails build(User user, List<String> authorities){ 
        List<GrantedAuthority> grantAuthorities = new ArrayList<GrantedAuthority>();
        for (String a : authorities) { 
            grantAuthorities.add(new SimpleGrantedAuthority(a)) ; 
        }  
         
        UserUserDetails newUser = new UserUserDetails(user.getId(), user.getEmail(), user.getPassword(), grantAuthorities); 
        return newUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }
}