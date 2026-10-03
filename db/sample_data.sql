-- =========================================================================
-- DBMS Project: Healthcare & Clinics Mobile App for Patient Self Service
-- Database Sample Seed Data
-- =========================================================================

USE healthcare_db;

-- 1. Insert Specializations
INSERT INTO specializations (spec_name, description) VALUES
('Cardiology', 'Heart, blood vessels, and cardiovascular health diagnosis & care'),
('Pediatrics', 'Comprehensive medical care for infants, children, and adolescents'),
('Dermatology', 'Skin, hair, nail conditions, and aesthetic treatments'),
('General Medicine', 'Primary care, routine health checkups, and general medical illnesses'),
('Neurology', 'Brain, spinal cord, and nerve disorders'),
('Orthopedics', 'Bone, joint, ligament, and musculoskeletal system treatment');

-- 2. Insert Clinics
INSERT INTO clinics (clinic_name, address, city, contact_number, rating) VALUES
('CityCare Multispecialty Clinic', '102 Healthcare Avenue, Downtown', 'Metropolis', '+1 (555) 019-2831', 4.9),
('Sunshine Children & Family Health', '45 Parkline Drive, Westside', 'Metropolis', '+1 (555) 042-8819', 4.8),
('Apex Heart & Vascular Center', '88 Medical Hub, Suite 300', 'Metropolis', '+1 (555) 077-4100', 4.95),
('DermaGlow Skin & Laser Care', '12 Boulevard Plaza, Northside', 'Metropolis', '+1 (555) 091-6622', 4.7);

-- 3. Insert Doctors
INSERT INTO doctors (full_name, spec_id, clinic_id, qualification, experience_years, consultation_fee, rating) VALUES
('Dr. Sarah Jenkins', 1, 3, 'MD, FACC - Senior Cardiologist', 14, 120.00, 4.9),
('Dr. Robert Chen', 4, 1, 'MD - General Physician', 10, 60.00, 4.8),
('Dr. Elena Rostova', 3, 4, 'MD, DNB - Dermatologist', 8, 85.00, 4.7),
('Dr. Marcus Vance', 2, 2, 'MD - Pediatrician', 12, 75.00, 4.9),
('Dr. Ananya Sharma', 5, 1, 'DM (Neurology), MD', 11, 110.00, 4.85),
('Dr. David Miller', 6, 1, 'MS (Orthopedics)', 15, 100.00, 4.75);

-- 4. Insert Sample Patient Profile
INSERT INTO patients (full_name, email, phone, dob, gender, blood_group, address, emergency_contact, allergies) VALUES
('Alexander Wright', 'alex.wright@example.com', '+1 (555) 014-9921', '1992-05-14', 'Male', 'O+', '742 Evergreen Terrace, Metropolis', '+1 (555) 999-0112', 'Penicillin, Dust Mites');

-- 5. Insert Appointments
INSERT INTO appointments (booking_code, patient_id, doctor_id, clinic_id, appointment_date, time_slot, status, symptoms_description) VALUES
('APT-2026-9041', 1, 2, 1, '2026-09-17', '10:30 AM', 'Checked-In', 'Routine blood pressure checkup and mild seasonal headache'),
('APT-2026-8812', 1, 1, 3, '2026-09-22', '02:00 PM', 'Confirmed', 'Annual ECG monitoring and cardiology consultation'),
('APT-2026-7510', 1, 3, 4, '2026-08-15', '11:00 AM', 'Completed', 'Skin rash evaluation and prescription renewal');

-- 6. Insert Live Queue Token
INSERT INTO queue_tokens (token_number, appointment_id, doctor_id, counter_room, status, estimated_wait_mins) VALUES
(14, 1, 2, 'Room 204 (2nd Floor)', 'Waiting', 12);

-- 7. Insert Prescription
INSERT INTO prescriptions (appointment_id, patient_id, doctor_id, diagnosis, instructions, issued_date) VALUES
(3, 1, 3, 'Contact Dermatitis', 'Apply cream twice daily after cleaning skin. Avoid harsh soaps.', '2026-08-15');

-- 8. Insert Prescription Medications
INSERT INTO prescription_medications (prescription_id, medicine_name, dosage, frequency, duration_days) VALUES
(1, 'Hydrocortisone Cream 1%', 'Thin layer', 'Twice daily', 7),
(1, 'Cetirizine 10mg', '1 Tablet', 'Once daily at bedtime', 10);

-- 9. Insert Lab Reports
INSERT INTO lab_reports (patient_id, test_name, category, result_status, lab_name, conducted_date, summary_notes) VALUES
(1, 'Complete Blood Count (CBC)', 'Haematology', 'Normal', 'CityCare Central Labs', '2026-09-10', 'Hemoglobin 14.8 g/dL, WBC 6.5 k/uL - All metrics within healthy range.'),
(1, 'Lipid Profile & Cholesterol', 'Biochemistry', 'Attention Needed', 'CityCare Central Labs', '2026-09-10', 'Total Cholesterol 215 mg/dL (Slightly elevated). Recommended low sodium diet.');

-- 10. Insert Invoices
INSERT INTO invoices (invoice_number, patient_id, appointment_id, amount, tax, total_amount, status, payment_method, invoice_date) VALUES
('INV-2026-0091', 1, 1, 60.00, 5.00, 65.00, 'Pending', 'Pending Online', '2026-09-17'),
('INV-2026-0045', 1, 3, 85.00, 7.00, 92.00, 'Paid', 'Credit Card (Visa)', '2026-08-15');
