package com.junaid.backend;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.metamodel.Metamodel;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public ApplicationRunner printEntities(EntityManagerFactory emf) {
        return args -> {
            Metamodel mm = emf.getMetamodel();
            System.out.println("=== Hibernate is managing these entities:");
            mm.getEntities()
                    .stream()
                    .map(e -> "  • " + e.getName())
                    .sorted()
                    .forEach(System.out::println);
        };
    }
}