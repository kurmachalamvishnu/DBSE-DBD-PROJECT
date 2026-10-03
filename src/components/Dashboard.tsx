import React from 'react';
import { ActiveTab, Appointment, QueueToken, PatientProfile } from '../types';
import { Calendar, Clock, Stethoscope, FileText, CreditCard, Activity, QrCode, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Database } from 'lucide-react';

interface DashboardProps {
  patient: PatientProfile;
  appointments: Appointment[];
  queueToken: QueueToken;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBooking: () => void;
  onOpenDbModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  patient,
  appointments,
  queueToken,
  setActiveTab,
  onOpenBooking,
  onOpenDbModal
}) => {
  const upcomingAppointments = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Checked-In');

  return (
    <div className="space-y-6 pb-20">
      
      {/* DBMS Lecturer Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30">
                DBMS Project Showcase
              </span>
              <span className="text-xs text-slate-300">Healthcare Patient Self-Service</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Welcome back, {patient.name}! 👋
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Manage your clinic appointments, live queue tokens, digital prescriptions & billing.
            </p>
          </div>
          
          <button
            onClick={onOpenDbModal}
            className="flex items-center space-x-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md transition shrink-0"
          >
            <Database className="w-4 h-4" />
            <span>View MySQL DB Specs</span>
          </button>
        </div>
      </div>

      {/* Live Queue Token Tracker Banner */}
      <div className="bg-white rounded-2xl border border-sky-200 shadow-sm p-4 sm:p-5 relative overflow-hidden">
        <div className="bg-sky-50 border-l-4 border-sky-600 -m-4 sm:-m-5 p-4 sm:p-5 mb-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex flex-col items-center justify-center font-extrabold text-lg shadow-md shrink-0">
                <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">TOKEN</span>
                <span>#{queueToken.tokenNumber}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-ping"></span>
                    Live Ticket Check-In
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{queueToken.counterRoom}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  {queueToken.doctorName} <span className="text-xs text-slate-500 font-normal">({queueToken.doctorSpecialization})</span>
                </h3>
                <p className="text-xs text-slate-600">
                  {queueToken.clinicName}
                </p>
              </div>
            </div>

            {/* Live Queue Counter Box */}
            <div className="flex items-center space-x-4 bg-white px-4 py-2.5 rounded-xl border border-sky-100 shadow-xs w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Current Serving</p>
                <p className="text-lg font-extrabold text-slate-800">Token #{queueToken.currentServingToken}</p>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Est. Wait Time</p>
                <p className="text-lg font-extrabold text-sky-600">{queueToken.estimatedWaitMins} mins</p>
              </div>
              <button
                onClick={() => setActiveTab('queue')}
                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition"
                title="View Full Live Queue Details"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles (Self Service Modules) */}
      <div>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Self-Service Portal Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <button
            onClick={onOpenBooking}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-500 to-sky-600 text-white rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-center">Book Appointment</span>
            <span className="text-[10px] text-sky-100 mt-0.5">Select Doctor & Time</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-sky-300 hover:bg-sky-50/50 hover:scale-[1.02] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">Live Queue Tracker</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Real-time status</span>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-sky-300 hover:bg-sky-50/50 hover:scale-[1.02] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">Rx & Lab Reports</span>
            <span className="text-[10px] text-slate-500 mt-0.5">Digital prescriptions</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-sky-300 hover:bg-sky-50/50 hover:scale-[1.02] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-bold text-slate-800 text-center">Invoices & Pay</span>
            <span className="text-[10px] text-slate-500 mt-0.5">1 Pending Invoice</span>
          </button>

        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">My Upcoming Visits</h3>
          <button
            onClick={() => setActiveTab('clinics')}
            className="text-xs text-sky-600 font-semibold hover:underline flex items-center"
          >
            Find Doctor <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-slate-200">
            <p className="text-sm text-slate-500">No upcoming appointments scheduled.</p>
            <button
              onClick={onOpenBooking}
              className="mt-3 inline-flex items-center space-x-1.5 bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-semibold"
            >
              <span>+ Schedule Visit Now</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 relative hover:border-sky-300 transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={apt.doctorAvatar}
                      alt={apt.doctorName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-100"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{apt.doctorName}</h4>
                      <p className="text-xs text-sky-600 font-medium">{apt.doctorSpecialization}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{apt.clinicName}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    apt.status === 'Checked-In'
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-sky-100 text-sky-700 border border-sky-300'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-2 text-slate-700 font-medium">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700 font-medium">
                    <Clock className="w-4 h-4 text-sky-600" />
                    <span>{apt.timeSlot}</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    ${apt.fee}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-mono">Code: {apt.bookingCode}</span>
                  <button
                    onClick={() => setActiveTab('queue')}
                    className="flex items-center space-x-1 text-xs text-sky-600 font-bold hover:text-sky-700"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View Digital Ticket</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Patient Health Summary & Quick Vitals Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Blood Pressure */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase font-semibold text-slate-400">Blood Pressure</p>
            <p className="text-base font-extrabold text-slate-800">{patient.vitals.bloodPressure}</p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-0.5" /> Optimal Range
            </p>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase font-semibold text-slate-400">Heart Rate</p>
            <p className="text-base font-extrabold text-slate-800">{patient.vitals.heartRate} bpm</p>
            <p className="text-[10px] text-slate-500">Resting Pulse</p>
          </div>
        </div>

        {/* Allergies Alert */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase font-semibold text-slate-400">Known Allergies</p>
            <p className="text-xs font-bold text-slate-800">{patient.allergies.join(', ')}</p>
            <p className="text-[10px] text-rose-600 font-medium">E-Health Flagged</p>
          </div>
        </div>

      </div>

    </div>
  );
};
