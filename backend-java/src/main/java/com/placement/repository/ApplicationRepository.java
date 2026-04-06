package com.placement.repository;

import com.placement.entity.Application;
import com.placement.entity.Application.ApplicationStatus;
import com.placement.entity.Job;
import com.placement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    Optional<Application> findByStudentAndJob(User student, Job job);
    
    boolean existsByStudentAndJob(User student, Job job);

    List<Application> findByStudent(User student);

    List<Application> findByJob(Job job);

    List<Application> findByJobIn(List<Job> jobs);

    List<Application> findByStatus(ApplicationStatus status);

    long countByStatus(ApplicationStatus status);
}
