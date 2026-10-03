import React, { useState } from 'react';
import { Doctor, Appointment } from '../types';
import { X, Calendar, Clock, CheckCircle, QrCode, Stethoscope, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

interface BookAppointmentModalProps {
  doctors: Doctor[];
  selectedDoctor?: Doctor | null;
  onClose: () => void;
  onConfirmBooking: (newAppointment: Appointment) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  doctors,
  selectedDoctor: initialDoctor,
  onClose,
  onConfirmBooking
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [doctor, setDoctor] = useState<Doctor>(initialDoctor || doctors[0]);
  const [selectedDate, setSelectedDate] = useState('2026-09-18');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [symptoms, setSymptoms] = useState('');
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingCode = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const tokenNum = Math.floor(15 + Math.random() * 10);
    
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      bookingCode,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorAvatar: doctor.avatarUrl,
      clinicName: doctor.clinicName,
      clinicAddress: '102 Healthcare Avenue, Downtown',
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'Confirmed',
      symptoms: symptoms || 'Routine self-service checkup',
      fee: doctor.consultationFee,
      tokenId: `tok-${tokenNum}`,
      tokenNumber: tokenNum,
      qrCodeValue: `CAREPOINT-SELFSERVICE-${bookingCode}-TOK-${tokenNum}`
    };

    setConfirmedApt(newApt);
    onConfirmBooking(newApt);
    setStep(3); // Go to Confirmation Screen
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 my-auto transition-all">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base">Self-Service Clinic Booking</h3>
              <p className="text-xs text-slate-300">Step {step} of 3</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: SELECT DOCTOR & TIME */}
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Doctor Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Specialist Doctor
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {doctors.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setDoctor(d)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        doctor.id === d.id
                          ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={d.avatarUrl} alt={d.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{d.name}</p>
                          <p className="text-[11px] text-sky-600 font-medium">{d.specialization} • ${d.consultationFee}</p>
                        </div>
                      </div>
                      {doctor.id === d.id && (
                        <CheckCircle className="w-5 h-5 text-sky-600 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Visit Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-09-17"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Available Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-bold rounded-xl border transition ${
                        selectedSlot === slot
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                >
                  Continue to Patient Details &rarr;
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: SYMPTOMS & REASON */}
          {step === 2 && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Summary Card */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center space-x-3">
                <img src={doctor.avatarUrl} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{doctor.name}</h4>
                  <p className="text-[11px] text-sky-700">{doctor.clinicName}</p>
                  <p className="text-[11px] text-slate-600 font-medium">
                    📅 {selectedDate} at {selectedSlot}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Chief Complaint / Reason for Visit
                </label>
                <textarea
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Mild headache, blood pressure review, routine skin consultation..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Consultation Fee:</span>
                  <span className="font-bold text-slate-800">${doctor.consultationFee}.00</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>E-Self-Service Convenience Fee:</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Payable at Counter:</span>
                  <span className="text-sky-600 text-sm">${doctor.consultationFee}.00</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition"
                >
                  Confirm & Generate Digital Token
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: CONFIRMATION & DIGITAL TOKEN DISPLAY */}
          {step === 3 && confirmedApt && (
            <div className="text-center space-y-4 py-2">
              
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
                  Appointment Confirmed!
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                  Booking #{confirmedApt.bookingCode}
                </h3>
                <p className="text-xs text-slate-500">
                  Your self-service queue token has been generated.
                </p>
              </div>

              {/* Digital QR & Token Pass Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">TOKEN NUMBER</p>
                    <p className="text-2xl font-black text-amber-400">#{confirmedApt.tokenNumber}</p>
                  </div>
                  
                  {/* Mock QR Code display */}
                  <div className="bg-white p-2 rounded-xl text-slate-900 flex flex-col items-center">
                    <QrCode className="w-10 h-10" />
                    <span className="text-[8px] font-mono font-bold mt-0.5">SCAN AT CLINIC</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400">Doctor</p>
                    <p className="font-bold text-white">{confirmedApt.doctorName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Date & Slot</p>
                    <p className="font-bold text-white">{confirmedApt.date} ({confirmedApt.timeSlot})</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
              >
                Go to My Dashboard
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
