package com.fernando.users_and_roles.config;  

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; 
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; 
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fernando.users_and_roles.utils.JwtEntryPoint;
import com.fernando.users_and_roles.utils.JwtFilter;

@Configuration
@EnableWebSecurity 
@EnableGlobalMethodSecurity(
  prePostEnabled = true//, // @PreAuthorize and @PostAuthorize 
  //securedEnabled = true // @Secured 
  //, jsr250Enabled = true   // @RoleAllowed 
  )  
public class WebSecurity {


	@Autowired
	JwtEntryPoint jwtEntryPoint;

	@Bean
	public JwtFilter jwtFilter (){
		return new JwtFilter();
	}

	@Bean
	public PasswordEncoder passwordEncoder (){ 
		return new BCryptPasswordEncoder();
	}
	     

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {   
		/*
		* 1. Se desactiva el uso de cookies
		* 2. Se activa la configuración CORS con los valores por defecto
		* 3. Se desactiva el filtro CSRF
		* 4. Se indica que el login no requiere autenticación
		* 5. Se indica que el resto de URLs esten securizadas
		*/ 

		http 
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
			.cors().and()
			.csrf().disable() 
			.addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
			.authorizeRequests()
                //In SPA paths of UX not working, only Api paths works but it has been chosen to do it by method
                .antMatchers("/", "/index", "/**").permitAll()  

				//Secure Api Paths
				.antMatchers("/session/**" ).permitAll()  
				//.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login")
				.permitAll()
				.and()
			.logout()
				.permitAll()
                .and()
            .exceptionHandling().authenticationEntryPoint(jwtEntryPoint);

				 
	    return http.build();
	} 
 
}

