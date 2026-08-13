import { CONSTANTS } from "../config/constants";


export function getDefaultContent(): any {
  return {
    metadata: {
      title: 'Expert Veterinary Care for Your Beloved Pets',
      description: 'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets. Book your appointment today.',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
      metadataValidation: {
        title: {
          min: 10,
          max: 60,
          default: 'Expert Veterinary Care for Your Beloved Pets',
          isShow: true,
          required: true,
          message: 'Title must be between 10-60 characters'
        },
        description: {
          min: 20,
          max: 160,
          default: 'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets. Book your appointment today.',
          isShow: true,
          required: true,
          message: 'Description must be between 20-160 characters'
        }
      }
    },
    primaryColor: CONSTANTS.DEFAULT_PRIMARY_COLOR,
    secondaryColor: CONSTANTS.DEFAULT_SECONDARY_COLOR,
    hero: {
      isShow: true,
      order: 1,
      title: 'Expert Veterinary Care for Your Beloved Pets',
      subtitle: 'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets.',
      backgroundImage: '/images/hero-bg.jpg',
      ctaText: 'Book Appointment',
      heroValidation: {
        title: {
          min: 10,
          max: 60,
          default: 'Expert Veterinary Care for Your Beloved Pets',
          isShow: true,
          required: true,
          message: 'Hero title must be between 10-60 characters'
        },
        subtitle: {
          min: 20,
          max: 200,
          default: 'Providing compassionate, comprehensive veterinary services for dogs, cats, and other pets.',
          isShow: true,
          required: true,
          message: 'Hero subtitle must be between 20-200 characters'
        },
        ctaText: {
          min: 3,
          max: 30,
          default: 'Book Appointment',
          isShow: true,
          required: true,
          message: 'CTA text must be between 3-30 characters'
        }
      }
    },
    features: {
      isShow: true,
      order: 2,
      title: 'Why Choose Us',
      items: [
        {
          icon: 'Stethoscope',
          title: 'Experienced Team',
          description: 'Our veterinarians have years of experience in pet care.'
        },
        {
          icon: 'Heart',
          title: 'Compassionate Care',
          description: 'We treat every pet with love and personalized attention.'
        },
        {
          icon: 'Clock',
          title: '24/7 Availability',
          description: 'Emergency services available around the clock every day.'
        },
      ],
      featuresValidation: {
        title: {
          min: 10,
          max: 50,
          default: 'Why Choose Us',
          isShow: true,
          required: true,
          message: 'Features title must be between 10-50 characters'
        },
        items: {
          min: 2,
          max: 6,
          default: [
            { icon: 'Stethoscope', title: 'Experienced Team', description: 'Our veterinarians have years of experience in pet care.' },
            { icon: 'Heart', title: 'Compassionate Care', description: 'We treat every pet with love and personalized attention.' },
            { icon: 'Clock', title: '24/7 Availability', description: 'Emergency services available around the clock every day.' }
          ],
          isShow: true,
          required: true,
          message: 'Features items must be between 2-6 items',
          itemValidation: {
            icon: {
              required: true,
              message: 'Icon is required'
            },
            title: {
              min: 3,
              max: 40,
              required: true,
              message: 'Feature title must be between 3-40 characters'
            },
            description: {
              min: 10,
              max: 150,
              required: true,
              message: 'Feature description must be between 10-150 characters'
            }
          }
        }
      }
    },
    services: {
      isShow: true,
      order: 3,
      title: 'Our Services',
      subtitle: 'Comprehensive care for your furry family members',
      items: [
        {
          id: '1',
          title: 'General Checkup',
          description: 'Complete physical examination and health assessment.',
          price: '$50',
          duration: '30 min',
          image: '/images/service-1.jpg'
        },
        {
          id: '2',
          title: 'Vaccination',
          description: 'Essential vaccines to protect your pet from diseases.',
          price: '$35',
          duration: '15 min',
          image: '/images/service-2.jpg'
        },
        {
          id: '3',
          title: 'Dental Care',
          description: 'Professional teeth cleaning and oral health services.',
          price: '$80',
          duration: '45 min',
          image: '/images/service-3.jpg'
        },
        {
          id: '4',
          title: 'Surgery',
          description: 'Advanced surgical procedures with expert care.',
          price: '$200',
          duration: '2 hours',
          image: '/images/service-4.jpg'
        },
      ],
      servicesValidation: {
        title: {
          min: 10,
          max: 50,
          default: 'Our Services',
          isShow: true,
          required: true,
          message: 'Services title must be between 10-50 characters'
        },
        subtitle: {
          min: 10,
          max: 100,
          default: 'Comprehensive care for your furry family members',
          isShow: true,
          required: false,
          message: 'Services subtitle must be between 10-100 characters'
        },
        items: {
          min: 2,
          max: 10,
          default: [
            { id: '1', title: 'General Checkup', description: 'Complete physical examination and health assessment.', price: '$50', duration: '30 min', image: '/images/service-1.jpg' },
            { id: '2', title: 'Vaccination', description: 'Essential vaccines to protect your pet from diseases.', price: '$35', duration: '15 min', image: '/images/service-2.jpg' },
            { id: '3', title: 'Dental Care', description: 'Professional teeth cleaning and oral health services.', price: '$80', duration: '45 min', image: '/images/service-3.jpg' },
            { id: '4', title: 'Surgery', description: 'Advanced surgical procedures with expert care.', price: '$200', duration: '2 hours', image: '/images/service-4.jpg' }
          ],
          isShow: true,
          required: true,
          message: 'Services items must be between 2-10 items',
          itemValidation: {
            title: {
              min: 5,
              max: 50,
              required: true,
              message: 'Service title must be between 5-50 characters'
            },
            description: {
              min: 15,
              max: 200,
              required: true,
              message: 'Service description must be between 15-200 characters'
            },
            price: {
              pattern: '/^\\$?\\d+(\\.\\d{2})?$/',
              required: true,
              message: 'Price must be a valid format (e.g., $50 or 50.00)'
            },
            duration: {
              pattern: '/^\\d+\\s*(min|hour|hours|hr|hrs)$/',
              required: true,
              message: 'Duration must be valid (e.g., 30 min, 2 hours)'
            }
          }
        }
      }
    },
    testimonials: {
      isShow: true,
      order: 4,
      title: 'What Our Clients Say',
      items: [
        {
          name: 'Sarah Johnson',
          petName: 'Max',
          rating: 5,
          comment: 'Amazing care for my pet! The staff was so kind and professional. Highly recommend their services to all pet owners.',
          avatar: '/images/avatar-1.jpg'
        },
        {
          name: 'Michael Chen',
          petName: 'Luna',
          rating: 5,
          comment: 'Best veterinary clinic in town. They took excellent care of my cat during her surgery. Very grateful for their expertise!',
          avatar: '/images/avatar-2.jpg'
        },
      ],
      testimonialsValidation: {
        title: {
          min: 10,
          max: 50,
          default: 'What Our Clients Say',
          isShow: true,
          required: true,
          message: 'Testimonials title must be between 10-50 characters'
        },
        items: {
          min: 1,
          max: 8,
          default: [
            { name: 'Sarah Johnson', petName: 'Max', rating: 5, comment: 'Amazing care for my pet! The staff was so kind and professional. Highly recommend their services to all pet owners.', avatar: '/images/avatar-1.jpg' },
            { name: 'Michael Chen', petName: 'Luna', rating: 5, comment: 'Best veterinary clinic in town. They took excellent care of my cat during her surgery. Very grateful for their expertise!', avatar: '/images/avatar-2.jpg' }
          ],
          isShow: true,
          required: true,
          message: 'Testimonials items must be between 1-8 items',
          itemValidation: {
            name: {
              min: 3,
              max: 50,
              required: true,
              message: 'Client name must be between 3-50 characters'
            },
            petName: {
              min: 2,
              max: 30,
              required: false,
              message: 'Pet name must be between 2-30 characters'
            },
            rating: {
              min: 1,
              max: 5,
              integer: true,
              required: true,
              message: 'Rating must be between 1-5'
            },
            comment: {
              min: 20,
              max: 500,
              required: true,
              message: 'Testimonial comment must be between 20-500 characters'
            }
          }
        }
      }
    },
    faq: {
      isShow: true,
      order: 5,
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What services do you offer?',
          answer: 'We offer a wide range of veterinary services including general checkups, vaccinations, dental care, surgery, emergency services, and specialized treatments for various conditions.'
        },
        {
          question: 'How do I book an appointment?',
          answer: 'You can book an appointment online through our website by clicking the "Book Appointment" button, or call our clinic directly during business hours.'
        },
        {
          question: 'Do you offer emergency services?',
          answer: 'Yes, we provide 24/7 emergency veterinary services. Our emergency team is always ready to handle urgent pet health situations.'
        },
      ],
      faqValidation: {
        title: {
          min: 10,
          max: 50,
          default: 'Frequently Asked Questions',
          isShow: true,
          required: true,
          message: 'FAQ title must be between 10-50 characters'
        },
        items: {
          min: 2,
          max: 15,
          default: [
            { question: 'What services do you offer?', answer: 'We offer a wide range of veterinary services including general checkups, vaccinations, dental care, surgery, emergency services, and specialized treatments for various conditions.' },
            { question: 'How do I book an appointment?', answer: 'You can book an appointment online through our website by clicking the "Book Appointment" button, or call our clinic directly during business hours.' },
            { question: 'Do you offer emergency services?', answer: 'Yes, we provide 24/7 emergency veterinary services. Our emergency team is always ready to handle urgent pet health situations.' }
          ],
          isShow: true,
          required: true,
          message: 'FAQ items must be between 2-15 items',
          itemValidation: {
            question: {
              min: 10,
              max: 200,
              required: true,
              message: 'FAQ question must be between 10-200 characters'
            },
            answer: {
              min: 20,
              max: 1000,
              required: true,
              message: 'FAQ answer must be between 20-1000 characters'
            }
          }
        }
      }
    },
    cta: {
      isShow: true,
      order: 6,
      title: 'Ready to Give Your Pet the Best Care?',
      subtitle: 'Book an appointment today and give your pet the care they deserve.',
      buttonText: 'Book Now',
      ctaValidation: {
        title: {
          min: 15,
          max: 80,
          default: 'Ready to Give Your Pet the Best Care?',
          isShow: true,
          required: true,
          message: 'CTA title must be between 15-80 characters'
        },
        subtitle: {
          min: 15,
          max: 150,
          default: 'Book an appointment today and give your pet the care they deserve.',
          isShow: true,
          required: true,
          message: 'CTA subtitle must be between 15-150 characters'
        },
        buttonText: {
          min: 3,
          max: 30,
          default: 'Book Now',
          isShow: true,
          required: true,
          message: 'CTA button text must be between 3-30 characters'
        }
      }
    }
  };
}