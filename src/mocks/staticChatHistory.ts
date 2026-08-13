// import type { ChatMessageInput } from '@/components/dashboard/messagesModal';

export const STATIC_CHAT_MESSAGES = [
  {
    id: 1,
    sender_type: 'doctor',
    sender_name: 'Dr. Edalin Hendry',
    message: '',
    created_at: '2026-07-17T09:45:00Z',
    is_read: true,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    sender_type: 'customer',
    sender_name: 'Andrea Kearns',
    message: 'https://www.youtube.com/watch?v=GCmL3mS0Psk',
    created_at: '2026-07-17T09:47:00Z',
    attachments: [
      {
        id: 1,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
        name: 'Diet plan',
      },
    ],
  },
  {
    id: 3,
    sender_type: 'doctor',
    sender_name: 'Dr. Edalin Hendry',
    message: '',
    created_at: '2026-07-17T09:50:00Z',
    is_read: true,
    attachments: [
      {
        id: 2,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
        name: 'Nutrition plan',
      },
      {
        id: 3,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=500&q=80',
        name: 'Healthy groceries',
      },
      {
        id: 4,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=500&q=80',
        name: 'Meal guide',
      },
    ],
  },
  {
    id: 4,
    sender_type: 'customer',
    sender_name: 'Andrea Kearns',
    message: '',
    created_at: '2026-07-17T20:16:00Z',
    location: {
      label: 'My Location',
      latitude: 31.5204,
      longitude: 74.3587,
    },
  },
  {
    id: 5,
    sender_type: 'doctor',
    sender_name: 'Dr. Edalin Hendry',
    message: 'Thank you. I have reviewed the information and the location you shared.',
    created_at: '2026-07-17T20:20:00Z',
    is_read: true,
  },
];
