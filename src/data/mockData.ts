import { Clinic, Doctor, Appointment, QueueToken, Prescription, LabReport, Invoice, PatientProfile } from '../types';

export const mockClinics: Clinic[] = [
  {
    id: 'c1',
    name: 'CityCare Multispecialty Clinic',
    address: '102 Healthcare Avenue, Downtown',
    city: 'Metropolis',
    phone: '+1 (555) 019-2831',
    rating: 4.9,
    openingHours: '08:00 AM - 08:00 PM',
    distanceKm: 1.2,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    doctorCount: 14,
    specializations: ['General Medicine', 'Neurology', 'Orthopedics', 'Cardiology']
  },
  {
    id: 'c2',
    name: 'Sunshine Children & Family Health',
    address: '45 Parkline Drive, Westside',
    city: 'Metropolis',
    phone: '+1 (555) 042-8819',
    rating: 4.8,
    openingHours: '08:30 AM - 07:00 PM',
    distanceKm: 2.8,
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    doctorCount: 8,
    specializations: ['Pediatrics', 'General Medicine', 'Nutrition']
  },
  {
    id: 'c3',
    name: 'Apex Heart & Vascular Center',
    address: '88 Medical Hub, Suite 300',
    city: 'Metropolis',
    phone: '+1 (555) 077-4100',
    rating: 4.95,
    openingHours: '09:00 AM - 06:00 PM',
    distanceKm: 3.5,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    doctorCount: 6,
    specializations: ['Cardiology', 'Vascular Surgery']
  },
  {
    id: 'c4',
    name: 'DermaGlow Skin & Laser Care',
    address: '12 Boulevard Plaza, Northside',
    city: 'Metropolis',
    phone: '+1 (555) 091-6622',
    rating: 4.7,
    openingHours: '10:00 AM - 07:00 PM',
    distanceKm: 4.1,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    doctorCount: 5,
    specializations: ['Dermatology', 'Cosmetology']
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Jenkins',
    specialization: 'Cardiology',
    clinicId: 'c3',
    clinicName: 'Apex Heart & Vascular Center',
    qualification: 'MD, FACC - Senior Cardiologist',
    experienceYears: 14,
    consultationFee: 120,
    rating: 4.9,
    reviewCount: 210,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    nextAvailableSlot: 'Today, 03:30 PM',
    about: 'Specializes in preventative cardiology, hypertension management, and echocardiography with over 14 years of hospital experience.'
  },
  {
    id: 'd2',
    name: 'Dr. Robert Chen',
    specialization: 'General Medicine',
    clinicId: 'c1',
    clinicName: 'CityCare Multispecialty Clinic',
    qualification: 'MD - General Physician',
    experienceYears: 10,
    consultationFee: 60,
    rating: 4.8,
    reviewCount: 340,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    nextAvailableSlot: 'Today, 10:30 AM',
    about: 'Expert in primary healthcare, routine checkups, chronic disease management, and preventative patient wellness.'
  },
  {
    id: 'd3',
    name: 'Dr. Elena Rostova',
    specialization: 'Dermatology',
    clinicId: 'c4',
    clinicName: 'DermaGlow Skin & Laser Care',
    qualification: 'MD, DNB - Dermatologist',
    experienceYears: 8,
    consultationFee: 85,
    rating: 4.7,
    reviewCount: 185,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813566-78a99478f7e2?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Tue', 'Wed', 'Thu', 'Sat'],
    nextAvailableSlot: 'Tomorrow, 11:00 AM',
    about: 'Focuses on clinical dermatology, acne therapy, allergy diagnosis, and cosmetic skin rejuvenation.'
  },
  {
    id: 'd4',
    name: 'Dr. Marcus Vance',
    specialization: 'Pediatrics',
    clinicId: 'c2',
    clinicName: 'Sunshine Children & Family Health',
    qualification: 'MD - Senior Pediatrician',
    experienceYears: 12,
    consultationFee: 75,
    rating: 4.9,
    reviewCount: 290,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Mon', 'Tue', 'Wed', 'Fri'],
    nextAvailableSlot: 'Tomorrow, 09:30 AM',
    about: 'Compassionate pediatric healthcare, childhood immunization, growth monitoring, and adolescent care.'
  },
  {
    id: 'd5',
    name: 'Dr. Ananya Sharma',
    specialization: 'Neurology',
    clinicId: 'c1',
    clinicName: 'CityCare Multispecialty Clinic',
    qualification: 'DM (Neurology), MD',
    experienceYears: 11,
    consultationFee: 110,
    rating: 4.85,
    reviewCount: 165,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Mon', 'Thu', 'Sat'],
    nextAvailableSlot: 'Sep 20, 02:00 PM',
    about: 'Comprehensive neurological assessment for migraine, nerve disorders, sleep disturbances, and stroke rehabilitation.'
  },
  {
    id: 'd6',
    name: 'Dr. David Miller',
    specialization: 'Orthopedics',
    clinicId: 'c1',
    clinicName: 'CityCare Multispecialty Clinic',
    qualification: 'MS (Orthopedics)',
    experienceYears: 15,
    consultationFee: 100,
    rating: 4.75,
    reviewCount: 198,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    availableDays: ['Tue', 'Wed', 'Fri'],
    nextAvailableSlot: 'Sep 19, 04:00 PM',
    about: 'Specialist in joint health, sports injuries, fracture management, and arthroscopic procedures.'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-101',
    bookingCode: 'APT-2026-9041',
    doctorName: 'Dr. Robert Chen',
    doctorSpecialization: 'General Medicine',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    clinicName: 'CityCare Multispecialty Clinic',
    clinicAddress: '102 Healthcare Avenue, Downtown',
    date: '2026-09-17',
    timeSlot: '10:30 AM',
    status: 'Checked-In',
    symptoms: 'Routine blood pressure checkup and mild seasonal headache',
    fee: 60,
    tokenId: 'tok-14',
    tokenNumber: 14,
    qrCodeValue: 'CAREPOINT-CHECKIN-APT-2026-9041-TOK-14'
  },
  {
    id: 'apt-102',
    bookingCode: 'APT-2026-8812',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialization: 'Cardiology',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    clinicName: 'Apex Heart & Vascular Center',
    clinicAddress: '88 Medical Hub, Suite 300',
    date: '2026-09-22',
    timeSlot: '02:00 PM',
    status: 'Confirmed',
    symptoms: 'Annual ECG monitoring and cardiology consultation',
    fee: 120,
    qrCodeValue: 'CAREPOINT-CONFIRMED-APT-2026-8812'
  },
  {
    id: 'apt-103',
    bookingCode: 'APT-2026-7510',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'Dermatology',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813566-78a99478f7e2?auto=format&fit=crop&w=300&q=80',
    clinicName: 'DermaGlow Skin & Laser Care',
    clinicAddress: '12 Boulevard Plaza, Northside',
    date: '2026-08-15',
    timeSlot: '11:00 AM',
    status: 'Completed',
    symptoms: 'Skin rash evaluation and prescription renewal',
    fee: 85,
    qrCodeValue: 'CAREPOINT-COMPLETED-APT-2026-7510'
  }
];

