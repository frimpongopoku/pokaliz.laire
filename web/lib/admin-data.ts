export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "No Show";

export interface Appointment {
  id: string;
  client: string;
  email: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: AppointmentStatus;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpend: number;
  bookings: number;
  lastVisit: string;
  status: "Active" | "Inactive" | "VIP";
  joined: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  gradient: string;
  accent: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  bookingsThisMonth: number;
  totalRevenue: number;
  rating: number;
  reviews: number;
  status: "Available" | "Busy" | "Off Today";
  gradient: string;
  specialties: string[];
}

export const appointments: Appointment[] = [
  { id: "a1",  client: "Isabelle Laurent",  email: "isabelle@example.com", service: "Bridal Makeup",    staff: "Amara Osei",      date: "May 12, 2025", time: "10:00 AM", duration: 120, price: 350, status: "Confirmed"   },
  { id: "a2",  client: "Zanele Dlamini",    email: "zanele@example.com",   service: "Volume Lash Set", staff: "Nia Abara",       date: "May 12, 2025", time: "11:30 AM", duration: 150, price: 220, status: "In Progress" },
  { id: "a3",  client: "Camille Fontaine",  email: "camille@example.com",  service: "Anti-Aging Facial",staff: "Sofia Delacroix", date: "May 12, 2025", time: "2:00 PM",  duration: 90,  price: 280, status: "Confirmed"   },
  { id: "a4",  client: "Reena Kapoor",      email: "reena@example.com",    service: "Balayage",         staff: "Kezia Williams",  date: "May 13, 2025", time: "9:00 AM",  duration: 180, price: 280, status: "Pending"     },
  { id: "a5",  client: "Naomi Asante",      email: "naomi@example.com",    service: "Hot Stone Ritual", staff: "Priya Menon",     date: "May 13, 2025", time: "11:00 AM", duration: 90,  price: 200, status: "Confirmed"   },
  { id: "a6",  client: "Yuki Tanaka",       email: "yuki@example.com",     service: "Gel Nail Set",     staff: "Lydia Chen",      date: "May 13, 2025", time: "1:00 PM",  duration: 75,  price: 85,  status: "Pending"     },
  { id: "a7",  client: "Amara Diallo",      email: "amara@example.com",    service: "Natural Glow MU",  staff: "Amara Osei",      date: "May 14, 2025", time: "10:30 AM", duration: 60,  price: 150, status: "Confirmed"   },
  { id: "a8",  client: "Priya Sharma",      email: "priya@example.com",    service: "Signature Facial", staff: "Sofia Delacroix", date: "May 14, 2025", time: "3:00 PM",  duration: 90,  price: 190, status: "Confirmed"   },
  { id: "a9",  client: "Fatou Ba",          email: "fatou@example.com",    service: "Precision Cut",    staff: "Kezia Williams",  date: "May 10, 2025", time: "2:30 PM",  duration: 60,  price: 95,  status: "Completed"   },
  { id: "a10", client: "Maria Santos",      email: "maria@example.com",    service: "Lash Lift & Tint", staff: "Nia Abara",       date: "May 10, 2025", time: "11:00 AM", duration: 75,  price: 110, status: "Completed"   },
  { id: "a11", client: "Chen Wei",          email: "chenwei@example.com",  service: "Nail Art Design",  staff: "Lydia Chen",      date: "May 9, 2025",  time: "9:30 AM",  duration: 90,  price: 120, status: "Cancelled"   },
  { id: "a12", client: "Adaeze Okonkwo",    email: "adaeze@example.com",   service: "Evening Glam",     staff: "Amara Osei",      date: "May 9, 2025",  time: "4:00 PM",  duration: 75,  price: 180, status: "No Show"     },
];

