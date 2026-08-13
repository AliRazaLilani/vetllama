/** ───────────────────────────────────────────
 *  Mock Data for API Simulation
 *  Production-ready mock data for all endpoints
 *  ─────────────────────────────────────────── */

import type {
  AuthUser,
  DashboardDataResponse,
  LandingPageContent,
  TenantInfo,
} from '@/types/content';

/** ───────────────────────────────────────────
 *  Template 1: Modern Clean (Default)
 *  ─────────────────────────────────────────── */

export const template1Content: LandingPageContent = {
  metadata: {
    title: 'Expert Veterinary Care for Your Beloved Pets',
    description:
      'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets. Our experienced team ensures your furry friends receive the best care possible.',
    favicon: '/favicon.ico',
    ogImage: '/images/og-image.jpg',
  },
  primaryColor: '#316DFF',
  secondaryColor: '#FFFFFF',
  hero: {
    isShow: true,
    order: 1,
    title: 'Expert Veterinary Care for Your Beloved Pets',
    subtitle:
      'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets. Your pet deserves the best, and we are here to deliver.',
    backgroundImage: '/images/hero-bg.jpg',
    ctaText: 'Book Appointment',
  },
  features: {
    isShow: true,
    order: 2,
    title: 'Why Choose Us',
    items: [
      {
        icon: 'Stethoscope',
        title: 'Experienced Team',
        description: 'Our board-certified veterinarians have 15+ years of experience in pet care.',
      },
      {
        icon: 'Heart',
        title: 'Compassionate Care',
        description: 'We treat every pet with love, patience, and personalized attention.',
      },
      {
        icon: 'Clock',
        title: '24/7 Emergency',
        description: 'Round-the-clock emergency services for urgent pet health situations.',
      },
      {
        icon: 'Shield',
        title: 'Modern Facilities',
        description: 'State-of-the-art diagnostic equipment and comfortable environment.',
      },
      {
        icon: 'Star',
        title: 'Award Winning',
        description: 'Voted Best Veterinary Clinic 2024 by the Local Pet Owners Association.',
      },
      {
        icon: 'Users',
        title: 'Family Friendly',
        description: 'Welcoming atmosphere where pet owners are part of the care team.',
      },
    ],
  },
  services: {
    isShow: true,
    order: 3,
    title: 'Our Services',
    subtitle: 'Comprehensive veterinary care tailored to your pet needs',
    items: [
      {
        id: 'svc-1',
        title: 'General Checkup',
        description: 'Complete physical examination, weight check, and overall health assessment.',
        price: '$55',
        duration: '30 min',
        image: '/images/service-1.jpg',
      },
      {
        id: 'svc-2',
        title: 'Vaccinations',
        description: 'Core and lifestyle vaccines to protect against common diseases.',
        price: '$40',
        duration: '20 min',
        image: '/images/service-2.jpg',
      },
      {
        id: 'svc-3',
        title: 'Dental Care',
        description: 'Professional cleaning, extractions, and oral health maintenance.',
        price: '$95',
        duration: '1 hour',
        image: '/images/service-3.jpg',
      },
      {
        id: 'svc-4',
        title: 'Surgery',
        description: 'Spay/neuter, tumor removal, and advanced surgical procedures.',
        price: '$250+',
        duration: '2-4 hours',
        image: '/images/service-4.jpg',
      },
      {
        id: 'svc-5',
        title: 'Emergency Care',
        description: 'Immediate attention for critical injuries, poisoning, and acute illness.',
        price: '$150',
        duration: 'Varies',
        image: '/images/service-5.jpg',
      },
      {
        id: 'svc-6',
        title: 'Pet Grooming',
        description: 'Bathing, haircuts, nail trimming, and ear cleaning services.',
        price: '$45',
        duration: '1 hour',
        image: '/images/service-6.jpg',
      },
    ],
  },
  testimonials: {
    isShow: true,
    order: 4,
    title: 'What Pet Parents Say',
    items: [
      {
        name: 'Sarah Johnson',
        petName: 'Buddy (Golden Retriever)',
        rating: 5,
        comment:
          'Dr. Martinez saved my dogs life during an emergency. The entire team was calm, professional, and incredibly caring. I cannot recommend them enough!',
        avatar: '/images/avatar-1.jpg',
      },
      {
        name: 'Michael Chen',
        petName: 'Luna (Persian Cat)',
        rating: 5,
        comment:
          'My cat used to be terrified of vet visits, but the staff here made her feel so comfortable. They truly understand animal behavior and anxiety.',
        avatar: '/images/avatar-2.jpg',
      },
      {
        name: 'Emily Rodriguez',
        petName: 'Rocky (German Shepherd)',
        rating: 5,
        comment:
          'Excellent facilities and transparent pricing. They explained every procedure and kept me informed throughout Rockys surgery. Top-notch care!',
        avatar: '/images/avatar-3.jpg',
      },
      {
        name: 'David Park',
        petName: 'Mochi (Rabbit)',
        rating: 4,
        comment:
          'Great experience with my exotic pet. Not many clinics handle rabbits, but they have a specialist who was fantastic with Mochi.',
        avatar: '/images/avatar-4.jpg',
      },
    ],
  },
  faq: {
    isShow: true,
    order: 5,
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What services do you offer?',
        answer:
          'We offer comprehensive veterinary services including wellness exams, vaccinations, dental care, surgery, emergency services, diagnostic imaging, laboratory testing, and specialized care for exotic pets.',
      },
      {
        question: 'How do I book an appointment?',
        answer:
          'Booking is easy! Click the "Book Appointment" button on our website, select your service, choose a date and time, fill in your details, and confirm. You will receive a confirmation email immediately.',
      },
      {
        question: 'Do you offer emergency services?',
        answer:
          'Yes, we provide 24/7 emergency veterinary care. Our emergency hotline is always available, and our trained staff can handle critical situations at any time of day or night.',
      },
      {
        question: 'What should I bring to my first visit?',
        answer:
          'Please bring any previous medical records, a list of current medications, vaccination history, and a fresh stool sample if possible. Also bring your pet on a leash or in a carrier.',
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'Yes, we understand that veterinary care can be expensive. We offer flexible payment plans through our partnership with CareCredit. Contact our office for more details.',
      },
      {
        question: 'Are walk-ins accepted?',
        answer:
          'We prioritize scheduled appointments to ensure every pet receives adequate time and attention. However, we do accept walk-ins for urgent cases based on availability.',
      },
    ],
  },
  cta: {
    isShow: true,
    order: 6,
    title: 'Give Your Pet the Care They Deserve',
    subtitle:
      'Join thousands of happy pet parents who trust us with their furry family members. Book your first appointment today and receive a complimentary wellness kit.',
    buttonText: 'Schedule Now',
  },
};

