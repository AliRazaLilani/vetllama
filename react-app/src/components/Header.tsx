import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(): JSX.Element {
  const [searchField, setSearchField] = useState(false)
  const [selectedCTA, setSelectedCTA] = useState<'order'|'consult'>('order')
  const [isFixed, setIsFixed] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number|null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      setIsFixed(window.pageYOffset > 50)
      const headerOne = document.querySelector('.header-one')
      if (headerOne && scroll > 35) headerOne.classList.add('header-space')
      else if (headerOne) headerOne.classList.remove('header-space')

      const headerTen = document.querySelector('.header-ten')
      if (headerTen && scroll > 35) headerTen.classList.add('header-space')
      else if (headerTen) headerTen.classList.remove('header-space')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleSubMenu = (i: number) => setOpenDropdownIndex(openDropdownIndex === i ? null : i)
  const toggleSearch = () => setSearchField(!searchField)
  const selectCTA = (cta: 'order'|'consult') => {
    setSelectedCTA(cta)
    if (cta === 'order') navigate('/')
    else navigate('/vet-registration')
  }

  return (
    <header className={`header header-custom header-default inner-header header-fixed relative ${isFixed ? 'fixed' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg header-nav">
          <div className="navbar-header">
            <a id="mobile_btn" onClick={() => document.body.classList.toggle('sidebar-open')}>
              <i className="fa-solid fa-bars"></i>
            </a>
            <Link to="/" className="navbar-brand logo">
              <img src="/assets/img/logo-3.png" className="img-fluid" alt="Logo" />
            </Link>
          </div>

          <div className="header-menu">
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="/" className="menu-logo">
                  <img src="/assets/img/logo-3.png" className="img-fluid" alt="Logo" />
                </Link>
                <a id="menu_close" onClick={() => document.body.classList.remove('sidebar-open')} className="menu-close">
                  <i className="fas fa-times"></i>
                </a>
              </div>

              <ul className="main-nav">
                <li className="has-submenu">
                  <a className="main-menu" onClick={() => toggleSubMenu(0)}>
                    Home
                  </a>
                </li>
              </ul>

              <div className="header-items">
                <div className="about-popup-item border-0 pb-0">
                  <h3 className="title">Contact Information</h3>
                  <div className="support-item mb-3">
                    <div className="avatar avatar-lg bg-primary rounded-circle">
                      <i className="isax isax-messages-3"></i>
                    </div>
                    <div>
                      <p className="title">General Inquiries</p>
                      <h5 className="link">info@example.com</h5>
                    </div>
                  </div>
                  <div className="support-item">
                    <div className="avatar avatar-lg bg-primary rounded-circle">
                      <i className="isax isax-call-calling"></i>
                    </div>
                    <div>
                      <p className="title">Emergency Cases</p>
                      <h5 className="link">+1 24565 89856</h5>
                    </div>
                  </div>
                </div>

                <div className="about-popup-item border-0 pb-0">
                  <h3 className="title">Follow Us</h3>
                  <ul className="d-flex align-items-center gap-2 social-iyem">
                    <li><a href="#" className="social-icon"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fa-brands fa-x-twitter"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fa-brands fa-linkedin"></i></a></li>
                  </ul>
                </div>

                <div className="header-items-button">
                  <Link to="/user-login" className="btn btn-primary btn-primary-gradient"><i className="isax isax-lock-1 me-2"></i>Logout</Link>
                </div>
              </div>
            </div>
          </div>

          <ul className="nav header-navbar-rht align-items-center cta-tabs">
            <li>
              <Link to="/map-grid" className="theme-btn btn-md btn-primary"><i className="isax isax-user-add me-2"></i><span>Book an Appointment</span></Link>
            </li>
            <li className={`cta-pill ${selectedCTA === 'order' ? 'active' : ''}`} style={{ top: -23, left: -342 }}>
              <a onClick={() => selectCTA('order')}>Pet parents</a>
            </li>
            <li className={`cta-pill ${selectedCTA === 'consult' ? 'active' : ''}`} style={{ top: -23, left: -240 }}>
              <a onClick={() => selectCTA('consult')}>Veterinarians</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
