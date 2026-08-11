import React, { useEffect, useRef, useState } from 'react'
import BreadcrumbSearch from './BreadcrumbSearch'

type Doctor = {
  id: number
  doc_name: string
  speciality: string
  address: string
  amount: string
  lat: number
  lng: number
  image: string
  rating: string
  time: string
  category: string
  badgeClass: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    doc_name: 'Dr. Michael Brown',
    speciality: 'Psychologist',
    address: 'Minneapolis, MN',
    amount: '$650',
    lat: 53.470692,
    lng: -2.220328,
    image: '/assets/img/doctor-grid/doctor-grid-011.webp',
    rating: '5.0',
    time: '30 Min',
    category: 'Psychologist',
    badgeClass: 'text-indigo',
  },
  {
    id: 2,
    doc_name: 'Dr. Nicholas Tello',
    speciality: 'Pediatrician',
    address: 'Ogden, IA',
    amount: '$400',
    lat: 53.469189,
    lng: -2.199262,
    image: '/assets/img/doctor-grid/doctor-grid-022.webp',
    rating: '4.6',
    time: '60 Min',
    category: 'Pediatrician',
    badgeClass: 'text-pink',
  },
  {
    id: 3,
    doc_name: 'Dr. Harold Bryant',
    speciality: 'Neurologist',
    address: 'Winona, MS',
    amount: '$500',
    lat: 53.468665,
    lng: -2.189269,
    image: '/assets/img/doctor-grid/doctor-grid-033.webp',
    rating: '4.8',
    time: '30 Min',
    category: 'Neurologist',
    badgeClass: 'text-teal',
  },
  {
    id: 4,
    doc_name: 'Dr. Sandra Jones',
    speciality: 'Cardiologist',
    address: 'Beckley, WV',
    amount: '$550',
    lat: 53.463894,
    lng: -2.17788,
    image: '/assets/img/doctor-grid/doctor-grid-044.webp',
    rating: '4.8',
    time: '30 Min',
    category: 'Cardiologist',
    badgeClass: 'text-info',
  },
  {
    id: 5,
    doc_name: 'Dr. Charles Scott',
    speciality: 'Neurologist',
    address: 'Hamshire, TX',
    amount: '$600',
    lat: 53.466359,
    lng: -2.213314,
    image: '/assets/img/doctor-grid/doctor-grid-055.webp',
    rating: '4.2',
    time: '30 Min',
    category: 'Neurologist',
    badgeClass: 'text-teal',
  },
  {
    id: 6,
    doc_name: 'Dr. Robert Thomas',
    speciality: 'Cardiologist',
    address: 'Oakland, CA',
    amount: '$450',
    lat: 53.45885,
    lng: -2.194549,
    image: '/assets/img/doctor-grid/doctor-grid-066.jpg',
    rating: '4.2',
    time: '30 Min',
    category: 'Cardiologist',
    badgeClass: 'text-info',
  },
]

const specialties = ['Specialities', 'Urology', 'Psychiatry', 'Cardiology']
const reviews = ['Reviews', '5 Star', '4 Star', '3 Star']
const clinics = ['Clinic', 'Bright Smiles Dental Clinic', 'Family Care Clinic', 'Express Health Clinic']

