package com.example.furniture_backend.config;

import com.example.furniture_backend.entity.Product;
import com.example.furniture_backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Seeds products on first run. Image URLs point to frontend public folder
 * (e.g. /assests/images/products/... served by React app).
 */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() > 0) return;

            List<Product> products = List.of(
             
                product("Classic Bed", "Classic wooden bed with elegant design.", 32000, 6, "/assests/images/products/bed-2.jpg", "Bed"),

                product("Single Wardrobe", "Compact wardrobe with mirror.", 18000, 8, "/assests/images/products/bero-1.jpg", "Wardrobe"),
                product("Wooden Wardrobe", "Solid wooden wardrobe with shelves.", 26000, 5, "/assests/images/products/bero-2.jpg", "Wardrobe"),
                product("Premium Wardrobe", "Spacious premium wardrobe.", 34000, 4, "/assests/images/products/bero-3.jpg", "Wardrobe"),
                product("Modern Wardrobe", "Minimalist modern wardrobe.", 30000, 6, "/assests/images/products/bero-5.jpg", "Wardrobe"),

                product("Bookshelf", "Wooden bookshelf for home and office.", 12000, 10, "/assests/images/products/bookshelf-1.jpg", "Storage"),

                product("Classic Arm Chair", "Elegant arm chair with cushion comfort.", 14000, 7, "/assests/images/products/chair-1.jpg", "Chair"),
                product("Office Chair", "Ergonomic office chair with wheels.", 9000, 15, "/assests/images/products/chair-2.jpg", "Chair"),

                product("Coffee Table", "Designer coffee table for living room.", 11000, 9, "/assests/images/products/coffee-table-1.jpg", "Table"),

                product("Single Cot", "Comfortable single cot.", 15000, 10, "/assests/images/products/cot-1.jpg", "Bed"),
                product("Double Cot", "Spacious double cot.", 22000, 6, "/assests/images/products/cot-2.jpg", "Bed"),

                product("Dining Table", "6-seater dining table set.", 25000, 5, "/assests/images/products/dining-table-1.jpg", "Table"),

                product("Office Chair Pro", "Premium office chair with lumbar support.", 12000, 8, "/assests/images/products/office-chair-1.jpg", "Chair"),

                product("Fabric Sofa", "Comfortable fabric sofa.", 28000, 6, "/assests/images/products/sofa-1.jpg", "Sofa"),
                product("Luxury Sofa", "Luxury sofa with premium finish.", 35000, 4, "/assests/images/products/sofa-2.jpg", "Sofa"),
                product("L-Shaped Sofa", "Modern L-shaped sofa.", 42000, 3, "/assests/images/products/sofa-3.jpg", "Sofa"),

                product("Study Table", "Compact study table for students.", 9500, 12, "/assests/images/products/study-table.jpg", "Table"),
                product("Modern Bed", "Stylish modern bed with premium comfort.", 28000, 10, "/assests/images/products/bed-1.jpg", "Bed"),
                product("TV Unit", "Wall-mounted TV unit.", 18000, 6, "/assests/images/products/tv-unit-1.jpg", "Storage"),

                product("Wardrobe Deluxe", "Large wardrobe with sliding doors.", 38000, 4, "/assests/images/products/wardrobe-1.jpg", "Wardrobe")
            );
            productRepository.saveAll(products);
        };
    }

    private static Product product(String name, String desc, double price, int stock, String imageUrl, String category) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(desc);
        p.setPrice(price);
        p.setStock(stock);
        p.setImageUrl(imageUrl);
        p.setCategory(category);
        return p;
    }
}
