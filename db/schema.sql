-- =========================================================================
-- DBMS Project: Healthcare & Clinics Mobile App for Patient Self Service
-- Database Schema Definition (MySQL 8.0 Compatible)
-- Author: DBMS Course Project
-- =========================================================================

CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

-- -------------------------------------------------------------------------
-- 1. Table: PATIENTS
-- Core patient demographic and medical profile information.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(20),
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 2. Table: CLINICS
-- Information on healthcare facilities/clinics in the network.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clinics (
    clinic_id INT AUTO_INCREMENT PRIMARY KEY,
    clinic_name VARCHAR(150) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    opening_time TIME DEFAULT '08:00:00',
    closing_time TIME DEFAULT '20:00:00',
    rating DECIMAL(3,2) DEFAULT 4.5,
    is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 3. Table: SPECIALIZATIONS
-- Medical specialties (Cardiology, Pediatrics, Dermatology, etc.)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS specializations (
    spec_id INT AUTO_INCREMENT PRIMARY KEY,
    spec_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 4. Table: DOCTORS
-- Medical professionals attached to clinics and specializations.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    spec_id INT NOT NULL,
    clinic_id INT NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    experience_years INT DEFAULT 0,
    consultation_fee DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,2) DEFAULT 4.8,
    is_available TINYINT(1) DEFAULT 1,
    FOREIGN KEY (spec_id) REFERENCES specializations(spec_id) ON DELETE CASCADE,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 5. Table: APPOINTMENTS
-- Self-service patient appointment bookings.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    clinic_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    status ENUM('Confirmed', 'Checked-In', 'Completed', 'Cancelled') DEFAULT 'Confirmed',
    symptoms_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 6. Table: QUEUE_TOKENS
-- Live token queue tracking for patient self-service check-in.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS queue_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    token_number INT NOT NULL,
    appointment_id INT UNIQUE NOT NULL,
    doctor_id INT NOT NULL,
    counter_room VARCHAR(20) NOT NULL,
    status ENUM('Waiting', 'In-Consultation', 'Completed', 'Skipped') DEFAULT 'Waiting',
    estimated_wait_mins INT DEFAULT 15,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 7. Table: PRESCRIPTIONS
-- E-prescriptions issued after consultation.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS prescriptions (
    prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    diagnosis VARCHAR(255) NOT NULL,
    instructions TEXT,
    issued_date DATE NOT NULL,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 8. Table: PRESCRIPTION_MEDICATIONS
-- Individual items inside a digital prescription.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS prescription_medications (
    med_id INT AUTO_INCREMENT PRIMARY KEY,
    prescription_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration_days INT NOT NULL,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 9. Table: LAB_REPORTS
-- Patient self-service downloadable lab reports & diagnostic results.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lab_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    test_name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    result_status ENUM('Normal', 'Attention Needed', 'Pending') DEFAULT 'Normal',
    lab_name VARCHAR(100) NOT NULL,
    conducted_date DATE NOT NULL,
    summary_notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------------------------
-- 10. Table: INVOICES & PAYMENTS
-- Self-service billing and digital receipts.
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(30) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    appointment_id INT,
    amount DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
    payment_method VARCHAR(50),
    invoice_date DATE NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Indexing for high performance queries
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_tokens_doctor ON queue_tokens(doctor_id, status);
