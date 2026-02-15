export type Patient = {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: 'Active' | 'Recovering' | 'Critical' | 'Recovered' | 'Discharged';
  admission_date: string;
  room: string;
  doctor: string;
};

export type Appointment = {
  id: number;
  patient_name: string;
  doctor: string;
  department: string;
  time: string;
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  type: string;
};

export type Doctor = {
  id: number;
  name: string;
  department: string;
  specialization: string;
  experience: string;
  patients: number;
  rating: number;
  avatar: string;
  availability: 'Available' | 'On Leave' | 'Busy';
};

export type Department = {
  id: number;
  name: string;
  patients: number;
  doctors: number;
  beds: number;
  occupancy: number;
  color: string;
};