export const customers: Customer[] = [
  { id: "c1",  name: "Isabelle Laurent",  email: "isabelle@example.com", phone: "+44 7700 900001", location: "London, UK",    totalSpend: 2840, bookings: 12, lastVisit: "May 12, 2025", status: "VIP",      joined: "Jan 2024" },
  { id: "c2",  name: "Zanele Dlamini",    email: "zanele@example.com",   phone: "+234 803 000001", location: "Lagos, NG",     totalSpend: 1960, bookings: 9,  lastVisit: "May 12, 2025", status: "VIP",      joined: "Mar 2024" },
  { id: "c3",  name: "Camille Fontaine",  email: "camille@example.com",  phone: "+33 6 00 00 001", location: "Paris, FR",     totalSpend: 3200, bookings: 14, lastVisit: "May 12, 2025", status: "VIP",      joined: "Nov 2023" },
  { id: "c4",  name: "Reena Kapoor",      email: "reena@example.com",    phone: "+971 50 000 001", location: "Dubai, UAE",    totalSpend: 1480, bookings: 6,  lastVisit: "May 13, 2025", status: "Active",   joined: "Feb 2025" },
  { id: "c5",  name: "Naomi Asante",      email: "naomi@example.com",    phone: "+233 24 000 001", location: "Accra, GH",     totalSpend: 2100, bookings: 11, lastVisit: "May 13, 2025", status: "VIP",      joined: "Jun 2024" },
  { id: "c6",  name: "Yuki Tanaka",       email: "yuki@example.com",     phone: "+81 90 0000 001", location: "Tokyo, JP",     totalSpend: 680,  bookings: 4,  lastVisit: "May 13, 2025", status: "Active",   joined: "Apr 2025" },
  { id: "c7",  name: "Amara Diallo",      email: "amara@example.com",    phone: "+221 77 000 001", location: "Dakar, SN",     totalSpend: 920,  bookings: 5,  lastVisit: "May 14, 2025", status: "Active",   joined: "Jan 2025" },
  { id: "c8",  name: "Maria Santos",      email: "maria@example.com",    phone: "+55 11 0000 001", location: "São Paulo, BR",  totalSpend: 450,  bookings: 3,  lastVisit: "May 10, 2025", status: "Active",   joined: "Mar 2025" },
  { id: "c9",  name: "Fatou Ba",          email: "fatou@example.com",    phone: "+221 77 000 002", location: "Dakar, SN",     totalSpend: 280,  bookings: 2,  lastVisit: "May 10, 2025", status: "Active",   joined: "Apr 2025" },
  { id: "c10", name: "Adaeze Okonkwo",    email: "adaeze@example.com",   phone: "+234 803 000002", location: "Abuja, NG",     totalSpend: 0,    bookings: 1,  lastVisit: "May 9, 2025",  status: "Inactive", joined: "May 2025" },
];

export const adminProducts: AdminProduct[] = [
  { id: "p1", name: "Velvet Rose Face Oil",      category: "Skincare", price: 89,  stock: 42, sold: 128, status: "In Stock",    gradient: "from-rose-950 to-pink-900",   accent: "#D4A8A8" },
  { id: "p2", name: "Noir Matte Lipstick",        category: "Makeup",   price: 42,  stock: 8,  sold: 204, status: "Low Stock",   gradient: "from-stone-950 to-neutral-900", accent: "#C9A55A" },
  { id: "p3", name: "Gold Elixir Serum",          category: "Skincare", price: 145, stock: 0,  sold: 89,  status: "Out of Stock",gradient: "from-amber-950 to-yellow-900", accent: "#C9A55A" },
  { id: "p4", name: "Lash Amplifier Mascara",     category: "Makeup",   price: 38,  stock: 67, sold: 156, status: "In Stock",    gradient: "from-slate-950 to-zinc-900",   accent: "#D4A8A8" },
  { id: "p5", name: "Hydra-Glow Moisturiser",     category: "Skincare", price: 78,  stock: 15, sold: 94,  status: "Low Stock",   gradient: "from-blue-950 to-indigo-900",  accent: "#B57850" },
  { id: "p6", name: "Brow Sculpt Kit",            category: "Makeup",   price: 55,  stock: 38, sold: 71,  status: "In Stock",    gradient: "from-purple-950 to-violet-900",accent: "#E8C99A" },
  { id: "p7", name: "Rose Gold Lip Set",          category: "Makeup",   price: 65,  stock: 5,  sold: 112, status: "Low Stock",   gradient: "from-rose-950 to-amber-900",   accent: "#B57850" },
  { id: "p8", name: "Midnight Repair Mask",       category: "Skincare", price: 95,  stock: 29, sold: 63,  status: "In Stock",    gradient: "from-gray-950 to-slate-900",   accent: "#C9A55A" },
];

