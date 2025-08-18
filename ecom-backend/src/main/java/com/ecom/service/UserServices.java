package com.ecom.service;

import com.ecom.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.ecom.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServices {

	@Autowired
	private UserRepo repo;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public List<User> getAllUser() {
		return repo.findAll();
	}

	public User getUserById(int id) {
		return repo.findById(id).orElse(null);
	}

	public User addUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return repo.save(user);
	}

	public User updateUser(int id, User updatedUser) {
		return repo.findById(id).map(user -> {
			user.setUsername(updatedUser.getUsername());
			user.setEmail(updatedUser.getEmail());
			user.setPassword(updatedUser.getPassword());
			user.setRole(updatedUser.getRole());
			return repo.save(user);
		}).orElse(null);
	}

	public void deleteUser(int id) {
		repo.deleteById(id);
		
	}
	
//	public Optional<User> findByUsername(String name){
//		return Optional.ofNullable(repo.findByUsername(name));
//	}
	public Optional<User> findByEmail(String email){
		return Optional.ofNullable(repo.findByEmail(email));
	}
	
	public boolean login(String email, String rawPassword) {
		User user = repo.findByEmail(email);
		if (user!= null) {
			return passwordEncoder.matches(rawPassword, user.getPassword());
		}
		return false;
	}


}