/** ───────────────────────────────────────────
 *  Template 2: Warm & Friendly
 *  ─────────────────────────────────────────── */

export const template2Content: LandingPageContent = {
  metadata: {
    title: 'Your Pet Home Away From Home',
    description:
      'A warm, welcoming veterinary clinic where your pets are treated like family. Experience the difference of truly compassionate care.',
    favicon: '/favicon.ico',
    ogImage: '/images/og-image-2.jpg',
  },
  primaryColor: '#E8734A',
  secondaryColor: '#FFF8F5',
  hero: {
    isShow: true,
    order: 1,
    title: 'Where Every Pet is Family',
    subtitle:
      'Step into a warm, welcoming space where tails wag, purrs resonate, and every pet receives the loving care they deserve.',
    backgroundImage: '/images/hero-bg-2.jpg',
    ctaText: 'Meet Our Team',
  },
  features: {
    isShow: true,
    order: 2,
    title: 'Made with Love',
    items: [
      {
        icon: 'Heart',
        title: 'Gentle Handling',
        description: 'Our team uses fear-free techniques to keep your pet calm and happy.',
      },
      {
        icon: 'Home',
        title: 'Cozy Environment',
        description: 'Designed to feel like home with soothing colors and comfortable spaces.',
      },
      {
        icon: 'Cookie',
        title: 'Treats & Comfort',
        description: 'Every visit includes treats, belly rubs, and lots of positive reinforcement.',
      },
      {
        icon: 'Phone',
        title: 'Follow-Up Care',
        description: 'We check in after every visit to ensure your pet is doing well at home.',
      },
      {
        icon: 'Gift',
        title: 'New Puppy/Kitten Kits',
        description: 'Free starter kits with essentials for your new furry family member.',
      },
      {
        icon: 'CalendarHeart',
        title: 'Birthday Reminders',
        description: 'We remember your pets birthday and send special wishes and offers!',
      },
    ],
  },
  services: {
    isShow: true,
    order: 3,
    title: 'Our Loving Services',
    subtitle: 'Care that comes straight from the heart',
    items: [
      {
        id: 'svc-1',
        title: 'Wellness Hugs',
        description: 'Gentle checkups with extra cuddles and treats for a positive experience.',
        price: '$50',
        duration: '30 min',
        image: '/images/service-1.jpg',
      },
      {
        id: 'svc-2',
        title: 'Protective Shots',
        description: 'Vaccinations administered with care and minimal discomfort.',
        price: '$35',
        duration: '15 min',
        image: '/images/service-2.jpg',
      },
      {
        id: 'svc-3',
        title: 'Smile Bright',
        description: 'Dental care that keeps those tails wagging and those purrs going.',
        price: '$85',
        duration: '45 min',
        image: '/images/service-3.jpg',
      },
      {
        id: 'svc-4',
        title: 'Healing Hands',
        description: 'Surgical care with the gentlest touch and most advanced techniques.',
        price: '$225+',
        duration: '2-4 hours',
        image: '/images/service-4.jpg',
      },
      {
        id: 'svc-5',
        title: 'Always Here',
        description: '24/7 emergency care because we know worries do not keep office hours.',
        price: '$140',
        duration: 'Varies',
        image: '/images/service-5.jpg',
      },
      {
        id: 'svc-6',
        title: 'Spa Day',
        description: 'Full grooming with massage, aromatherapy, and premium products.',
        price: '$55',
        duration: '1.5 hours',
        image: '/images/service-6.jpg',
      },
    ],
  },
  testimonials: {
    isShow: true,
    order: 4,
    title: 'Happy Tails & Purrs',
    items: [
      {
        name: 'Jessica Williams',
        petName: 'Cooper (Labrador)',
        rating: 5,
        comment:
          'Cooper used to shake at the vet, but now he gets excited! The staff knows him by name and always has treats ready. It is like visiting family!',
        avatar: '/images/avatar-1.jpg',
      },
      {
        name: 'Tom Anderson',
        petName: 'Whiskers (Tabby)',
        rating: 5,
        comment:
          'When Whiskers got sick, they called every day to check on him. That level of care is rare. They truly love what they do.',
        avatar: '/images/avatar-2.jpg',
      },
      {
        name: 'Lisa Nakamura',
        petName: 'Daisy (Beagle)',
        rating: 5,
        comment:
          'The waiting room has separate areas for cats and dogs, which really helps with anxiety. Every detail shows they care about pet comfort.',
        avatar: '/images/avatar-3.jpg',
      },
      {
        name: 'Robert Garcia',
        petName: 'Thor (Husky)',
        rating: 5,
        comment:
          'They threw Thor a birthday party during his checkup! The photos they sent melted my heart. This place is truly special.',
        avatar: '/images/avatar-4.jpg',
      },
    ],
  },
  faq: {
    isShow: true,
    order: 5,
    title: 'Questions from Pet Parents',
    items: [
      {
        question: 'Will my pet feel comfortable?',
        answer:
          'Absolutely! Our clinic is designed with fear-free principles. We have separate waiting areas, pheromone diffusers, calming music, and treats. Our staff is trained in gentle handling techniques.',
      },
      {
        question: 'Can I stay with my pet during exams?',
        answer:
          'Yes, we encourage pet parents to stay with their pets during exams. Your presence helps keep them calm and comfortable throughout the visit.',
      },
      {
        question: 'Do you offer new pet consultations?',
        answer:
          'We love meeting new pets! Our new pet consultations include a full exam, vaccination schedule, nutrition advice, and a complimentary starter kit with samples and toys.',
      },
      {
        question: 'How do you handle anxious pets?',
        answer:
          'We use fear-free techniques including gentle restraint, positive reinforcement, pre-visit calming protocols, and when needed, mild sedation for extremely anxious pets.',
      },
      {
        question: 'What if I need to cancel?',
        answer:
          'We understand life happens. Please cancel at least 24 hours in advance. Late cancellations may incur a small fee, but we are always understanding of emergencies.',
      },
    ],
  },
  cta: {
    isShow: true,
    order: 6,
    title: 'Join Our Pet Family Today',
    subtitle:
      'Every pet deserves a veterinary team that loves them as much as you do. Come experience the warmth and care that sets us apart.',
    buttonText: 'Book a Visit',
  },
};

