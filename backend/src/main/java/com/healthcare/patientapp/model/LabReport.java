package com.healthcare.patientapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "lab_reports")
public class LabReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    private String testName;
    private String category;
    private String conductedDate;
    private String status; // Normal, Attention Needed, Pending
    private String labName;

    @Column(columnDefinition = "TEXT")
    private String summary;

    public LabReport() {}

    public Long getReportId() { return reportId; }
    public void setReportId(Long reportId) { this.reportId = reportId; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getConductedDate() { return conductedDate; }
    public void setConductedDate(String conductedDate) { this.conductedDate = conductedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLabName() { return labName; }
    public void setLabName(String labName) { this.labName = labName; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
