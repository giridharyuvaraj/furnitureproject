package com.example.furniture_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI furnitureOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Furniture E-Commerce API")
                        .description("Backend APIs for Furniture Store")
                        .version("1.0"));
    }
}
