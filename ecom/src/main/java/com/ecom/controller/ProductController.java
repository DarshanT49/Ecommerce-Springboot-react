package com.ecom.controller;

import java.util.List;

import com.ecom.model.Product;
import com.ecom.service.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;


@RestController
@CrossOrigin
@RequestMapping ("/api")
public class ProductController {
	
	@Autowired 
	private ProductServices service;
	
	@GetMapping ("/products")
	public List<Product> getAllProduct(){
		return service.getAllProduct();
	}
	
	@GetMapping("/products/{id}")
	public Product getById(@PathVariable int id ) {
		return service.getProductById(id);
	}
	
	@PostMapping ("/products")
	public Product addProduct(@RequestBody Product product) {
		return service.addProduct(product);
	}
	
	@PutMapping ("/products/{id}")
	public Product updateProduct(@PathVariable int id , @RequestBody Product product) {
		return service.updateProduct(id, product);
	}
	
	@DeleteMapping ("/products/{id}")
	public void deleteProduct(@PathVariable int id) {
		service.deleteProductById(id);
	}

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts (@RequestParam String keyword){
        List<Product> products = service.searchProducts(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
