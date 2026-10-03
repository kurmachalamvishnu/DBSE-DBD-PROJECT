export type ActiveTab = 'dashboard' | 'clinics' | 'queue' | 'records' | 'billing' | 'profile';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  clinicId: string;
  clinicName: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  availableDays: string[];
  nextAvailableSlot: string;
  about: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  openingHours: string;
  distanceKm: number;
  image: string;
  doctorCount: number;
  specializations: string[];
}

export interface Appointment {
  id: string;
  bookingCode: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatar: string;
  clinicName: string;
  clinicAddress: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled';
  symptoms: string;
  fee: number;
  tokenId?: string;
  tokenNumber?: number;
  qrCodeValue: string;
}

export interface QueueToken {
  id: string;
  tokenNumber: number;
  currentServingToken: number;
  doctorName: string;
  doctorSpecialization: string;
  clinicName: string;
  counterRoom: string;
  status: 'Waiting' | 'In-Consultation' | 'Completed' | 'Skipped';
  estimatedWaitMins: number;
  patientsAhead: number;
  appointmentTime: string;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  diagnosis: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  notes: string;
}

export interface LabReport {
  id: string;
  testName: string;
  category: string;
  conductedDate: string;
  status: 'Normal' | 'Attention Needed' | 'Pending';
  labName: string;
  summary: string;
  downloadUrl?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  serviceDescription: string;
  provider: string;
  amount: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  allergies: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    spo2: number;
    weightKg: number;
    lastUpdated: string;
  };
}
