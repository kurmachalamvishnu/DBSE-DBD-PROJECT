import React, { useState } from 'react';
import { X, Database, Table, Key, Code, CheckCircle, Copy } from 'lucide-react';

interface DbSpecsModalProps {
  onClose: () => void;
}

export const DbSpecsModal: React.FC<DbSpecsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'ddl' | 'dml'>('schema');
  const [copied, setCopied] = useState(false);

  const tables = [
    { name: 'patients', pk: 'patient_id', desc: 'Patient profile, allergies, blood group, emergency contact' },
    { name: 'clinics', pk: 'clinic_id', desc: 'Healthcare clinic facilities, location, operating hours, rating' },
    { name: 'specializations', pk: 'spec_id', desc: 'Medical domains (Cardiology, Pediatrics, Dermatology, etc.)' },
    { name: 'doctors', pk: 'doctor_id', desc: 'Physicians, consultation fee, qualification, clinic FK & spec FK' },
    { name: 'appointments', pk: 'appointment_id', desc: 'Self-service bookings, dates, timeslots, symptoms, status' },
    { name: 'queue_tokens', pk: 'token_id', desc: 'Live queue tracking tickets, counter rooms, wait times' },
    { name: 'prescriptions', pk: 'prescription_id', desc: 'Digital post-consultation prescriptions & medical advice' },
    { name: 'prescription_medications', pk: 'med_id', desc: 'Medication items, dosage, frequency & duration' },
    { name: 'lab_reports', pk: 'report_id', desc: 'Diagnostic results, lab summary & category status' },
    { name: 'invoices', pk: 'invoice_id', desc: 'Billing invoices, tax calculations, payment status & method' },
  ];

  const ddlSql = `-- Healthcare & Clinics Patient Self-Service Database Schema
CREATE DATABASE IF NOT EXISTS healthcare_db;
USE healthcare_db;

CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    allergies TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    spec_id INT NOT NULL,
    clinic_id INT NOT NULL,
    consultation_fee DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (spec_id) REFERENCES specializations(spec_id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id)
) ENGINE=InnoDB;

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    status ENUM('Confirmed', 'Checked-In', 'Completed', 'Cancelled'),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
) ENGINE=InnoDB;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ddlSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-slate-900 text-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-700 my-auto">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white">DBMS Relational Database Specifications</h3>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  MySQL 8.0
                </span>
              </div>
              <p className="text-xs text-slate-400">Healthcare & Clinics Mobile App for Patient Self Service</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 px-5 pt-3 space-x-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'schema' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Relational Entities (10 Tables)
          </button>
          <button
            onClick={() => setActiveTab('ddl')}
            className={`pb-3 border-b-2 transition ${
              activeTab === 'ddl' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            MySQL DDL Script (`schema.sql`)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Below are the 10 normalized MySQL relational database tables designed for the Healthcare Patient Self-Service system, complete with Primary Keys, Foreign Keys, and ENUM constraints.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tables.map((t) => (
                  <div key={t.name} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-amber-400 text-xs flex items-center">
                        <Table className="w-3.5 h-3.5 mr-1 text-slate-400" /> {t.name}
                      </span>
                      <span className="text-[10px] text-sky-400 font-mono flex items-center">
                        <Key className="w-3 h-3 mr-0.5" /> PK: {t.pk}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ddl' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Location: db/schema.sql</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto leading-relaxed">
                {ddlSql}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>📁 Files saved in project root `db/schema.sql` and `db/sample_data.sql`</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl transition"
          >
            Close Specs
          </button>
        </div>

      </div>
    </div>
  );
};
