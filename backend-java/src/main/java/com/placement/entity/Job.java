package com.placement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 200)
    private String company;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String requirements; // JSON array stored as text

    // Salary range fields  
    private Double salaryMin;
    private Double salaryMax;
    private String salaryCurrency = "INR";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private JobType type = JobType.FULL_TIME;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by", nullable = false)
    private User postedBy;

    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private JobStatus status = JobStatus.active;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    private java.util.List<Application> applications;

    public enum JobType {
        FULL_TIME("Full-time"),
        PART_TIME("Part-time"),
        INTERNSHIP("Internship"),
        CONTRACT("Contract");

        private final String value;

        JobType(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static JobType fromValue(String value) {
            for (JobType t : values()) {
                if (t.value.equalsIgnoreCase(value)) return t;
            }
            return FULL_TIME;
        }
    }

    public enum JobStatus {
        active, closed, draft
    }
}
