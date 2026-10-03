import React, { useState } from 'react';
import { Doctor, Clinic } from '../types';
import { Search, Star, MapPin, Calendar, Clock, Award, PhoneCall, Stethoscope, ChevronRight } from 'lucide-react';

interface ClinicsDoctorsProps {
  doctors: Doctor[];
  clinics: Clinic[];
  onSelectDoctorToBook: (doctor: Doctor) => void;
}

export const ClinicsDoctors: React.FC<ClinicsDoctorsProps> = ({
  doctors,
  clinics,
  onSelectDoctorToBook
}) => {
  const [activeView, setActiveView] = useState<'doctors' | 'clinics'>('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('All');

  const specializations = ['All', 'General Medicine', 'Cardiology', 'Pediatrics', 'Dermatology', 'Neurology', 'Orthopedics'];

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.clinicName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpec === 'All' || doc.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  const filteredClinics = clinics.filter(clinic => {
    return clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
           clinic.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clinics & Doctors Finder</h2>
          <p className="text-xs text-slate-500">Search top specialists & book instant self-service clinic slots.</p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveView('doctors')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'doctors'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doctors ({filteredDoctors.length})
          </button>
          <button
            onClick={() => setActiveView('clinics')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'clinics'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clinics ({filteredClinics.length})
          </button>
        </div>
      </div>

      {/* Search Input & Filter Pills */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, specialty, or clinic location..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
        </div>

        {/* Specialization Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpec(spec)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                selectedSpec === spec
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors List View */}
      {activeView === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sky-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {doc.specialization}
                    </span>
                    <div className="flex items-center text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal text-[11px] ml-1">({doc.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-1 truncate">{doc.name}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate">{doc.qualification}</p>

                  <p className="text-xs text-slate-600 flex items-center mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
                    <span className="truncate">{doc.clinicName}</span>
                  </p>
                </div>
              </div>

              {/* Doctor Details Bar */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Experience</p>
                  <p className="text-xs font-bold text-slate-700">{doc.experienceYears}+ Years</p>
                </div>
                <div className="border-x border-slate-200">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Fee</p>
                  <p className="text-xs font-bold text-emerald-600">${doc.consultationFee}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Next Slot</p>
                  <p className="text-[11px] font-bold text-sky-600 truncate">{doc.nextAvailableSlot}</p>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Instant Token Booking
                </span>
                <button
                  onClick={() => onSelectDoctorToBook(doc)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center space-x-1"
                >
                  <span>Book Visit</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clinics List View */}
      {activeView === 'clinics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              <div className="h-36 relative">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-amber-500 flex items-center shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  <span>{clinic.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-lg text-[11px] font-medium flex items-center">
                  <MapPin className="w-3 h-3 text-sky-400 mr-1" />
                  <span>{clinic.distanceKm} km away</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{clinic.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{clinic.address}, {clinic.city}</p>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-600">
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    <span>{clinic.openingHours}</span>
                  </div>
                  <div className="flex items-center">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    <span>{clinic.doctorCount} Doctors</span>
                  </div>
                </div>

                {/* Specializations Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {clinic.specializations.map((spec) => (
                    <span key={spec} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center">
                    <PhoneCall className="w-3.5 h-3.5 mr-1 text-slate-400" /> {clinic.phone}
                  </span>
                  <button
                    onClick={() => {
                      const clinicDocs = doctors.filter(d => d.clinicId === clinic.id);
                      if (clinicDocs.length > 0) onSelectDoctorToBook(clinicDocs[0]);
                    }}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center"
                  >
                    <span>View Doctors</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
