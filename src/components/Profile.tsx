import React, { useState } from 'react';
import { PatientProfile } from '../types';
import { User, Phone, Mail, MapPin, Calendar, Heart, Activity, AlertOctagon, ShieldCheck, Database, Edit2, Save } from 'lucide-react';

interface ProfileProps {
  patient: PatientProfile;
  onUpdatePatient: (updated: PatientProfile) => void;
  onOpenDbModal: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ patient, onUpdatePatient, onOpenDbModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(patient.phone);
  const [address, setAddress] = useState(patient.address);
  const [emergencyContact, setEmergencyContact] = useState(patient.emergencyContact);

  const handleSaveProfile = () => {
    onUpdatePatient({
      ...patient,
      phone,
      address,
      emergencyContact
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 font-extrabold text-xl flex items-center justify-center shadow-md">
              AW
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold text-slate-900">{patient.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold">
                  Blood Group: {patient.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{patient.email} • ID: {patient.id}</p>
              <p className="text-xs text-slate-600 mt-1 flex items-center">
                <Calendar className="w-3.5 h-3.5 text-slate-400 mr-1" /> DOB: {patient.dob} ({patient.gender})
              </p>
            </div>
          </div>

          <button
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                <span>Edit Contact Details</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Vitals Summary Card */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Patient Self-Service Vitals</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Blood Pressure</p>
            <p className="text-lg font-black text-rose-600 mt-1">{patient.vitals.bloodPressure}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Normal</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Pulse Rate</p>
            <p className="text-lg font-black text-sky-600 mt-1">{patient.vitals.heartRate} bpm</p>
            <span className="text-[10px] text-slate-500">Resting</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Oxygen Saturation</p>
            <p className="text-lg font-black text-emerald-600 mt-1">{patient.vitals.spo2}% SpO2</p>
            <span className="text-[10px] text-emerald-600 font-bold">Healthy</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Body Weight</p>
            <p className="text-lg font-black text-slate-800 mt-1">{patient.vitals.weightKg} kg</p>
            <span className="text-[10px] text-slate-500">BMI: 23.4</span>
          </div>

        </div>
      </div>

      {/* Contact & Emergency Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center">
            <Phone className="w-4 h-4 text-sky-600 mr-2" /> Personal Contact Details
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Phone Number</p>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs mt-1"
                />
              ) : (
                <p className="font-bold text-slate-800">{patient.phone}</p>
              )}
            </div>

            <div>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Residential Address</p>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs mt-1"
                />
              ) : (
                <p className="font-bold text-slate-800">{patient.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency & Allergies Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center">
            <AlertOctagon className="w-4 h-4 text-rose-600 mr-2" /> Medical Safety & Emergency
          </h4>

          <div className="space-y-2 text-xs">
            <div>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Emergency Contact</p>
              {isEditing ? (
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs mt-1"
                />
              ) : (
                <p className="font-bold text-rose-600">{patient.emergencyContact}</p>
              )}
            </div>

            <div>
              <p className="text-slate-400 text-[10px] uppercase font-semibold">Flagged Allergies</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {patient.allergies.map((allergy) => (
                  <span key={allergy} className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded-md border border-rose-200 text-[11px]">
                    ⚠️ {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* DBMS Project Spec Banner inside Profile */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">DBMS Schema & Relational Specifications</h4>
            <p className="text-xs text-slate-400">MySQL Database tables, foreign key constraints & DDL scripts</p>
          </div>
        </div>

        <button
          onClick={onOpenDbModal}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs"
        >
          Open SQL Specs
        </button>
      </div>

    </div>
  );
};
