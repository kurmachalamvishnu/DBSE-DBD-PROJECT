import React, { useState } from 'react';
import { Prescription, LabReport } from '../types';
import { FileText, Download, Pill, Activity, CheckCircle, AlertTriangle, Calendar, User, Search } from 'lucide-react';

interface MedicalRecordsProps {
  prescriptions: Prescription[];
  labReports: LabReport[];
}

export const MedicalRecords: React.FC<MedicalRecordsProps> = ({ prescriptions, labReports }) => {
  const [activeSubTab, setActiveSubTab] = useState<'prescriptions' | 'lab'>('prescriptions');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = prescriptions.filter(p =>
    p.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLabReports = labReports.filter(l =>
    l.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadReport = (title: string) => {
    alert(`Downloading digital PDF copy of: "${title}"... (Self-Service Document Export)`);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">E-Health Medical Records</h2>
          <p className="text-xs text-slate-500">Access your digital prescriptions, doctor notes & lab diagnostics.</p>
        </div>

        {/* Subtab Toggle */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('prescriptions')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'prescriptions'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescriptions ({filteredPrescriptions.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('lab')}
            className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeSubTab === 'lab'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Lab Reports ({filteredLabReports.length})</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeSubTab === 'prescriptions' ? 'prescriptions by doctor or diagnosis' : 'lab reports by test name'}...`}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
      </div>

      {/* PRESCRIPTIONS TAB */}
      {activeSubTab === 'prescriptions' && (
        <div className="space-y-4">
          {filteredPrescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-300 transition">
              
              {/* Rx Header */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-sm">
                    Rx
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{rx.doctorName}</h3>
                    <p className="text-xs text-sky-600 font-medium">{rx.doctorSpecialization}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-500 font-medium flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> {rx.date}
                  </span>
                  <button
                    onClick={() => handleDownloadReport(`Prescription - ${rx.doctorName}`)}
                    className="flex items-center space-x-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-600" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Rx Body */}
              <div className="p-4 space-y-3">
                <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Diagnosis</p>
                  <p className="text-xs font-bold text-slate-800">{rx.diagnosis}</p>
                </div>

                {/* Medication Schedule Table */}
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400 mb-2">Prescribed Medications</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
                          <th className="py-2 px-3 font-bold rounded-l-lg">Medicine Name</th>
                          <th className="py-2 px-3 font-bold">Dosage</th>
                          <th className="py-2 px-3 font-bold">Frequency</th>
                          <th className="py-2 px-3 font-bold rounded-r-lg">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {rx.medications.map((med, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80">
                            <td className="py-2.5 px-3 font-bold text-slate-800">{med.name}</td>
                            <td className="py-2.5 px-3 text-slate-600">{med.dosage}</td>
                            <td className="py-2.5 px-3 text-slate-600">{med.frequency}</td>
                            <td className="py-2.5 px-3 text-slate-600 font-semibold text-sky-700">{med.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Doctor's Advice Notes */}
                {rx.notes && (
                  <div className="pt-2 text-xs text-slate-600 italic border-t border-slate-100">
                    <span className="font-semibold text-slate-800 not-italic">Doctor's Note:</span> "{rx.notes}"
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* LAB REPORTS TAB */}
      {activeSubTab === 'lab' && (
        <div className="space-y-4">
          {filteredLabReports.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-sky-300 transition space-y-3">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {report.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full flex items-center ${
                      report.status === 'Normal'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {report.status === 'Normal' ? (
                        <CheckCircle className="w-3 h-3 mr-1 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 mr-1 text-amber-600" />
                      )}
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{report.testName}</h3>
                  <p className="text-xs text-slate-500">{report.labName} • Conducted on {report.conductedDate}</p>
                </div>

                <button
                  onClick={() => handleDownloadReport(report.testName)}
                  className="flex items-center space-x-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition self-start sm:self-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
              </div>

              {/* Summary Notes */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-0.5">Laboratory Findings Summary:</span>
                {report.summary}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
