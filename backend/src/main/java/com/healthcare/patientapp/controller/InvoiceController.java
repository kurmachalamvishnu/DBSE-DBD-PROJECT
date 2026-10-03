package com.healthcare.patientapp.controller;

import com.healthcare.patientapp.model.Invoice;
import com.healthcare.patientapp.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "*")
public class InvoiceController {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @GetMapping("/patient/{patientId}")
    public List<Invoice> getInvoicesByPatient(@PathVariable Long patientId) {
        return invoiceRepository.findByPatientPatientId(patientId);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Invoice> payInvoice(@PathVariable Long id, @RequestParam(defaultValue = "Card / Self-Service Digital Payment") String paymentMethod) {
        return invoiceRepository.findById(id).map(invoice -> {
            invoice.setStatus("Paid");
            invoice.setPaymentMethod(paymentMethod);
            return ResponseEntity.ok(invoiceRepository.save(invoice));
        }).orElse(ResponseEntity.notFound().build());
    }
}
