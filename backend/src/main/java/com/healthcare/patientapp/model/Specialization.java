package com.healthcare.patientapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "specializations")
public class Specialization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long specId;

    @Column(nullable = false, unique = true, length = 100)
    private String specName;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Specialization() {}

    public Specialization(String specName, String description) {
        this.specName = specName;
        this.description = description;
    }

    public Long getSpecId() { return specId; }
    public void setSpecId(Long specId) { this.specId = specId; }

    public String getSpecName() { return specName; }
    public void setSpecName(String specName) { this.specName = specName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
