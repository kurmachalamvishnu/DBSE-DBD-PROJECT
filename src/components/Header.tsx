import React from 'react';
import { HeartPulse, Bell, Smartphone, Monitor, Search, ShieldCheck, MapPin } from 'lucide-react';
import { mockPatientProfile } from '../data/mockData';

interface HeaderProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileFrame, setIsMobileFrame, onOpenBooking }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">CarePoint</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Patient Self-Service
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-sky-500 inline" />
                <span>Metropolis Health Network</span>
              </p>
            </div>
          </div>

          {/* Quick Search bar (Desktop View) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors, specializations, clinics..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Top Actions & Controls */}
          <div className="flex items-center space-x-3">
            
            {/* View Mode Switcher (Lecturer Demo Toggle) */}
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              title={isMobileFrame ? "Switch to Desktop Responsive View" : "Switch to Mobile Phone Frame View"}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition border ${
                isMobileFrame 
                  ? 'bg-sky-50 text-sky-700 border-sky-300' 
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isMobileFrame ? (
                <>
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span className="hidden sm:inline">Mobile Frame</span>
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4 text-slate-600" />
                  <span className="hidden sm:inline">Desktop View</span>
                </>
              )}
            </button>

            {/* Quick Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
            >
              <span>+ Book Appointment</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Patient Mini Avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                AW
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-800">{mockPatientProfile.name}</p>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-0.5" /> ID: {mockPatientProfile.id}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
