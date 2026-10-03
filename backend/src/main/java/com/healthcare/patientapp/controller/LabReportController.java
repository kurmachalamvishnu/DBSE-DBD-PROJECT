package com.healthcare.patientapp.controller;

import com.healthcare.patientapp.model.LabReport;
import com.healthcare.patientapp.repository.LabReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab-reports")
@CrossOrigin(origins = "*")
public class LabReportController {

    @Autowired
    private LabReportRepository labReportRepository;

    @GetMapping
    public List<LabReport> getAllLabReports() {
        return labReportRepository.findAll();
    }

    @GetMapping("/patient/{patientId}")
    public List<LabReport> getLabReportsByPatient(@PathVariable Long patientId) {
        return labReportRepository.findByPatientPatientId(patientId);
    }
}
