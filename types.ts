
export interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  reason: string;
  message: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  status: 'pending' | 'completed';
  createdAt: any;
}
