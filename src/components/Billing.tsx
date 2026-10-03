import React, { useState } from 'react';
import { Invoice } from '../types';
import { CreditCard, CheckCircle2, Clock, DollarSign, Download, ShieldCheck, ArrowRight, Receipt, X } from 'lucide-react';

interface BillingProps {
  invoices: Invoice[];
  onPayInvoice: (invoiceId: string) => void;
}

export const Billing: React.FC<BillingProps> = ({ invoices, onPayInvoice }) => {
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<Invoice | null>(null);

  const pendingInvoices = invoices.filter(inv => inv.status === 'Pending');
  const paidInvoices = invoices.filter(inv => inv.status === 'Paid');

  const totalPending = pendingInvoices.reduce((acc, inv) => acc + inv.total, 0);

  return (
    <div className="space-y-6 pb-20">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Billing & Digital Receipts</h2>
        <p className="text-xs text-slate-500">Pay clinic consultation bills & download official receipts.</p>
      </div>

      {/* Outstanding Balance Card */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase font-bold text-sky-300 tracking-wider">Total Outstanding Balance</p>
          <div className="text-3xl font-extrabold text-white mt-1">
            ${totalPending.toFixed(2)}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {pendingInvoices.length} invoice(s) pending payment.
          </p>
        </div>

        {pendingInvoices.length > 0 && (
          <button
            onClick={() => onPayInvoice(pendingInvoices[0].id)}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay All Pending Bills (${totalPending.toFixed(2)})</span>
          </button>
        )}
      </div>

      {/* Pending Invoices Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Pending Bills</h3>
        {pendingInvoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
            All bills are fully paid! No outstanding dues.
          </div>
        ) : (
          pendingInvoices.map((inv) => (
            <div key={inv.id} className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs hover:shadow-sm transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {inv.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Invoice #{inv.invoiceNumber}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{inv.serviceDescription}</h4>
                <p className="text-xs text-slate-500">{inv.provider} • Issued on {inv.date}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-auto">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Total Due</p>
                  <p className="text-lg font-black text-rose-600">${inv.total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onPayInvoice(inv.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paid Invoices History */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Payment History</h3>
        <div className="space-y-3">
          {paidInvoices.map((inv) => (
            <div key={inv.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> {inv.status}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Invoice #{inv.invoiceNumber}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{inv.serviceDescription}</h4>
                <p className="text-xs text-slate-500">{inv.provider} • Paid on {inv.date}</p>
                <p className="text-[11px] text-slate-400 font-medium">Method: {inv.paymentMethod}</p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-auto">
                <div className="text-right">
                  <p className="text-xs text-slate-400">Amount Paid</p>
                  <p className="text-base font-bold text-slate-900">${inv.total.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setSelectedInvoiceForReceipt(inv)}
                  className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition"
                >
                  <Receipt className="w-4 h-4 text-sky-600" />
                  <span>View Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIGITAL RECEIPT MODAL */}
      {selectedInvoiceForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-base">Official Digital Receipt</h3>
              </div>
              <button onClick={() => setSelectedInvoiceForReceipt(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>RECEIPT NO:</span>
                <span className="font-bold text-slate-800">{selectedInvoiceForReceipt.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>DATE:</span>
                <span className="text-slate-800">{selectedInvoiceForReceipt.date}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>PROVIDER:</span>
                <span className="text-slate-800">{selectedInvoiceForReceipt.provider}</span>
              </div>
              <div className="border-t border-dashed border-slate-300 my-2 pt-2"></div>
              <div className="flex justify-between">
                <span>Consultation Subtotal:</span>
                <span>${selectedInvoiceForReceipt.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Service Charge:</span>
                <span>${selectedInvoiceForReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-900 text-sm pt-1 border-t border-slate-300">
                <span>TOTAL PAID:</span>
                <span className="text-emerald-600">${selectedInvoiceForReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-emerald-600 font-bold flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" /> Verified Self-Service Payment
              </span>
              <button
                onClick={() => {
                  alert(`Downloading receipt PDF for #${selectedInvoiceForReceipt.invoiceNumber}...`);
                  setSelectedInvoiceForReceipt(null);
                }}
                className="bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-sky-700 transition flex items-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