export const mockQueueToken: QueueToken = {
  id: 'tok-14',
  tokenNumber: 14,
  currentServingToken: 11,
  doctorName: 'Dr. Robert Chen',
  doctorSpecialization: 'General Medicine',
  clinicName: 'CityCare Multispecialty Clinic',
  counterRoom: 'Room 204 (2nd Floor)',
  status: 'Waiting',
  estimatedWaitMins: 12,
  patientsAhead: 2,
  appointmentTime: '10:30 AM'
};

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-501',
    doctorName: 'Dr. Elena Rostova',
    doctorSpecialization: 'Dermatology',
    date: '15 Aug 2026',
    diagnosis: 'Contact Dermatitis (Mild skin allergy)',
    medications: [
      {
        name: 'Hydrocortisone Cream 1%',
        dosage: 'Thin layer application',
        frequency: 'Twice daily',
        duration: '7 Days',
        instructions: 'Apply gently on affected areas after washing skin.'
      },
      {
        name: 'Cetirizine 10mg',
        dosage: '1 Tablet',
        frequency: 'Once daily',
        duration: '10 Days',
        instructions: 'Take at night before sleep.'
      }
    ],
    notes: 'Keep skin hydrated. Avoid perfumed soaps until rash subsides. Follow up if symptoms persist.'
  },
  {
    id: 'rx-489',
    doctorName: 'Dr. Robert Chen',
    doctorSpecialization: 'General Medicine',
    date: '10 May 2026',
    diagnosis: 'Acute Upper Respiratory Tract Infection',
    medications: [
      {
        name: 'Amoxicillin 500mg',
        dosage: '1 Capsule',
        frequency: 'Thrice daily',
        duration: '5 Days',
        instructions: 'Take after meal.'
      },
      {
        name: 'Paracetamol 650mg',
        dosage: '1 Tablet',
        frequency: 'As needed for fever',
        duration: '3 Days',
        instructions: 'Maintain 6 hours gap between doses.'
      }
    ],
    notes: 'Drink plenty of warm fluids and take rest.'
  }
];