export default function MapGrid(): JSX.Element {
  const [speciality, setSpeciality] = useState(specialties[0])
  const [review, setReview] = useState(reviews[0])
  const [clinic, setClinic] = useState(clinics[0])
  const [availableOnly, setAvailableOnly] = useState(false)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const boundsRef = useRef<any>(null)
  const infowindowRef = useRef<any>(null)

  useEffect(() => {
    const initMap = () => {
      const googleAny = (window as any).google
      if (!googleAny || !googleAny.maps) return

      const mapOptions = {
        zoom: 14,
        center: new googleAny.maps.LatLng(53.470692, -2.220328),
        scrollwheel: false,
        mapTypeId: googleAny.maps.MapTypeId.ROADMAP,
      }

      mapInstance.current = new googleAny.maps.Map(mapRef.current as HTMLElement, mapOptions)
      boundsRef.current = new googleAny.maps.LatLngBounds()
      infowindowRef.current = new googleAny.maps.InfoWindow({ content: 'loading...' })
      setMarkers(mapInstance.current, doctors)
      mapInstance.current.fitBounds(boundsRef.current)

      googleAny.maps.event.addListener(mapInstance.current, 'zoom_changed', () => {
        if (mapInstance.current.getZoom() > 16) mapInstance.current.slide = false
      })
    }

    const setMarkers = (map: any, items: Doctor[]) => {
      if (!items || !map) return
      items.forEach((item) => {
        const latlng = new (window as any).google.maps.LatLng(item.lat, item.lng)
        const marker = new (window as any).google.maps.Marker({ position: latlng, map, icon: '/assets/img/marker.png' })
        boundsRef.current.extend(latlng)
        marker.addListener('click', () => {
          setInfo(item)
          infowindowRef.current.open(map, marker)
        })
      })
    }

    const setInfo = (marker: Doctor) => {
      const content = `
        <div class="card border-0" style="width:100%;display:inline-block;">
          <div class="card-body">
            <div class="doc-img d-flex align-items-center">
              <a href="#" class="avatar flex-shrink-0 me-2 avatar-xl avatar-rounded" target="_blank">
                <img class="img-fluid" alt="${marker.doc_name}" src="${marker.image}" />
              </a>
              <div>
                <h6 class="title fs-16 mb-1"><a href="#">${marker.doc_name}</a><span class="badge bg-orange mt-1"><i class="fa-solid fa-star me-1"></i>${marker.rating}</span></h6>
                <p class="speciality text-indigo">${marker.speciality}</p>
              </div>
            </div>
            <div class="pro-content"><ul class="available-info"><li><i class="fas fa-map-marker-alt"></i> ${marker.address}</li></ul></div>
          </div>
        </div>`
      if (infowindowRef.current) {
        infowindowRef.current.setContent(content)
      }
    }

    if ((window as any).google && (window as any).google.maps) {
      initMap()
    } else {
      const interval = window.setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          window.clearInterval(interval)
          initMap()
        }
      }, 500)
      return () => window.clearInterval(interval)
    }
  }, [])

  const filteredDoctors = doctors.filter((doctor) => {
    if (availableOnly && doctor.rating === '0') return false
    if (speciality !== specialties[0] && doctor.speciality !== speciality) return false
    return true
  })

  return (
    <>
      <BreadcrumbSearch />
      <div className="content top-space pet-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="mb-4">
                <h3 className="main-title">
                  Showing <span className="text-secondary">450</span> Doctors For You
                </h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <div className="dropdown header-dropdown me-2">
                  <a className="dropdown-toggle sort-dropdown" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                    <span>Sort By</span>Price (Low to High)
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a href="#" className="dropdown-item"> Price (Low to High) </a>
                    <a href="#" className="dropdown-item"> Price (High to Low) </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9">
              <div className="row align-items-center mb-4">
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-sm-4 col-6">
                      <div className="mb-4">
                        <select className="form-select custom-mat-select select" value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                          {specialties.map((item) => (
                            <option value={item} key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4 col-6">
                      <div className="mb-4">
                        <select className="form-select select" value={review} onChange={(e) => setReview(e.target.value)}>
                          {reviews.map((item) => (
                            <option value={item} key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4 col-6">
                      <div className="mb-4">
                        <select className="form-select select" value={clinic} onChange={(e) => setClinic(e.target.value)}>
                          {clinics.map((item) => (
                            <option value={item} key={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="text-end mb-3">
                    <button type="button" className="fw-medium text-secondary text-decoration-underline btn btn-link p-0" onClick={() => { setSpeciality(specialties[0]); setReview(reviews[0]); setClinic(clinics[0]); setAvailableOnly(false); }}>
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                <div className="doctor-filter-availability d-flex align-items-center gap-3">
                  <p className="mb-0">Availability</p>
                  <div className="status-toggle status-tog">
                    <input type="checkbox" id="status_6" className="check" checked={availableOnly} onChange={() => setAvailableOnly((prev) => !prev)} />
                    <label htmlFor="status_6" className="checktoggle">checkbox</label>
                  </div>
                </div>
              </div>

              <div className="row">
                {filteredDoctors.map((doctor) => (
                  <div className="col-xxl-4 col-md-6" key={doctor.id}>
                    <div className="card">
                      <div className="card-img card-img-hover">
                        <a href="#"><img src={doctor.image} alt={doctor.doc_name} /></a>
                        <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                          <span className="badge bg-orange"><i className="fa-solid fa-star me-1"></i>{doctor.rating}</span>
                          <a href="#" className="fav-icon"><i className="fa fa-heart"></i></a>
                        </div>
                      </div>
                      <div className="card-body p-0">
                        <div className={`d-flex active-bar align-items-center justify-content-between p-3 ${doctor.badgeClass}`}>
                          <a href="#" className={`fw-medium fs-14 ${doctor.badgeClass}`}>{doctor.category}</a>
                          <span className="badge bg-success-light d-inline-flex align-items-center"><i className="fa-solid fa-circle fs-5 me-1"></i>Available</span>
                        </div>
                        <div className="p-3 pt-0">
                          <div className="doctor-info-detail mb-3 pb-3">
                            <h3 className="mb-1"><a href="#">{doctor.doc_name}</a></h3>
                            <div className="d-flex align-items-center">
                              <p className="d-flex align-items-center mb-0 fs-14"><i className="isax isax-location me-2"></i>{doctor.address}</p>
                              <i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i>
                              <span className="fs-14 fw-medium">{doctor.time}</span>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <p className="mb-1">Consultation Fees</p>
                              <h3 className="text-orange">{doctor.amount}</h3>
                            </div>
                            <a href="#" className="theme-btn btn-primary"><span><i className="isax isax-calendar-1 me-2"></i> Book Now</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-12">
                <div className="pagination dashboard-pagination mt-md-3 mt-0 mb-4">
                  <ul>
                    <li><a href="#" className="page-link prev">Prev</a></li>
                    <li><a href="#" className="page-link">1</a></li>
                    <li><a href="#" className="page-link active">2</a></li>
                    <li><a href="#" className="page-link">3</a></li>
                    <li><a href="#" className="page-link">4</a></li>
                    <li><a href="#" className="page-link next">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div ref={mapRef} id="map" className="map-listing h-100" style={{ minHeight: '900px', width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
