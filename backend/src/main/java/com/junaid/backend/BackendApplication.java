// ==============================================
// File: BackendApplication.java
// Role:
//   - This is the main class that launches the entire Spring Boot backend.
//   - It starts the embedded server and initializes all Spring components.
//   - Also defines a bean that prints all Hibernate-managed entities for debugging.
//
// Why it matters:
//   - Without this file, the application won't start.
//   - It gives a hook (ApplicationRunner) to inspect the JPA setup after boot.
//
// Dependencies:
//   - @SpringBootApplication: enables auto-configuration and component scanning.
//   - ApplicationRunner: used to run code after the app is fully started.
//   - EntityManagerFactory + Metamodel: used to list all managed entity classes.
//
// Related files:
//   - LoanApplication.java, User.java (these are entity classes that will be listed)
// ==============================================

package com.junaid.backend; // Declares the Java package this class belongs to

import jakarta.persistence.EntityManagerFactory; // Jakarta Persistence (JPA) import for database handling
import jakarta.persistence.metamodel.Metamodel; // Jakarta Persistence (JPA) import for database handling
import org.springframework.boot.ApplicationRunner; // Spring Framework import (dependency injection, web, security, etc.)
import org.springframework.boot.SpringApplication; // Spring Framework import (dependency injection, web, security, etc.)
import org.springframework.boot.autoconfigure.SpringBootApplication; // Spring Framework import (dependency injection, web, security, etc.)
import org.springframework.context.annotation.Bean; // Spring Framework import (dependency injection, web, security, etc.)

@SpringBootApplication // Annotation to provide metadata or behavior to classes/methods/fields
public class BackendApplication { // Declares a class

    public static void main(String[] args) { // Declares a method
        SpringApplication.run(BackendApplication.class, args); // Logic inside method or block
    } // Logic inside method or block

    @Bean // Annotation to provide metadata or behavior to classes/methods/fields
    public ApplicationRunner printEntities(EntityManagerFactory emf) { // Declares a method
        return args -> { // Returns a value from a method
            Metamodel mm = emf.getMetamodel(); // Logic inside method or block
            System.out.println("=== Hibernate is managing these entities:"); // Logic inside method or block
            mm.getEntities() // Logic inside method or block
                    .stream() // Logic inside method or block
                    .map(e -> "  • " + e.getName()) // Logic inside method or block
                    .sorted() // Logic inside method or block
                    .forEach(System.out::println); // Logic inside method or block
        }; // Logic inside method or block
    } // Logic inside method or block
} // Logic inside method or block