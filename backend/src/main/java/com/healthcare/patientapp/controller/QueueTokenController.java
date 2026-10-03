package com.healthcare.patientapp.controller;

import com.healthcare.patientapp.model.QueueToken;
import com.healthcare.patientapp.repository.QueueTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tokens")
@CrossOrigin(origins = "*")
public class QueueTokenController {

    @Autowired
    private QueueTokenRepository queueTokenRepository;

    @GetMapping("/{id}")
    public ResponseEntity<QueueToken> getTokenById(@PathVariable Long id) {
        return queueTokenRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/next")
    public ResponseEntity<QueueToken> advanceQueueToken(@PathVariable Long id) {
        return queueTokenRepository.findById(id).map(token -> {
            token.setCurrentServingToken(token.getCurrentServingToken() + 1);
            if (token.getEstimatedWaitMins() != null && token.getEstimatedWaitMins() > 0) {
                token.setEstimatedWaitMins(Math.max(0, token.getEstimatedWaitMins() - 5));
            }
            if (token.getPatientsAhead() != null && token.getPatientsAhead() > 0) {
                token.setPatientsAhead(Math.max(0, token.getPatientsAhead() - 1));
            }
            if (token.getCurrentServingToken().equals(token.getTokenNumber())) {
                token.setStatus("In-Consultation");
            }
            return ResponseEntity.ok(queueTokenRepository.save(token));
        }).orElse(ResponseEntity.notFound().build());
    }
}