export const mockLabReports: LabReport[] = [
  {
    id: 'lab-901',
    testName: 'Complete Blood Count (CBC)',
    category: 'Haematology',
    conductedDate: '10 Sep 2026',
    status: 'Normal',
    labName: 'CityCare Central Diagnostics',
    summary: 'Hemoglobin: 14.8 g/dL, WBC: 6.5 k/uL, Platelets: 280 k/uL. All core hematological parameters are within healthy range.'
  },
  {
    id: 'lab-902',
    testName: 'Lipid Profile & Serum Cholesterol',
    category: 'Biochemistry',
    conductedDate: '10 Sep 2026',
    status: 'Attention Needed',
    labName: 'CityCare Central Diagnostics',
    summary: 'Total Cholesterol: 215 mg/dL (Borderline High). HDL: 48 mg/dL, LDL: 138 mg/dL, Triglycerides: 145 mg/dL. Recommended dietary adjustment.'
  },
  {
    id: 'lab-854',
    testName: 'Fasting Blood Glucose & HbA1c',
    category: 'Endocrinology',
    conductedDate: '14 May 2026',
    status: 'Normal',
    labName: 'CityCare Central Diagnostics',
    summary: 'Fasting Glucose: 92 mg/dL, HbA1c: 5.4%. Normal glucose tolerance.'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-301',
    invoiceNumber: 'INV-2026-0091',
    date: '17 Sep 2026',
    serviceDescription: 'General Medicine Consultation - Dr. Robert Chen',
    provider: 'CityCare Multispecialty Clinic',
    amount: 60.00,
    tax: 5.00,
    total: 65.00,
    status: 'Pending'
  },
  {
    id: 'inv-288',
    invoiceNumber: 'INV-2026-0045',
    date: '15 Aug 2026',
    serviceDescription: 'Dermatology Consultation & Skin Patch Test',
    provider: 'DermaGlow Skin & Laser Care',
    amount: 85.00,
    tax: 7.00,
    total: 92.00,
    status: 'Paid',
    paymentMethod: 'Credit Card (Visa ending in *4912)'
  },
  {
    id: 'inv-210',
    invoiceNumber: 'INV-2026-0012',
    date: '10 May 2026',
    serviceDescription: 'Diagnostic Lab Test Bundle (CBC + Lipid)',
    provider: 'CityCare Central Diagnostics',
    amount: 110.00,
    tax: 8.80,
    total: 118.80,
    status: 'Paid',
    paymentMethod: 'Apple Pay / UPI Direct'
  }
];

export const mockPatientProfile: PatientProfile = {
  id: 'p-1001',
  name: 'Alexander Wright',
  email: 'alex.wright@example.com',
  phone: '+1 (555) 014-9921',
  dob: '14 May 1992 (Age 34)',
  gender: 'Male',
  bloodGroup: 'O+',
  address: '742 Evergreen Terrace, Metropolis',
  emergencyContact: 'Sarah Wright (Spouse) - +1 (555) 999-0112',
  allergies: ['Penicillin', 'Dust Mites', 'Pollen'],
  vitals: {
    bloodPressure: '120/78 mmHg',
    heartRate: 72,
    spo2: 99,
    weightKg: 74.5,
    lastUpdated: '17 Sep 2026, 09:15 AM'
  }
};
