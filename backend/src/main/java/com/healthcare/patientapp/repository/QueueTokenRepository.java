package com.healthcare.patientapp.repository;

import com.healthcare.patientapp.model.QueueToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QueueTokenRepository extends JpaRepository<QueueToken, Long> {
    Optional<QueueToken> findByDoctorDoctorId(Long doctorId);
}
