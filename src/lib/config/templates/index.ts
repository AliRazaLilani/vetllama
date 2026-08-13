export const defaultTemplate = {
    branding: {
        seo: {
            meta_title: "Pet Doctor - Professional Veterinary Care",
            meta_description: "Providing compassionate veterinary care for your pets. Book appointments, find services, and meet our experienced team.",
            meta_keywords: "veterinary care, pet doctor, animal hospital, pet health, emergency vet",
            og_image: "",
            og_title: "Pet Doctor - Veterinary Care",
            og_description: "Gentle care for the little souls you love.",
            seoValidation: {
                meta_title: {
                    min: 10,
                    max: 60,
                    default: "Pet Doctor - Professional Veterinary Care",
                    required: true,
                    message: "Meta title must be between 10-60 characters"
                },
                meta_description: {
                    min: 20,
                    max: 160,
                    default: "Providing compassionate veterinary care for your pets. Book appointments, find services, and meet our experienced team.",
                    required: true,
                    message: "Meta description must be between 20-160 characters"
                },
                meta_keywords: {
                    min: 10,
                    max: 100,
                    default: "veterinary care, pet doctor, animal hospital, pet health, emergency vet",
                    required: true,
                    message: "Meta keywords must be between 10-100 characters"
                },
                og_title: {
                    min: 10,
                    max: 60,
                    default: "Pet Doctor - Veterinary Care",
                    required: true,
                    message: "OG title must be between 10-60 characters"
                },
                og_description: {
                    min: 20,
                    max: 160,
                    default: "Gentle care for the little souls you love.",
                    required: true,
                    message: "OG description must be between 20-160 characters"
                }
            }
        },
        favicon_url: "",
        logo_url: "",
        primary_color: "",
        secondary_color: "",
        banner_images: {},
        social_links: {},
        metadataValidation: {
            title: {
                min: 10,
                max: 60,
                default: "Pet Doctor - Veterinary Care",
                required: true,
                message: "Title must be between 10-60 characters"
            },
            description: {
                min: 20,
                max: 160,
                default: "Gentle care for the little souls you love.",
                required: true,
                message: "Description must be between 20-160 characters"
            },
            favicon: {
                default: "",
                required: true,
                message: "Favicon URL is required"
            },
            logo: {
                default: "",
                required: true,
                message: "Logo URL is required"
            },
            primary_color: {
                default: "#4A90E2",
                required: false,
                message: "Primary color is required"
            },
            secondary_color: {
                default: "#2ECC71",
                required: false,
                message: "Secondary color is required"
            }
        }
    },


    marketingContent: {
        header: {
            isShow: true,
            logoText: "Pet Doctor",
            logoIcon: "PawPrint",
            menu_items: [
                { label: "About", url: "#about" },
                { label: "Services", url: "#services" },
                { label: "Reviews", url: "#reviews" },
                { label: "Contact Us", url: "#contact" }
            ],
            cta_button: {
                label: "Book Appointment",
                url: "/appointment"
            },
            navigationValidation: {
                logoText: {
                    min: 2,
                    max: 30,
                    default: "Pet Doctor",
                    required: true,
                    message: "Logo text must be between 2-30 characters"
                },
                logoIcon: {
                    default: "PawPrint",
                    required: true,
                    message: "Logo icon is required"
                },
                menu_items: {
                    min: 3,
                    max: 8,
                    default: [],
                    required: true,
                    message: "At least 3 menu items are required",
                    itemValidation: {
                        label: { min: 2, max: 20, default: "", required: true, message: "Menu label must be 2-20 characters" },
                        url: { min: 1, max: 100, default: "", required: true, message: "Menu URL is required" }
                    }
                },
                cta_button: {
                    label: { min: 3, max: 30, default: "Book Appointment", required: true, message: "CTA button label must be between 3-30 characters" },
                    url: { min: 1, max: 100, default: "/appointment", required: true, message: "CTA button URL is required" }
                }
            }
        },
        hero: {
            isShow: true,
            banner_image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
            badge: "VET CLINIC & AT-HOME CARE",
            heading: "Your Pet's Health is Our Priority",
            headingHighlight: "little souls",
            sub_heading: "Dr. Elena Marsh offers unhurried, modern veterinary care in-clinic, on video, or at your kitchen table. Book online in under a minute.",
            primaryCta: {
                label: "Book an appointment",
                url: "/appointment"
            },
            secondaryCta: {
                label: "See how we care",
                url: "#about"
            },
            stats: [
                { value: "12+", label: "YEARS IN PRACTICE" },
                { value: "4,800", label: "HAPPY PATIENTS" },
                { value: "4.9 ★", label: "FROM 620 REVIEWS" }
            ],
            imageBadge: {
                icon: "ShieldCheck",
                title: "FEAR FREE CERTIFIED",
                text: "Stress-free visits"
            },
            heroValidation: {
                banner_image: {
                    default: "",
                    required: true,
                    message: "Hero banner image is required"
                },
                badge: {
                    min: 5,
                    max: 40,
                    default: "VET CLINIC & AT-HOME CARE",
                    required: true,
                    message: "Badge must be between 5-40 characters"
                },
                heading: {
                    min: 10,
                    max: 80,
                    default: "Your Pet's Health is Our Priority",
                    required: true,
                    message: "Heading must be between 10-80 characters"
                },
                headingHighlight: {
                    min: 5,
                    max: 40,
                    default: "little souls",
                    required: false,
                    message: "Highlight must be between 5-40 characters"
                },
                sub_heading: {
                    min: 20,
                    max: 200,
                    default: "Providing compassionate and professional veterinary care for your beloved companions",
                    required: true,
                    message: "Sub-heading must be between 20-200 characters"
                },
                primaryCta: {
                    label: { min: 3, max: 30, default: "Book an appointment", required: true, message: "Button label must be between 3-30 characters" },
                    url: { min: 1, max: 100, default: "/appointment", required: true, message: "Button URL is required" }
                },
                secondaryCta: {
                    label: { min: 3, max: 30, default: "See how we care", required: true, message: "Button label must be between 3-30 characters" },
                    url: { min: 1, max: 100, default: "#about", required: true, message: "Button URL is required" }
                },
                stats: {
                    min: 1,
                    max: 4,
                    default: [],
                    required: true,
                    message: "Stats must have 1-4 items",
                    itemValidation: {
                        value: { min: 1, max: 20, default: "", required: true, message: "Stat value required" },
                        label: { min: 2, max: 40, default: "", required: true, message: "Stat label required" }
                    }
                },
                imageBadge: {
                    icon: { default: "ShieldCheck", required: true, message: "Badge icon required" },
                    title: { min: 3, max: 30, default: "", required: true, message: "Badge title required" },
                    text: { min: 3, max: 50, default: "", required: true, message: "Badge text required" }
                }
            }
        },
        about: {
            isShow: true,
            section_title: "About Pet Doctor",
            section_subtitle: "ABOUT DR. MARSH",
            about_image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
            badgeIcon: "Stethoscope",
            about_content: "I started this practice because I believe veterinary care shouldn't feel like an assembly line. When you book a visit, you get my undivided attention.",
            mission: "To provide accessible, compassionate, and high-quality veterinary care to all pets in our community.",
            vision: "To be the most trusted veterinary care provider, setting standards for excellence in pet healthcare.",
            features: [
                {
                    icon: "Clock",
                    title: "Unhurried Appointments",
                    description: "Standard visits are 40 minutes, giving us plenty of time to chat, examine, and plan."
                },
                {
                    icon: "Video",
                    title: "Modern Follow-ups",
                    description: "Message us anytime or jump on a quick video call to discuss test results or concerns."
                }
            ],
            aboutValidation: {
                section_title: {
                    min: 5,
                    max: 50,
                    default: "About Pet Doctor",
                    required: true,
                    message: "Section title must be between 5-50 characters"
                },
                section_subtitle: {
                    min: 5,
                    max: 100,
                    default: "ABOUT DR. MARSH",
                    required: true,
                    message: "Section subtitle must be between 5-100 characters"
                },
                about_image: {
                    default: "",
                    required: true,
                    message: "About section image is required"
                },
                badgeIcon: {
                    default: "Stethoscope",
                    required: true,
                    message: "Badge icon is required"
                },
                about_content: {
                    min: 20,
                    max: 500,
                    default: "",
                    required: true,
                    message: "About content must be between 20-500 characters"
                },
                mission: {
                    min: 20,
                    max: 200,
                    default: "",
                    required: true,
                    message: "Mission statement must be between 20-200 characters"
                },
                vision: {
                    min: 20,
                    max: 200,
                    default: "",
                    required: true,
                    message: "Vision statement must be between 20-200 characters"
                },
                features: {
                    min: 1,
                    max: 4,
                    default: [],
                    required: true,
                    message: "Features must have 1-4 items",
                    itemValidation: {
                        icon: { default: "Clock", required: true, message: "Icon required" },
                        title: { min: 3, max: 50, default: "", required: true, message: "Title required" },
                        description: { min: 10, max: 200, default: "", required: true, message: "Description required" }
                    }
                }
            }
        },
        services: {
            isShow: true,
            section_title: "How you want it, when you need it.",
            section_subtitle: "OUR SERVICES",
            description: "Choose the type of visit that works best for your schedule and your pet's comfort.",
            cards: [
                {
                    icon: "Stethoscope",
                    price: "$75",
                    duration: "40 MIN",
                    title: "Clinic Visit",
                    description: "Our calm, fear-free certified clinic in Brooklyn. Ideal for annual checkups and vaccines.",
                    features: ["Full physical exam", "Vaccinations & bloodwork", "Same-week openings"],
                    cta: { label: "Book clinic visit", url: "/appointment" }
                },
                {
                    icon: "Video",
                    price: "$45",
                    duration: "20 MIN",
                    title: "Video Consult",
                    description: "Expert advice from your couch. Perfect for minor concerns, triage, and behavioral questions.",
                    features: ["Available same-day", "No travel stress", "Prescriptions if needed"],
                    cta: { label: "Book video consult", url: "/appointment" }
                },
                {
                    icon: "Home",
                    price: "$195",
                    duration: "60 MIN",
                    title: "House Call",
                    description: "We bring the clinic to your living room. The ultimate stress-free option for anxious pets.",
                    features: ["Zero travel anxiety", "Multi-pet households", "Comprehensive exams"],
                    cta: { label: "Book home visit", url: "/appointment" }
                }
            ],
            servicesValidation: {
                section_title: {
                    min: 5,
                    max: 60,
                    default: "How you want it, when you need it.",
                    required: true,
                    message: "Section title must be between 5-60 characters"
                },
                section_subtitle: {
                    min: 5,
                    max: 100,
                    default: "OUR SERVICES",
                    required: true,
                    message: "Section subtitle must be between 5-100 characters"
                },
                description: {
                    min: 10,
                    max: 200,
                    default: "Choose the type of visit that works best for your schedule and your pet's comfort.",
                    required: true,
                    message: "Section description must be between 10-200 characters"
                },
                cards: {
                    min: 1,
                    max: 6,
                    default: [],
                    required: true,
                    message: "At least 1 service card required",
                    itemValidation: {
                        icon: { default: "Stethoscope", required: true, message: "Icon required" },
                        price: { min: 1, max: 20, default: "", required: true, message: "Price required" },
                        duration: { min: 1, max: 20, default: "", required: true, message: "Duration required" },
                        title: { min: 3, max: 50, default: "", required: true, message: "Title required" },
                        description: { min: 10, max: 200, default: "", required: true, message: "Description required" },
                        features: { min: 1, max: 5, default: [], required: true, message: "Features required" },
                        cta: {
                            label: { min: 3, max: 30, default: "", required: true, message: "CTA label required" },
                            url: { min: 1, max: 100, default: "", required: true, message: "CTA url required" }
                        }
                    }
                }
            }
        },
        howItWorks: {
            isShow: true,
            section_subtitle: "HOW IT WORKS",
            section_title: "From 'my dog seems off' to booked in under a minute.",
            description: "No phone tag, no waiting rooms of forms. Five clear steps, then a confirmation in your inbox.",
            cta: { label: "Book an appointment", url: "/appointment" },
            steps: [
                { number: "01", title: "Choose the type", description: "Clinic, video, or home visit." },
                { number: "02", title: "Pick date & time", description: "See live availability for the next two weeks." },
                { number: "03", title: "Tell us about your pet", description: "Name, species, and what's going on." },
                { number: "04", title: "Secure checkout", description: "Encrypted card payment — no surprises." },
                { number: "05", title: "Confirmation in your inbox", description: "Instant email with time, location, and prep notes." }
            ],
            howItWorksValidation: {
                section_title: {
                    min: 5,
                    max: 80,
                    default: "From 'my dog seems off' to booked in under a minute.",
                    required: true,
                    message: "Section title required"
                },
                section_subtitle: {
                    min: 5,
                    max: 50,
                    default: "HOW IT WORKS",
                    required: true,
                    message: "Subtitle required"
                },
                description: {
                    min: 10,
                    max: 200,
                    default: "No phone tag, no waiting rooms of forms.",
                    required: true,
                    message: "Description required"
                },
                cta: {
                    label: { min: 3, max: 30, default: "Book an appointment", required: true, message: "CTA label required" },
                    url: { min: 1, max: 100, default: "/appointment", required: true, message: "CTA url required" }
                },
                steps: {
                    min: 1,
                    max: 10,
                    default: [],
                    required: true,
                    message: "At least 1 step required",
                    itemValidation: {
                        number: { min: 1, max: 5, default: "", required: true, message: "Number required" },
                        title: { min: 3, max: 50, default: "", required: true, message: "Title required" },
                        description: { min: 5, max: 200, default: "", required: true, message: "Description required" }
                    }
                }
            }
        },
        testimonials: {
            isShow: true,
            section_title: "What Pet Parents Say",
            section_subtitle: "PATIENT LOVE",
            testimonial_items: [
                {
                    id: 1,
                    author: "Sarah Johnson",
                    pet: "Max",
                    pet_type: "Golden Retriever",
                    quote: "Dr. Smith and his team provided exceptional care for Max during his surgery. The compassion and professionalism shown made a difficult time much easier.",
                    rating: 5,
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
                },
                {
                    id: 2,
                    author: "Michael Brown",
                    pet: "Luna",
                    pet_type: "Cat",
                    quote: "I've been bringing Luna to Pet Doctor for years. They always treat her like family and provide the best care possible.",
                    rating: 5,
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                }
            ],
            testimonialsValidation: {
                section_title: {
                    min: 5,
                    max: 50,
                    default: "What Pet Parents Say",
                    required: true,
                    message: "Section title must be between 5-50 characters"
                },
                section_subtitle: {
                    min: 5,
                    max: 100,
                    default: "Real stories from our satisfied clients",
                    required: true,
                    message: "Section subtitle must be between 5-100 characters"
                },
                testimonial_items: {
                    min: 1,
                    max: 10,
                    default: [],
                    required: true,
                    message: "At least 1 testimonial required",
                    itemValidation: {
                        author: { min: 3, max: 50, default: "", required: true, message: "Name must be between 3-50 characters" },
                        pet: { min: 2, max: 30, default: "", required: true, message: "Pet name must be between 2-30 characters" },
                        pet_type: { min: 3, max: 30, default: "", required: true, message: "Pet type must be between 3-30 characters" },
                        quote: { min: 20, max: 300, default: "", required: true, message: "Testimonial must be between 20-300 characters" },
                        rating: { min: 1, max: 5, default: 5, required: true, message: "Rating must be between 1-5" },
                        avatar: { default: "", required: false, message: "Image is optional" }
                    }
                }
            }
        },
        team: {
            isShow: false,
            section_title: "Meet Our Team",
            section_subtitle: "Dedicated professionals who care for your pets",
            team_members: [],
            teamValidation: {
                section_title: { min: 5, max: 50, default: "Meet Our Team", required: true, message: "Section title required" },
                section_subtitle: { min: 5, max: 100, default: "Dedicated professionals", required: true, message: "Section subtitle required" },
                team_members: { min: 0, max: 10, default: [], required: true, message: "Team members required" }
            }
        },
        appointment: {
            isShow: false,
            section_title: "Book an Appointment",
            section_subtitle: "Schedule a visit with our experienced veterinarians",
            form_fields: {},
            pet_types: [],
            appointmentValidation: {
                section_title: { min: 5, max: 50, default: "Book an Appointment", required: true, message: "Section title required" },
                section_subtitle: { min: 5, max: 100, default: "Schedule a visit", required: true, message: "Section subtitle required" }
            }
        },
        gallery: {
            isShow: false,
            section_title: "Our Gallery",
            section_subtitle: "A glimpse into our veterinary practice",
            gallery_images: [],
            galleryValidation: {
                section_title: { min: 5, max: 50, default: "Our Gallery", required: true, message: "Section title required" },
                section_subtitle: { min: 5, max: 100, default: "A glimpse", required: true, message: "Section subtitle required" },
                gallery_images: { min: 0, max: 20, default: [], required: true, message: "Images required" }
            }
        },
        contact: {
            isShow: false,
            section_title: "Get In Touch",
            section_subtitle: "We'd love to hear from you",
            contact_info: {},
            contact_form: {},
            contactValidation: {
                section_title: { min: 5, max: 50, default: "Get In Touch", required: true, message: "Section title required" },
                section_subtitle: { min: 5, max: 100, default: "We'd love to hear from you", required: true, message: "Section subtitle required" }
            }
        },
        newsletter: {
            isShow: false,
            section_title: "Stay Updated",
            section_subtitle: "Subscribe to our newsletter for pet care tips and updates",
            button_label: "Subscribe",
            placeholder: "Enter your email address",
            success_message: "Thank you for subscribing!",
            newsletterValidation: {
                section_title: { min: 5, max: 50, default: "Stay Updated", required: true, message: "Section title required" },
                section_subtitle: { min: 5, max: 100, default: "Subscribe", required: true, message: "Section subtitle required" },
                button_label: { min: 3, max: 20, default: "Subscribe", required: true, message: "Button label required" },
                placeholder: { min: 5, max: 50, default: "Email", required: true, message: "Placeholder required" }
            }
        },
        footer: {
            isShow: true,
            logoText: "Pet Doctor",
            logoIcon: "PawPrint",
            footer_description: "Providing gentle and professional veterinary care for your beloved pets since 2005.",
            cta: { label: "Book a visit", url: "/appointment" },
            contact_info: {
                address: "142 Willow St\nBrooklyn, NY 11201",
                phone: "(718) 555-0139",
                email: "hello@dr-marsh.com",
            },
            hours: [
                { day: "Mon–Fri", time: "8:00 – 18:00" },
                { day: "Saturday", time: "9:00 – 14:00" },
                { day: "Sunday", time: "Closed" },
                { day: "Video visits", time: "daily till 21:00" }
            ],
            quick_links: [
                { label: "Privacy Policy", url: "#" },
                { label: "Terms & Condition", url: "#" }
            ],
            copyright_text: "© 2026 Dr. Marsh Veterinary. All rights reserved.",
            footerValidation: {
                logoText: { min: 2, max: 30, default: "Pet Doctor", required: true, message: "Logo text required" },
                logoIcon: { default: "PawPrint", required: true, message: "Logo icon required" },
                footer_description: {
                    min: 20,
                    max: 200,
                    default: "Providing gentle and professional veterinary care for your beloved pets since 2005.",
                    required: true,
                    message: "Footer description must be between 20-200 characters"
                },
                cta: {
                    label: { min: 2, max: 30, default: "Book a visit", required: true, message: "CTA label required" },
                    url: { min: 1, max: 100, default: "/appointment", required: true, message: "CTA url required" }
                },
                contact_info: {
                    address: { min: 10, max: 100, default: "", required: true, message: "Address must be between 10-100 characters" },
                    phone: { min: 10, max: 20, default: "", required: true, message: "Phone number must be between 10-20 characters" },
                    email: { min: 5, max: 50, default: "", required: true, message: "Valid email address is required" }
                },
                hours: {
                    min: 1,
                    max: 7,
                    default: [],
                    required: true,
                    message: "Hours must have 1-7 items",
                    itemValidation: {
                        day: { min: 2, max: 20, default: "", required: true, message: "Day required" },
                        time: { min: 2, max: 40, default: "", required: true, message: "Time required" }
                    }
                },
                quick_links: {
                    min: 1,
                    max: 10,
                    default: [],
                    required: true,
                    message: "At least 1 link required",
                    itemValidation: {
                        label: { min: 2, max: 30, default: "", required: true, message: "Label required" },
                        url: { min: 1, max: 100, default: "", required: true, message: "URL required" }
                    }
                },
                copyright_text: {
                    min: 10,
                    max: 100,
                    default: "© 2026 Dr. Marsh Veterinary. All rights reserved.",
                    required: true,
                    message: "Copyright text must be between 10-100 characters"
                }
            }
        },
    }
};