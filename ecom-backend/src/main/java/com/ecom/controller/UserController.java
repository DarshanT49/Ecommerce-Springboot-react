package com.ecom.controller;

import java.util.List;

import com.ecom.model.User;
import com.ecom.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserServices service;
	
	@GetMapping("/user")
	public List<User> getAllUser(){
		return service.getAllUser();
	}
	
	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable int id) {
		return service.getUserById(id);
	}
	
	@PostMapping("/user")
	public User addUser(@RequestBody User user) {
		return service.addUser(user);
	}
	
	@PutMapping("/user/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User user) {
		return service.updateUser(id, user);
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable int id) {
		service.deleteUser(id);
	}
	

}
