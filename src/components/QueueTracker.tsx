import React, { useState } from 'react';
import { QueueToken } from '../types';
import { Clock, RefreshCw, MapPin, AlertCircle, CheckCircle2, UserCheck, Bell, ChevronRight, Play } from 'lucide-react';

interface QueueTrackerProps {
  initialQueueToken: QueueToken;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ initialQueueToken }) => {
  const [tokenData, setTokenData] = useState<QueueToken>(initialQueueToken);
  const [isSimulating, setIsSimulating] = useState(false);

  // Live Queue Simulation for Lecturer Demonstration
  const advanceQueue = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setTokenData(prev => {
        const nextServing = prev.currentServingToken + 1;
        const newWait = Math.max(0, prev.estimatedWaitMins - 5);
        const newAhead = Math.max(0, prev.patientsAhead - 1);
        const newStatus = nextServing === prev.tokenNumber ? 'In-Consultation' : 'Waiting';

        return {
          ...prev,
          currentServingToken: nextServing,
          estimatedWaitMins: newWait,
          patientsAhead: newAhead,
          status: newStatus
        };
      });
      setIsSimulating(false);
    }, 400);
  };

  const isMyTurn = tokenData.currentServingToken === tokenData.tokenNumber;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900">Live Self-Service Queue Tracker</h2>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-extrabold uppercase animate-pulse">
              LIVE UPDATING
            </span>
          </div>
          <p className="text-xs text-slate-500">Track your consultation queue ticket position in real time.</p>
        </div>

        {/* Queue Simulation Action for Demonstration */}
        <button
          onClick={advanceQueue}
          disabled={isSimulating || isMyTurn}
          className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md transition self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Simulate Next Token Serving</span>
        </button>
      </div>

      {/* Main Live Queue Status Display */}
      <div className={`rounded-3xl p-6 shadow-md transition-all ${
        isMyTurn
          ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white ring-4 ring-emerald-300'
          : 'bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white'
      }`}>
        
        {/* Banner Alert if My Turn */}
        {isMyTurn && (
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 mb-4 text-center border border-white/30 animate-pulse">
            <p className="text-xs font-black uppercase tracking-wider text-white">
              🔔 IT IS YOUR TURN NOW! Please proceed immediately to {tokenData.counterRoom}.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Patient's Token Box */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 text-center">
            <p className="text-[11px] uppercase font-bold text-slate-300 tracking-wider">YOUR TICKET TOKEN</p>
            <div className="text-5xl font-black text-amber-400 my-1">
              #{tokenData.tokenNumber}
            </div>
            <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
              isMyTurn ? 'bg-white text-emerald-800' : 'bg-sky-500/30 text-sky-200 border border-sky-400/30'
            }`}>
              {tokenData.status}
            </span>
          </div>

          {/* Current Serving Box */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-5 border border-white/15 text-center">
            <p className="text-[11px] uppercase font-bold text-slate-300 tracking-wider">NOW SERVING AT COUNTER</p>
            <div className="text-5xl font-black text-white my-1">
              #{tokenData.currentServingToken}
            </div>
            <p className="text-xs text-sky-300 font-semibold">{tokenData.counterRoom}</p>
          </div>

          {/* Wait Time & Patients Ahead */}
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-300">ESTIMATED WAIT</p>
                <p className="text-xl font-bold text-amber-300">{tokenData.estimatedWaitMins} Mins</p>
              </div>
              <Clock className="w-7 h-7 text-amber-300 opacity-80" />
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-semibold text-slate-300">PATIENTS AHEAD</p>
                <p className="text-xl font-bold text-white">{tokenData.patientsAhead} Patients</p>
              </div>
              <UserCheck className="w-7 h-7 text-sky-300 opacity-80" />
            </div>
          </div>

        </div>

        {/* Progress Timeline Indicator */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex justify-between text-xs text-slate-300 mb-2 font-medium">
            <span>Check-in Complete</span>
            <span>Queue Progress (Token #{tokenData.currentServingToken} / #{tokenData.tokenNumber})</span>
            <span>Consultation</span>
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (tokenData.currentServingToken / tokenData.tokenNumber) * 100)}%`
              }}
            ></div>
          </div>
        </div>

      </div>

      {/* Appointment & Doctor Context */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Queue Appointment Info</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase">Doctor Specialist</p>
            <p className="font-bold text-slate-800">{tokenData.doctorName}</p>
            <p className="text-sky-600 text-[11px]">{tokenData.doctorSpecialization}</p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase">Healthcare Facility</p>
            <p className="font-bold text-slate-800">{tokenData.clinicName}</p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase">Counter / Room</p>
            <p className="font-bold text-slate-800">{tokenData.counterRoom}</p>
          </div>

          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase">Scheduled Slot</p>
            <p className="font-bold text-slate-800">{tokenData.appointmentTime}</p>
          </div>
        </div>
      </div>

      {/* Self-Service Queue Rules & Tips */}
      <div className="bg-sky-50 rounded-2xl border border-sky-200 p-4 text-xs text-sky-900 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-sky-900">
          <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
          <span>Patient Self-Service Queue Guidelines</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
          <li>Please arrive at the clinic waiting lounge at least 5 minutes prior to your estimated call time.</li>
          <li>Your mobile screen will display a loud audio alert when your token is called to the doctor's room.</li>
          <li>If you miss your call twice, your token will automatically be placed in the delayed buffer queue.</li>
        </ul>
      </div>

    </div>
  );
};
