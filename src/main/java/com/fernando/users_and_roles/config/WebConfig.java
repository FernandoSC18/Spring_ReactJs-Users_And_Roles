package com.fernando.users_and_roles.config; 
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry; 
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer; 

@Configuration
public class WebConfig { 

	/*
	* Configure Cors Origins 
	*/
	@Bean  
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) { 
				registry.addMapping("/api/**")
					.allowedOrigins("http://localhost:3000"
					, "http://localhost:8080")
					.allowedMethods("GET", "POST","PUT", "DELETE"); 

				registry.addMapping("/session/**")
					.allowedOrigins("http://localhost:3000"
					, "http://localhost:8080") 
					.allowedMethods("GET", "POST","PUT", "DELETE"); 
			}
		};
	}
} 