/** ───────────────────────────────────────────
 *  Template 3: Professional Clinical
 *  ─────────────────────────────────────────── */

export const template3Content: LandingPageContent = {
  metadata: {
    title: 'Advanced Veterinary Medicine & Surgical Excellence',
    description:
      'State-of-the-art veterinary facility offering advanced diagnostics, specialized surgery, and comprehensive medical care for companion animals.',
    favicon: '/favicon.ico',
    ogImage: '/images/og-image-3.jpg',
  },
  primaryColor: '#0F4C3A',
  secondaryColor: '#F0F4F2',
  hero: {
    isShow: true,
    order: 1,
    title: 'Advanced Veterinary Medicine',
    subtitle:
      'Board-certified specialists, cutting-edge diagnostics, and evidence-based treatments for optimal patient outcomes.',
    backgroundImage: '/images/hero-bg-3.jpg',
    ctaText: 'Schedule Consultation',
  },
  features: {
    isShow: true,
    order: 2,
    title: 'Clinical Excellence',
    items: [
      {
        icon: 'Microscope',
        title: 'Advanced Diagnostics',
        description:
          'Digital radiography, ultrasound, CT scanning, and in-house laboratory capabilities.',
      },
      {
        icon: 'Scissors',
        title: 'Board-Certified Surgeons',
        description:
          'ACVS diplomates performing orthopedic, soft tissue, and minimally invasive procedures.',
      },
      {
        icon: 'Activity',
        title: 'Evidence-Based Medicine',
        description:
          'Treatment protocols grounded in peer-reviewed research and clinical best practices.',
      },
      {
        icon: 'Brain',
        title: 'Neurology & Imaging',
        description: 'MRI and CT neuroimaging with board-certified neurologists on staff.',
      },
      {
        icon: 'FlaskConical',
        title: 'Clinical Research',
        description:
          'Active participation in veterinary clinical trials and continuing education programs.',
      },
      {
        icon: 'Award',
        title: 'AAHA Accredited',
        description: 'Meeting the highest standards of veterinary excellence since 2010.',
      },
    ],
  },
  services: {
    isShow: true,
    order: 3,
    title: 'Medical Services',
    subtitle: 'Comprehensive diagnostic and treatment modalities',
    items: [
      {
        id: 'svc-1',
        title: 'Internal Medicine',
        description:
          'Complex case management including endocrinology, gastroenterology, and infectious disease.',
        price: '$175',
        duration: '45 min',
        image: '/images/service-1.jpg',
      },
      {
        id: 'svc-2',
        title: 'Orthopedic Surgery',
        description: 'TPLO, THR, fracture repair, and arthroscopy by board-certified surgeons.',
        price: '$2,500+',
        duration: '2-3 hours',
        image: '/images/service-2.jpg',
      },
      {
        id: 'svc-3',
        title: 'Oncology',
        description:
          'Chemotherapy, radiation consultation, and comprehensive cancer care protocols.',
        price: '$300+',
        duration: '1 hour',
        image: '/images/service-3.jpg',
      },
      {
        id: 'svc-4',
        title: 'Cardiology',
        description: 'Echocardiography, ECG, Holter monitoring, and cardiac catheterization.',
        price: '$350',
        duration: '1 hour',
        image: '/images/service-4.jpg',
      },
      {
        id: 'svc-5',
        title: 'Emergency & Critical Care',
        description: 'Level 1 trauma center with 24/7 intensivist coverage and ventilator support.',
        price: '$200',
        duration: 'Varies',
        image: '/images/service-5.jpg',
      },
      {
        id: 'svc-6',
        title: 'Rehabilitation',
        description: 'Underwater treadmill, therapeutic laser, acupuncture, and custom orthotics.',
        price: '$85',
        duration: '45 min',
        image: '/images/service-6.jpg',
      },
    ],
  },
  testimonials: {
    isShow: true,
    order: 4,
    title: 'Clinical Outcomes & Referrals',
    items: [
      {
        name: 'Dr. Amanda Foster, DVM',
        petName: 'Referring Veterinarian',
        rating: 5,
        comment:
          'I have referred complex orthopedic cases to their surgical team for 8 years. Their outcomes are exceptional and their communication with referring vets is outstanding.',
        avatar: '/images/avatar-1.jpg',
      },
      {
        name: 'James Mitchell',
        petName: 'Bruno (Rottweiler)',
        rating: 5,
        comment:
          'After Brunos TPLO surgery, the rehabilitation team had him walking normally within 8 weeks. Their follow-up care and detailed recovery plan was impressive.',
        avatar: '/images/avatar-2.jpg',
      },
      {
        name: 'Dr. Sarah Kim, PhD',
        petName: 'Research Collaborator',
        rating: 5,
        comment:
          'Their commitment to clinical research and evidence-based practice sets them apart. A true academic veterinary center with real-world compassion.',
        avatar: '/images/avatar-3.jpg',
      },
      {
        name: 'Patricia Holland',
        petName: 'Mittens (Senior Cat)',
        rating: 5,
        comment:
          'When Mittens was diagnosed with lymphoma, their oncology team provided clear options and compassionate care. She is in remission 18 months later.',
        avatar: '/images/avatar-4.jpg',
      },
    ],
  },
  faq: {
    isShow: true,
    order: 5,
    title: 'Clinical Information',
    items: [
      {
        question: 'What imaging modalities are available?',
        answer:
          'Our diagnostic imaging department offers digital radiography, high-resolution ultrasound, 64-slice CT scanning, and 1.5T MRI. All imaging is interpreted by board-certified radiologists.',
      },
      {
        question: 'Do I need a referral?',
        answer:
          'Referrals are required for specialty services (surgery, neurology, oncology, cardiology) to ensure continuity of care. Emergency and wellness services do not require referrals.',
      },
      {
        question: 'What are your surgical capabilities?',
        answer:
          'Our surgical suite features two dedicated ORs with positive-pressure ventilation, advanced anesthesia monitoring, and minimally invasive surgical equipment. We perform orthopedic, soft tissue, and neurosurgical procedures.',
      },
      {
        question: 'Do you participate in clinical trials?',
        answer:
          'Yes, we actively participate in veterinary clinical trials for novel therapeutics. Ask about current enrollment opportunities during your consultation.',
      },
      {
        question: 'What is your approach to pain management?',
        answer:
          'We employ multimodal analgesia protocols tailored to each patient, including local anesthetics, NSAIDs, opioids, and adjunctive therapies like acupuncture and therapeutic laser.',
      },
    ],
  },
  cta: {
    isShow: true,
    order: 6,
    title: 'Refer or Schedule a Consultation',
    subtitle:
      'Partner with a veterinary center committed to clinical excellence, advanced medicine, and superior patient outcomes.',
    buttonText: 'Contact Our Team',
  },
};

