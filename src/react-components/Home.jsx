import React, { useEffect, useState } from 'react';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    // animate-button replacement
    document.querySelectorAll('.animate-button').forEach((btn) => {
      const text = btn.getAttribute('data-text');
      const container = btn.querySelector('.button-text');
      if (!text || !container) return;
      container.innerHTML = '';
      const chars = text.split('');
      const total = chars.length;
      const angle = 360 / total;
      chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--index', i.toString());
        span.style.setProperty('--angle', angle.toString());
        container.appendChild(span);
      });
    });

    document.body.classList.add('theme-5');
    return () => document.body.classList.remove('theme-5');
  }, []);

  return (
    <>
      {/* Banner */}
      <section className="banner-section-six section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="section-header section-header-six">
                <h1 className="section-title">
                  Caring for Your
                  <img src="/assets/img/icons/banner-icon-4.png" alt="banner-icon" className="img-fluid img-one" />
                  <br />
                  Pets Made <br />
                  <img src="/assets/img/icons/banner-icon-5.png" alt="banner-icon" className="img-fluid img-one" />
                  Simple
                </h1>
                <p>From prescriptions to vet advice and medicine delivery</p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner-img">
                <img src="/assets/img/banner/banner-img-7.png" alt="banner-img" className="img-fluid img-one" />
                <img src="/assets/img/bg/banner-img-1.png" alt="banner-img" className="img-fluid img-two" />
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/img/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
        <img src="/assets/img/icons/banner-icon-7.png" alt="banner-icon" className="img-fluid icon-two" />
      </section>

      {/* About Us */}
      <section className="about-section-six section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img-six">
                <img src="/assets/img/about/about-03.webp" alt="about" className="img-fluid img-one" />
                <img src="/assets/img/about/about-04.png" alt="about" className="img-fluid img-two" />
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
                    <img src="/assets/img/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
                  </div>
                  <div className={`about-vision ${activeIndex===2? 'active':''}`} onMouseEnter={() => setActiveIndex(2)}>
                    <h3 className="custom-title">Our Vision</h3>
                    <p className="para">Our vision is to make pet healthcare simple, accessible, and reliable for every pet parent.</p>
                    <img src="/assets/img/icons/banner-icon-6.png" alt="banner-icon" className="img-fluid icon-one" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/img/about/about-img-2.png" alt="about-img" className="img-fluid element-1" />
        <img src="/assets/img/icons/foot-prints-1.png" alt="about-img" className="img-fluid element-2" />
        <img src="/assets/img/icons/about-icons-1.svg" alt="about-img" className="img-fluid element-3" />
      </section>

      {/* Services (kept markup identical) */}
      <section className="services-section-six section">
        <div className="container">
          <div className="section-header-six section-white text-center">
            <div className="section-sub-title">Services</div>
            <h2 className="section-title">Our <span className="line-6">Compassionate</span> Services</h2>
          </div>

          <div className="row g-4">
            {/* Service Items (4) - keep same structure */}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/img/icons/services-icon-1.png" alt="services" className="img-fluid icon-1" />
                  <div className="shape-one"></div>
                  <div className="shape-two"></div>
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Prescription Medicine Delivery</h3>
                  <p className="description">Fast, safe, verified delivery straight to your door.</p>
                </div>
                <img src="/assets/img/service/service-img-1.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/img/icons/services-icon-2.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Online Vet Consultations</h3>
                  <p className="description">Speak with licensed veterinarians</p>
                </div>
                <img src="/assets/img/service/service-img-2.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/img/icons/services-icon-3.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Health & Vaccination Tracking</h3>
                  <p className="description">Keep all your pet’s records in one place.</p>
                </div>
                <img src="/assets/img/service/service-img-3.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="services-item-six">
                <div className="services-icon">
                  <img src="/assets/img/icons/services-icon-4.png" alt="services" className="img-fluid icon-1" />
                </div>
                <div className="services-content">
                  <h3 className="custom-title">Nutrition & Supplement</h3>
                  <p className="description">Get vet-recommended diets and vitamins</p>
                </div>
                <img src="/assets/img/service/service-img-4.webp" alt="service-img" className="img-fluid overlay-img" />
              </div>
            </div>

          </div>
        </div>
        <img src="/assets/img/icons/banner-icon-7.png" alt="banner-icon" className="img-fluid icon-one" />
      </section>

    </>
  );
}
