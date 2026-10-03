package com.healthcare.patientapp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "queue_tokens")
public class QueueToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    private Integer tokenNumber;
    private Integer currentServingToken;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String counterRoom;
    private String status; // Waiting, In-Consultation, Completed, Skipped
    private Integer estimatedWaitMins;
    private Integer patientsAhead;
    private String appointmentTime;

    public QueueToken() {}

    public Long getTokenId() { return tokenId; }
    public void setTokenId(Long tokenId) { this.tokenId = tokenId; }

    public Integer getTokenNumber() { return tokenNumber; }
    public void setTokenNumber(Integer tokenNumber) { this.tokenNumber = tokenNumber; }

    public Integer getCurrentServingToken() { return currentServingToken; }
    public void setCurrentServingToken(Integer currentServingToken) { this.currentServingToken = currentServingToken; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public String getCounterRoom() { return counterRoom; }
    public void setCounterRoom(String counterRoom) { this.counterRoom = counterRoom; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getEstimatedWaitMins() { return estimatedWaitMins; }
    public void setEstimatedWaitMins(Integer estimatedWaitMins) { this.estimatedWaitMins = estimatedWaitMins; }

    public Integer getPatientsAhead() { return patientsAhead; }
    public void setPatientsAhead(Integer patientsAhead) { this.patientsAhead = patientsAhead; }

    public String getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(String appointmentTime) { this.appointmentTime = appointmentTime; }
}
