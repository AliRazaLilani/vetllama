import React, { type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BreadcrumbSearch(): JSX.Element {
  const navigate = useNavigate()
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate('/patients/search-doctor/search1') }
  return (
    <div className="breadcrumb-bar overflow-visible">
      <div className="container">
        <div className="row align-items-center inner-banner">
          <div className="col-md-12 col-12 text-center">
            <nav aria-label="breadcrumb" className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/"><i className="isax isax-home-15"></i></a></li>
                <li className="breadcrumb-item">Book Appointment</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="bg-primary-gradient rounded-pill doctors-search-box">
          <div className="search-box-one rounded-pill">
            <form onSubmit={onSubmit}>
              <div className="search-input search-line">
                <i className="isax isax-hospital5 bficon"></i>
                <div className="mb-0"><input type="text" className="form-control" placeholder="Search for Doctors, Hospitals, Clinics"/></div>
              </div>
              <div className="search-input search-map-line">
                <i className="isax isax-location5"></i>
                <div className="mb-0"><input type="text" className="form-control" placeholder="Location"/></div>
              </div>
              <div className="search-input search-calendar-line">
                <i className="isax isax-calendar-tick5"></i>
                <div className="mb-0"><input type="text" className="form-control" placeholder="Date"/></div>
              </div>
              <div className="form-search-btn">
                <button className="btn btn-primary d-inline-flex align-items-center rounded-pill" type="submit"><i className="isax isax-search-normal-15 me-2"></i>Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="breadcrumb-bg">
        <img src="/assets/images/bg/image1.png" alt="img" className="breadcrumb-bg-01" />
        <img src="/assets/images/bg/image2.png" alt="img" className="breadcrumb-bg-02" />
        <img src="/assets/images/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-03" />
        <img src="/assets/images/bg/breadcrumb-icon.png" alt="img" className="breadcrumb-bg-04" />
      </div>
    </div>
  )
}
