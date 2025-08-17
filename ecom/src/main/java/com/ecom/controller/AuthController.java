package com.ecom.controller;

import java.util.HashMap;
import java.util.Map;

import com.ecom.model.User;
import com.ecom.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserServices service;
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Map<String , String> loginData){
		String email = loginData.get("email");
		String password = loginData.get("password");
		
		Map<String , Object> response = new HashMap<>();
		
		if (service.login(email, password)) {
			User user = service.findByEmail(email).orElse(null);
			response.put("Status", "Success");
			response.put("message", "login Successful");
			response.put("user", user);
			
		}else {
            response.put("status", "error");
            response.put("message", "Invalid username or password");
        }
		
		return response;
			
	}

}


