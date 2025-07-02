package com.employeedemo.employeedemo.seeder;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.employeedemo.employeedemo.entity.Employee;
import com.employeedemo.employeedemo.repository.EmployeeRepository;
import com.github.javafaker.Faker;

@Component
public class DataSeeder implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;

    public DataSeeder(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) {
        Faker faker = new Faker();
        final int BATCH_SIZE = 1000;
        final int TOTAL = 500_000;

        for (int i = 0; i < TOTAL / BATCH_SIZE; i++) {
            List<Employee> batch = new ArrayList<>();
            for (int j = 0; j < BATCH_SIZE; j++) {
                Employee emp = new Employee();
                emp.setFirstName(faker.name().firstName());
                emp.setLastName(faker.name().lastName());
                emp.setEmail(faker.internet().emailAddress());
                emp.setPhoneNumber(faker.phoneNumber().cellPhone());
                emp.setJobTitle(faker.job().title());
                emp.setDepartment(faker.company().industry());
                emp.setCity(faker.address().city());
                emp.setState(faker.address().state());
                emp.setCountry(faker.address().country());
                batch.add(emp);
            }
            employeeRepository.saveAll(batch);
            System.out.println("Inserted " + ((i + 1) * BATCH_SIZE));
        }

        System.out.println("Seeding completed!");
    }
}