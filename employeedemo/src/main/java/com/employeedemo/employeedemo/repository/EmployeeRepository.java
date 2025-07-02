package com.employeedemo.employeedemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employeedemo.employeedemo.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}