package com.healthcare.patientapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HealthcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthcareApplication.class, args);
        System.out.println("\n==========================================================");
        System.out.println("  Healthcare Patient Self-Service Spring Boot API Started!");
        System.out.println("  Port: 8080 | Base URL: http://localhost:8080/api");
        System.out.println("==========================================================\n");
    }
}
