import React, { useState } from 'react';
import { ActiveTab, Doctor, Appointment, QueueToken, PatientProfile, Invoice } from './types';
import {
  mockClinics,
  mockDoctors,
  mockAppointments,
  mockQueueToken,
  mockPrescriptions,
  mockLabReports,
  mockInvoices,
  mockPatientProfile
} from './data/mockData';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ClinicsDoctors } from './components/ClinicsDoctors';
import { BookAppointmentModal } from './components/BookAppointmentModal';
import { QueueTracker } from './components/QueueTracker';
import { MedicalRecords } from './components/MedicalRecords';
import { Billing } from './components/Billing';
import { Profile } from './components/Profile';
import { DbSpecsModal } from './components/DbSpecsModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true); // Default to Mobile Frame mode for lecturer demo
  
  // App Dynamic State
  const [patient, setPatient] = useState<PatientProfile>(mockPatientProfile);
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [clinics] = useState(mockClinics);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [queueToken, setQueueToken] = useState<QueueToken>(mockQueueToken);
  const [prescriptions] = useState(mockPrescriptions);
  const [labReports] = useState(mockLabReports);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);

  // Actions
  const handleOpenBookingWithDoctor = (doc?: Doctor) => {
    setSelectedDoctorForBooking(doc || null);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = (newApt: Appointment) => {
    setAppointments(prev => [newApt, ...prev]);
    if (newApt.tokenNumber) {
      setQueueToken({
        id: newApt.tokenId || 'tok-new',
        tokenNumber: newApt.tokenNumber,
        currentServingToken: 11,
        doctorName: newApt.doctorName,
        doctorSpecialization: newApt.doctorSpecialization,
        clinicName: newApt.clinicName,
        counterRoom: 'Room 204 (2nd Floor)',
        status: 'Waiting',
        estimatedWaitMins: 15,
        patientsAhead: newApt.tokenNumber - 11,
        appointmentTime: newApt.timeSlot
      });
    }
  };

  const handlePayInvoice = (invoiceId: string) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: 'Paid', paymentMethod: 'Card / Self-Service Digital Payment' }
          : inv
      )
    );
    alert('Payment processed successfully! Invoice marked as Paid.');
  };

  const handleUpdatePatient = (updated: PatientProfile) => {
    setPatient(updated);
    alert('Patient profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        onOpenBooking={() => handleOpenBookingWithDoctor()}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center py-4 px-2 sm:px-6">
        
        {/* MOBILE FRAME WRAPPER OR FULL RESPONSIVE WRAPPER */}
        <div className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-md h-[840px] bg-slate-100 rounded-[2.5rem] ring-12 ring-slate-900 shadow-2xl overflow-hidden relative border-4 border-slate-800 flex flex-col'
            : 'max-w-7xl bg-slate-100 rounded-3xl shadow-sm flex flex-col lg:flex-row overflow-hidden border border-slate-200'
        }`}>
          
          {/* Mobile Speaker Notch (Visual enhancement when in Mobile Frame mode) */}
          {isMobileFrame && (
            <div className="w-full bg-slate-900 h-6 flex justify-center items-center shrink-0 z-40">
              <div className="w-20 h-3 bg-slate-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-1 bg-slate-700 rounded-full mr-2"></div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Desktop Navigation Sidebar (Only in Full Desktop mode) */}
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenDbModal={() => setIsDbModalOpen(true)}
            isMobileFrame={isMobileFrame}
          />

          {/* Scrollable View Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {activeTab === 'dashboard' && (
              <Dashboard
                patient={patient}
                appointments={appointments}
                queueToken={queueToken}
                setActiveTab={setActiveTab}
                onOpenBooking={() => handleOpenBookingWithDoctor()}
                onOpenDbModal={() => setIsDbModalOpen(true)}
              />
            )}

            {activeTab === 'clinics' && (
              <ClinicsDoctors
                doctors={doctors}
                clinics={clinics}
                onSelectDoctorToBook={(doc) => handleOpenBookingWithDoctor(doc)}
              />
            )}

            {activeTab === 'queue' && (
              <QueueTracker initialQueueToken={queueToken} />
            )}

            {activeTab === 'records' && (
              <MedicalRecords prescriptions={prescriptions} labReports={labReports} />
            )}

            {activeTab === 'billing' && (
              <Billing invoices={invoices} onPayInvoice={handlePayInvoice} />
            )}

            {activeTab === 'profile' && (
              <Profile
                patient={patient}
                onUpdatePatient={handleUpdatePatient}
                onOpenDbModal={() => setIsDbModalOpen(true)}
              />
            )}
          </main>

          {/* Bottom Navigation (For Mobile View / Mobile Frame) */}
          {(isMobileFrame || window.innerWidth < 1024) && (
            <Navigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenDbModal={() => setIsDbModalOpen(true)}
              isMobileFrame={isMobileFrame}
            />
          )}

        </div>

      </div>

      {/* MODALS */}
      {isBookingOpen && (
        <BookAppointmentModal
          doctors={doctors}
          selectedDoctor={selectedDoctorForBooking}
          onClose={() => setIsBookingOpen(false)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {isDbModalOpen && (
        <DbSpecsModal onClose={() => setIsDbModalOpen(false)} />
      )}

    </div>
  );
};

export default App;
