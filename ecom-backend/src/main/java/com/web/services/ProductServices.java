package com.web.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.model.Product;
import com.web.repository.ProductRepo;

@Service 
public class ProductServices {

	@Autowired
	private ProductRepo repo;
	
	
	public List<Product> getAllProduct() {
		return repo.findAll();
	}


	public Product getProductById(int id) {
		return repo.findById(id).orElse(null);
	}


	public Product addProduct(Product product) {
		return repo.save(product);
	}

	
	public Product updateProduct(int id, Product updatedProduct) {
	    return repo.findById(id).map(product -> {
	        product.setDescroption(updatedProduct.getDescroption());
	        product.setBrand(updatedProduct.getBrand());
	        product.setPrice(updatedProduct.getPrice());
	        product.setCategory(updatedProduct.getCategory());
	        product.setRelaseDate(updatedProduct.getRelaseDate());
	        product.setAvailable(updatedProduct.isAvailable());
	        product.setQuantity(updatedProduct.getQuantity());
	        return repo.save(product);
	    }).orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
	}


	public void deleteProductById(int id) {
		repo.deleteById(id);
		
	}


	

}
