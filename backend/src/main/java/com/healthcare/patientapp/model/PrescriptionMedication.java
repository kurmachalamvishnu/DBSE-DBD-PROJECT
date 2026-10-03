package com.healthcare.patientapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "prescription_medications")
public class PrescriptionMedication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medId;

    private String name;
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;

    public PrescriptionMedication() {}

    public PrescriptionMedication(String name, String dosage, String frequency, String duration, String instructions) {
        this.name = name;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.instructions = instructions;
    }

    public Long getMedId() { return medId; }
    public void setMedId(Long medId) { this.medId = medId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }
}
