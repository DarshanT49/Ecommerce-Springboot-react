package com.ecom.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
public class User {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY )
	private int id;
	@Column(nullable = false, unique = true)
	private String username;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String password;
	
	private String role;
	@Temporal(TemporalType.TIMESTAMP)
	@JsonFormat (shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date createdAt;
	

    public User() {
        // Automatically set creation date when object is created
        this.createdAt = new Date();
    }
    
	public User(int id, String username, String email, String password, String role, Date createdAt) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.createdAt = createdAt;
	}


}
