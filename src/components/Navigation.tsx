import React from 'react';
import { ActiveTab } from '../types';
import { LayoutDashboard, Stethoscope, Clock, FileText, CreditCard, User, Database } from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDbModal: () => void;
  isMobileFrame?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onOpenDbModal, isMobileFrame }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'clinics', label: 'Doctors', icon: Stethoscope },
    { id: 'queue', label: 'Live Queue', icon: Clock, badge: 'Live' },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (Rendered on wide layouts when not strictly mobile frame) */}
      {!isMobileFrame && (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 p-4 space-y-6 shrink-0 min-h-[calc(100vh-4rem)]">
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigation Menu</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* DBMS Schema Quick View Button (For DBMS Lecturer Demo) */}
          <div className="pt-4 border-t border-slate-200 mt-auto">
            <button
              onClick={onOpenDbModal}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-semibold shadow-md transition"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>View DBMS MySQL Schema</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              For DBMS Course Project Presentation
            </p>
          </div>
        </aside>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`bg-white border-t border-slate-200 z-40 ${
        isMobileFrame ? 'absolute bottom-0 left-0 right-0 rounded-b-[2rem]' : 'fixed bottom-0 left-0 right-0 lg:hidden'
      }`}>
        <div className="flex items-center justify-around py-2 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`flex flex-col items-center py-1 px-2 rounded-lg text-[11px] font-medium transition relative ${
                  isActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600 scale-110' : 'text-slate-400'}`} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                  )}
                </div>
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
