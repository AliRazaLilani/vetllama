import Header from '@/components/common/CompanyHeader'
import React, { useEffect, useState, type JSX } from 'react'
import { ChevronRight, Minus, Phone, Plus } from "lucide-react"
import { COMPANIES, getCurrentCompany } from '@/lib/utils/helpers'
import { Link } from 'react-router'

export default function Home(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(1)
  const [activeFaq, setActiveFaq] = useState(0);

  const company = getCurrentCompany() ?? COMPANIES[0]
  const supportEmailLink = company?.id == COMPANIES[1]?.id ? `tel:${company.supportPhone}` : `mailto:${company.supportEmail}`
  
  const faqs = [
    { q: 'Can I order medicines for any pet?', a: 'Yes, dogs, cats, birds, and more.' },
    { q: 'Is online consultation secure?', a: 'Yes, private, professional vet advice online.' },
    { q: 'How fast is delivery?', a: 'Medicines are delivered safely and promptly to your location.' },
    { q: 'Can I track vaccinations?', a: 'Yes, automatic reminders keep you on schedule.' },
    { q: 'Do I need a prescription?', a: "Certain medicines require a vet's prescription, which can be uploaded or obtained via our platform." },
  ]

  useEffect(() => {
    document.querySelectorAll('.animate-button').forEach((btn) => {
      const text = btn.getAttribute('data-text')
      const container = btn.querySelector('.button-text')
      if (!text || !container) return
      container.innerHTML = ''
      const chars = text.split('')
      const total = chars.length
      const angle = 360 / total
      chars.forEach((char, i) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.setProperty('--index', i.toString())
        span.style.setProperty('--angle', angle.toString())
        container.appendChild(span)
      })
    })
    document.body.classList.add('theme-5')
    return () => document.body.classList.remove('theme-5')
  }, [])

  const services = [
    "Certified Medical Professionals",
    "Advanced Diagnostic Tools",
    "Online Appointment Booking",
    "Electronic Health Records"
  ];

  // Combine the array with itself for the seamless loop
  const tickerItems = [...services, ...services];

  return (
    <>
      <Header />
      <section className="banner-section-six section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-header section-header-six">
                <div>
                  <div className="flex gap-4 items-center relative">
                  <h1 className="section-title hidden md:block">Caring for Your</h1>
                  <h1 className="section-title md:hidden block">Caring for</h1>
                  <span className="banner-icon"><img src="/assets/images/icons/banner-icon-4.png" alt="banner-icon" className="img-fluid img-one md:w-max md:h-max w-[150px] h-[150px] absolute -top-4 right-0 md:relative" /></span>
                </div>
                <h1 className="section-title md:hidden block">Your Pets</h1>
                </div>
                <div className="flex gap-2">
                  <h1 className="section-title block md:hidden mr-2">Made</h1>
                  <h1 className="section-title md:block hidden">Pets Made</h1>
                  <h1 className="section-title text-primary block md:hidden">Simple</h1>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="banner-icon"><img src="/assets/images/icons/banner-icon-5.png" alt="banner-icon" className="img-fluid img-one hidden md:block" /></span>
                <h1 className="section-title md:block hidden text-primary">Simple</h1>
                </div>
                <p>From prescriptions to vet advice and medicine delivery</p>
                <span className="banner-icon"><img src="/assets/images/icons/banner-icon-5.png" alt="banner-icon" className="img-fluid img-one mob-simp-img block mt-4 md:hidden md:w-max md:h-max w-[125px] h-[125px]" /></span>
                 <div className="banner-mobile-cta">
                  {company?.id != 2 && <Link to="/doctor-grid" className="btn-outline font-bold!">Book an Appointment</Link>}
                  <a target="_blank" rel="noreferrer" href={company.signupUrl} className="btn-solid font-bold!">Get Started</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner-img">
                <img src="/assets/images/banner/banner-img-7.png" alt="banner-img" className="img-fluid img-one banner-main-img" />
                <img src="/assets/images/bg/banner-img-1.png" alt="banner-img" className="img-fluid img-two" />
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/images/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
        <img src="/assets/images/icons/banner-icon-7.png" alt="banner-icon" className="img-fluid icon-two hidden md:block" />
      </section>

      <section className="about-section-six section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img-six">
                <img src="/assets/images/about/about-03.webp" alt="about" className="img-fluid img-one" />
                <img src="/assets/images/about/about-04.png" alt="about" className="img-fluid img-two" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content-six">
                <div className="section-header section-header-six">
                  <div className="section-sub-title ms-0">About Us</div>
                  <h2 className="section-title">Trusted <span className="line-6">Pet Care</span> at Your Fingertips</h2>
                  <p>We help pet parents give their furry friends the best care without the stress. Track health, order medicines, and consult vets easily, all through a safe, reliable platform built for pets and their parents.</p>
                </div>
                <div className="about d-flex align-items-center gap-4">
                  <div className={`about-vision ${activeIndex===1? 'active':''}`} onMouseEnter={() => setActiveIndex(1)}>
                    <h3 className="custom-title">Our Mission</h3>
                    <p className="para">Our mission is to simplify the way pet parents care for their animals by providing a complete, trusted platform for medicines, veterinary consultations, and health tracking.</p>
                    <img src="/assets/images/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
                  </div>
                  <div className={`about-vision ${activeIndex===2? 'active':''}`} onMouseEnter={() => setActiveIndex(2)}>
                    <h3 className="custom-title">Our Vision</h3>
                    <p className="para">Our vision is to make pet healthcare simple, accessible, and reliable for every pet parent.</p>
                    <img src="/assets/images/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/images/about/about-img-2.png" alt="about-img" className="img-fluid element-1" />
        <img src="/assets/images/icons/foot-prints-1.png" alt="about-img" className="img-fluid element-2" />
        <img src="/assets/images/icons/about-icons-1.svg" alt="about-img" className="img-fluid element-3" />
      </section>

      <section className="services-section-six section">
        <div className="container">
          <div className="section-header-six section-white text-center">
            <div className="section-sub-title">Services</div>
            <h2 className="section-title">Our <span className="line-6">Compassionate</span> Services</h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/images/icons/services-icon-1.png" alt="services" className="img-fluid icon-1" />
                  <div className="shape-one"></div>
                  <div className="shape-two"></div>
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Prescription Medicine Delivery</h3>
                  <p className="description">Fast, safe, verified delivery straight to your door.</p>
                </div>
                <img src="/assets/images/service/service-img-1.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/images/icons/services-icon-2.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Online Vet Consultations</h3>
                  <p className="description">Speak with licensed veterinarians</p>
                </div>
                <img src="/assets/images/service/service-img-2.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/images/icons/services-icon-3.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Health & Vaccination Tracking</h3>
                  <p className="description">Keep all your pet’s records in one place.</p>
                </div>
                <img src="/assets/images/service/service-img-3.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/images/icons/services-icon-4.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Nutrition & Supplement</h3>
                  <p className="description">Get vet-recommended diets and vitamins</p>
                </div>
                <img src="/assets/images/service/service-img-4.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

          </div>
        </div>
        <img src="/assets/images/icons/banner-icon-7.png" alt="banner-icon" className="img-fluid icon-one" />
      </section>

      <section className="whychoose-section-six section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="section-header-six">
                <div className="section-sub-title ms-0">Benefits</div>
                <h2 className="section-title">Why Pet Parents <span className="line-6">Trust Us</span></h2>
                <p>We combine trusted veterinary expertise with smart digital solutions to make pet care simple, reliable, and accessible for every pet parent.</p>
              </div>
              <div className="choose-item-six">
                <div className="choose-item-count"><span>01</span></div>
                <div className="choose-item-content">
                  <h3 className="custom-title">Trusted Veterinary Support</h3>
                  <p>Connect with licensed veterinarians anytime for reliable advice, accurate diagnoses, and professional care for your pets.</p>
                </div>
              </div>
              <div className="choose-item-six">
                <div className="choose-item-count"><span>02</span></div>
                <div className="choose-item-content">
                  <h3 className="custom-title">Fast & Safe Medicine Delivery</h3>
                  <p>Get verified pet medicines delivered quickly to your doorstep, ensuring your pet never misses essential treatment.</p>
                </div>
              </div>
              <div className="choose-item-six">
                <div className="choose-item-count"><span>03</span></div>
                <div className="choose-item-content">
                  <h3 className="custom-title">All-in-One Pet Care Platform</h3>
                  <p>From consultations to prescriptions and health tracking, manage everything your pet needs in one simple place.</p>
                </div>
              </div>
              <div className="choose-item-six mb-0">
                <div className="choose-item-count"><span>04</span></div>
                <div className="choose-item-content">
                  <h3 className="custom-title">Smart Health Tracking & Reminders</h3>
                  <p>Easily track vaccinations, treatments, and get timely alerts so you never miss an important update in your pet’s care.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="whychoose-img">
                <img src="/assets/images/about/choose-img-8.webp" alt="choose-img" className="img-fluid img-one" />
                <img src="/assets/images/about/choose-img-9.webp" alt="choose-img" className="img-fluid img-two" />
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/images/about/choose-img-10.png" alt="choose-img" className="img-fluid element-1" />
      </section>

      <section className="faq-section-six section">
        <div className="container">
          <div className="section-header-six text-center">
            <div className="section-sub-title">FAQ</div>
            <h2 className="section-title">
              Got Questions? <span className="line-6"> We’ve Got Answers </span>
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="faq-support">
                <img src="/assets/images/icons/support-icon.svg" alt="choose-img" className="img-fluid element-1" />
                <h3 className="custom-title">
                  We’re here to help with all your pet care concerns.
                </h3>
                <p className="description">
                  Our team will respond quickly with the best advice for your furry friend.
                </p>
                <a href={supportEmailLink} className="get-started-btn"><span className="get-started-fill" />

                <span className="get-started-content">
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 mr-2" />

                </span></a>
              </div>
              <div className="faq-help">
                <div className="about-popup-item border-0 pb-0 mb-0">
                  <div className="support-item">
                    <div className="avatar avatar-lg bg-primary rounded-circle flex-shrink-0">
                      {company?.id == COMPANIES[1]?.id ? <Phone className="w-4 h-4" /> : <i className="isax isax-sms"></i>}
                    </div>
                    <div>
                      <p className="title">General Inquiries</p>
                      <h4 className="link"><a href={supportEmailLink}>{company?.id == COMPANIES[1]?.id ? company.supportPhone : company.supportEmail}</a></h4>
                    </div>
                    <img src="/assets/images/service/support-img-1.png" alt="support-img-1" className="img-fluid img-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="faq-info wow zoomIn" data-wow-duration="1s">
                <div className="accordion">
                  {faqs.map((item, index) => {
                    const isOpen = activeFaq === index

                    return (
                      <div className={`accordion-item ${isOpen ? 'active' : ''}`} key={index}>
                        <h3 className="accordion-header">
                          <button
                            type="button"
                            className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                            onClick={() => setActiveFaq(isOpen ? -1 : index)}
                            aria-expanded={isOpen}
                            style={{ width: '100%', textAlign: 'left' }}
                          >
                            <div className="flex justify-between items-center gap-2 w-full">
                              {item.q}
                              {isOpen ? <Minus className='rounded-full w-6 h-6 p-1 text-white bg-dark' size={14} /> : <Plus className="rounded-full w-6 h-6 p-1 bg-secondary text-sm text-white flex items-center justify-center" size={14} />}
                            </div>
                          </button>
                        </h3>
                        {isOpen && (
                          <div className="accordion-body">
                            <div className="accordion-content">
                              <p>{item.a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="horizontal-slide slide-one slide-six d-flex" data-direction="left" data-speed="slow">
        <div className="slide-list d-flex gap-4">
          {tickerItems.map((text, index) => (
            <div key={index} className="services-slide">
              <h3>{text}</h3>
            </div>
          ))}
        </div>
      </div>

      <section className="article-section-six section">
        <div className="container">
          <div className="section-header-six text-center">
            <div className="section-sub-title">Latest Blogs</div>
            <h2 className="section-title">
              Pet Care <span className="line-6"> Tips & Advice </span>
            </h2>
          </div>

          <div className="row justify-content-center g-3">
            <div className="col-xl-4 col-md-6">
              <div className="blog-item-six">
                <div className="blog-image">
                  <a href="#"><img className="img-fluid" src="/assets/images/blog/blog-img-1.webp" alt="Post Image" /></a>
                </div>
                <div className="blog-content">
                  <h3 className="custom-title line-clamp-2">
                    <a href="#">Top 5 Ways to Keep Your Dog Healthy</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item-six">
                <div className="blog-image">
                  <a href="#"><img className="img-fluid" src="/assets/images/blog/blog-img-2.webp" alt="Post Image" /></a>
                </div>
                <div className="blog-content">
                  <h3 className="custom-title line-clamp-2">
                    <a href="#">Vaccination Checklist for pet</a>
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="blog-item-six">
                <div className="blog-image">
                  <a href="#"><img className="img-fluid" src="/assets/images/blog/blog-img-3.webp" alt="Post Image" /></a>
                </div>
                <div className="blog-content">
                  <h3 className="custom-title line-clamp-2">
                    <a href="#">Nutrition Tips for Puppies and Kittens</a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-six footer">
        <div className="footer-top">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="footer-widget footer-about d-flex justify-content-center align-items-center flex-column">
                  <div className="footer-logo">
                    <img src={company.footerLogo} width="200" alt={`${company.name} logo`} />
                  </div>
                  <p className="description">
                    {company.footerDescription}
                  </p>
                  <div className="footer-about-content">
                    <ul className="social-icon">
                      <li>
                        <a href="#"><i className="fa-brands fa-facebook"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fa-brands fa-twitter"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/assets/images/bg/footer-img-1.webp" alt="footer-img-1" className="img-fluid footer-img-1" />
          <img src="/assets/images/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
          <img src="/assets/images/icons/foot-prints-4.png" alt="banner-icon" className="img-fluid icon-two" />
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="copyright">
              <div className="row justify-content-center g-4">
                <div className="col-lg-12 justify-content-center d-flex">
                  <div className="copyright-text">
                    <p className="mb-0">
                      Copyright &copy; {new Date().getFullYear()} {company.name}. All Rights Reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