/** ───────────────────────────────────────────
 *  Tenant Data
 *  ─────────────────────────────────────────── */

export const tenants: Record<string, TenantInfo> = {
  asad123: {
    landingPageId: 'template-1',
    content: template1Content,
    primaryColor: template1Content.primaryColor,
    secondaryColor: template1Content.secondaryColor,
  },
  petcare: {
    landingPageId: 'template-2',
    content: template2Content,
    primaryColor: template2Content.primaryColor,
    secondaryColor: template2Content.secondaryColor,
  },
  vetmed: {
    landingPageId: 'template-3',
    content: template3Content,
    primaryColor: template3Content.primaryColor,
    secondaryColor: template3Content.secondaryColor,
  },
};

/** ───────────────────────────────────────────
 *  Users
 *  ─────────────────────────────────────────── */

export const mockUsers: Record<string, AuthUser> = {
  'jane@example.com': { id: 1, name: 'Jane Customer', email: 'jane@example.com', is_active: true },
  'john@example.com': { id: 2, name: 'John Smith', email: 'john@example.com', is_active: true },
  'sarah@example.com': {
    id: 3,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    is_active: true,
  },
};

/** ───────────────────────────────────────────
 *  Dashboard Data
 *  ─────────────────────────────────────────── */

export const mockDashboardData: DashboardDataResponse = {
  stats: {
    totalAppointments: 24,
    upcomingAppointments: 3,
    totalPets: 2,
    favoriteDoctors: 5,
  },
  appointments: [
    {
      id: 'appt-1',
      doctorName: 'Dr. Sarah Mitchell',
      doctorSpecialty: 'General Practice',
      doctorAvatar: '/images/doctor-1.jpg',
      date: '2024-03-25',
      time: '10:30 AM',
      status: 'confirmed',
      type: 'Wellness Exam',
      petName: 'Max',
    },
    {
      id: 'appt-2',
      doctorName: 'Dr. James Chen',
      doctorSpecialty: 'Surgery',
      doctorAvatar: '/images/doctor-2.jpg',
      date: '2024-03-28',
      time: '2:00 PM',
      status: 'pending',
      type: 'Follow-up',
      petName: 'Luna',
    },
    {
      id: 'appt-3',
      doctorName: 'Dr. Emily Rodriguez',
      doctorSpecialty: 'Dentistry',
      doctorAvatar: '/images/doctor-3.jpg',
      date: '2024-04-02',
      time: '11:00 AM',
      status: 'confirmed',
      type: 'Dental Cleaning',
      petName: 'Max',
    },
  ],
  favorites: [
    {
      id: 'doc-1',
      name: 'Dr. Sarah Mitchell',
      specialty: 'General Practice',
      avatar: '/images/doctor-1.jpg',
    },
    { id: 'doc-2', name: 'Dr. James Chen', specialty: 'Surgery', avatar: '/images/doctor-2.jpg' },
    {
      id: 'doc-3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dentistry',
      avatar: '/images/doctor-3.jpg',
    },
    {
      id: 'doc-4',
      name: 'Dr. Michael Park',
      specialty: 'Cardiology',
      avatar: '/images/doctor-4.jpg',
    },
    { id: 'doc-5', name: 'Dr. Lisa Wong', specialty: 'Neurology', avatar: '/images/doctor-5.jpg' },
  ],
  notifications: [
    {
      id: 'notif-1',
      type: 'booking',
      message: 'Appointment confirmed for March 25th with Dr. Mitchell',
      timestamp: '2024-03-20T10:00:00Z',
      isRead: false,
    },
    {
      id: 'notif-2',
      type: 'reminder',
      message: 'Max vaccination due in 2 weeks',
      timestamp: '2024-03-19T14:00:00Z',
      isRead: false,
    },
    {
      id: 'notif-3',
      type: 'system',
      message: 'Welcome to VetLlama! Complete your pet profile.',
      timestamp: '2024-03-18T09:00:00Z',
      isRead: true,
    },
    {
      id: 'notif-4',
      type: 'booking',
      message: 'Follow-up appointment rescheduled to March 28th',
      timestamp: '2024-03-17T16:00:00Z',
      isRead: true,
    },
  ],
  healthRecords: [
    {
      id: 'hr-1',
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      icon: 'Heart',
      date: '2024-03-15',
    },
    { id: 'hr-2', label: 'Weight', value: '28.5', unit: 'kg', icon: 'Scale', date: '2024-03-15' },
    {
      id: 'hr-3',
      label: 'Temperature',
      value: '38.5',
      unit: '°C',
      icon: 'Thermometer',
      date: '2024-03-15',
    },
    {
      id: 'hr-4',
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: 'Activity',
      date: '2024-03-01',
    },
  ],
  dependents: [
    {
      id: 'dep-1',
      name: 'Max',
      relationship: 'Dog - Golden Retriever',
      age: '5 years',
      avatar: '/images/pet-1.jpg',
    },
    {
      id: 'dep-2',
      name: 'Luna',
      relationship: 'Cat - Persian',
      age: '3 years',
      avatar: '/images/pet-2.jpg',
    },
  ],
};

/** ───────────────────────────────────────────
 *  Available Time Slots
 *  ─────────────────────────────────────────── */

export function generateMockSlots(_date: string): string[] {
  const slots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];
  // Randomly disable some slots to simulate availability
  return slots.filter(() => Math.random() > 0.3);
}