export const adminStaff: StaffMember[] = [
  { id: "s1", name: "Amara Osei",     role: "Lead Makeup Artist",    email: "amara@pokaliz.com",  phone: "+44 7700 800001", bookingsThisMonth: 38, totalRevenue: 12840, rating: 4.9, reviews: 247, status: "Busy",      gradient: "from-rose-900/50 to-amber-900/50",   specialties: ["Bridal", "Editorial", "Special FX"] },
  { id: "s2", name: "Lydia Chen",     role: "Senior Nail Technician",email: "lydia@pokaliz.com",  phone: "+44 7700 800002", bookingsThisMonth: 29, totalRevenue: 4820,  rating: 4.8, reviews: 189, status: "Available", gradient: "from-pink-900/50 to-purple-900/50",   specialties: ["Nail Art", "Gel Extensions", "3D Design"] },
  { id: "s3", name: "Nia Abara",      role: "Lash & Brow Specialist",email: "nia@pokaliz.com",    phone: "+44 7700 800003", bookingsThisMonth: 44, totalRevenue: 9240,  rating: 5.0, reviews: 312, status: "Busy",      gradient: "from-amber-900/50 to-rose-900/50",   specialties: ["Volume Lashes", "Microblading", "Lash Lift"] },
  { id: "s4", name: "Sofia Delacroix",role: "Skin Therapist",        email: "sofia@pokaliz.com",  phone: "+44 7700 800004", bookingsThisMonth: 31, totalRevenue: 7440,  rating: 4.9, reviews: 203, status: "Available", gradient: "from-purple-900/50 to-pink-900/50",   specialties: ["Anti-Aging", "Acne Care", "LED Therapy"] },
  { id: "s5", name: "Kezia Williams", role: "Master Colorist",       email: "kezia@pokaliz.com",  phone: "+44 7700 800005", bookingsThisMonth: 22, totalRevenue: 8360,  rating: 4.7, reviews: 178, status: "Off Today", gradient: "from-orange-900/50 to-red-900/50",    specialties: ["Balayage", "Colour Correction", "Vivid"] },
  { id: "s6", name: "Priya Menon",    role: "Spa Therapist",         email: "priya@pokaliz.com",  phone: "+44 7700 800006", bookingsThisMonth: 18, totalRevenue: 4200,  rating: 4.8, reviews: 156, status: "Available", gradient: "from-teal-900/50 to-cyan-900/50",     specialties: ["Hot Stone", "Aromatherapy", "Body Rituals"] },
];

export const revenueByDay = [
  { day: "Mon", amount: 2840, bookings: 9  },
  { day: "Tue", amount: 3620, bookings: 12 },
  { day: "Wed", amount: 2180, bookings: 7  },
  { day: "Thu", amount: 4890, bookings: 16 },
  { day: "Fri", amount: 5240, bookings: 18 },
  { day: "Sat", amount: 6800, bookings: 22 },
  { day: "Sun", amount: 1920, bookings: 6  },
];

export const topServices = [
  { name: "Bridal Makeup",    revenue: 8400,  bookings: 24, growth: 12 },
  { name: "Volume Lash Set",  revenue: 7040,  bookings: 32, growth: 8  },
  { name: "Balayage",         revenue: 6720,  bookings: 24, growth: 5  },
  { name: "Anti-Aging Facial",revenue: 5040,  bookings: 18, growth: 15 },
  { name: "Hot Stone Ritual", revenue: 3600,  bookings: 18, growth: -2 },
];

export const kpis = {
  revenueMTD:     { value: 47820, prev: 41200, unit: "$"  },
  bookingsMTD:    { value: 182,   prev: 159,   unit: ""   },
  newCustomers:   { value: 34,    prev: 28,    unit: ""   },
  avgOrderValue:  { value: 263,   prev: 241,   unit: "$"  },
};
