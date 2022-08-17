package com.fernando.users_and_roles.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RestController;

import com.fernando.users_and_roles.dao.MenuRoutesDao;
import com.fernando.users_and_roles.dao.RolDao;
import com.fernando.users_and_roles.dao.UserDao;
import com.fernando.users_and_roles.model.MenuRoutes;
import com.fernando.users_and_roles.model.User;
import com.fernando.users_and_roles.utils.JwtProvider;
import com.fernando.users_and_roles.utils.StringArrayUtil;

@RestController
@RequestMapping("/api")
public class MenuRoutesController {

    @Autowired
    private MenuRoutesDao menuRoutesDao; 

    @Autowired
    private UserDao userDao; 

    @Autowired
    private RolDao rolDao; 

    @Autowired
    private JwtProvider jwtProvider;

    /*
     * GET service protected by Authorization, get Menu Paths by User
     * Get user by id and get user roles, then get paths with roles id
     * Return a paths list List 
     */
    @PreAuthorize("isAuthenticated()")  
    @GetMapping("/routes") 
    public ResponseEntity<?> getAllRoutes(@RequestHeader("Authorization") String token){          
        Long userId = jwtProvider.getUserIdToken(token); 
        User currentUser = userDao.getById(userId);
        Long [] rolesIds = StringArrayUtil.stringToLongArray(currentUser.getRoles(), ",");
        Long [] pathsIds = StringArrayUtil.stringToLongArray(rolDao.getRolesPathIds(rolesIds), ","); 

        return new ResponseEntity <List<MenuRoutes>>(menuRoutesDao.getAll(pathsIds), HttpStatus.OK); 
    }

}
