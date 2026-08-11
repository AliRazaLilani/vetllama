import React, { useEffect, useRef } from 'react';
import BreadcrumbSearch from './BreadcrumbSearch';
import { useNavigate } from 'react-router-dom';

const locations = [
  { id: 1, doc_name: 'Dr. Ruby Perrin', speciality: 'Psychologist', address: 'Florida, USA', nextavailable: 'Available on Fri, 22 Mar', amount: '$300 - $1000', lat: 53.470692, lng: -2.220328, image: '/assets/img/doctors/doctor-01.jpg' },
  { id: 2, doc_name: 'Dr. Darren Elder', speciality: 'Psychologist', address: 'Newyork, USA', nextavailable: 'Available on Fri, 23 Mar', amount: '$50 - $300', lat: 53.469189, lng: -2.199262, image: '/assets/img/doctors/doctor-02.jpg' },
  // ... truncated for brevity; add others as needed
];

export default function MapGrid() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const boundsRef = useRef(null);
  const infowindowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // set a base marker initialization similar to Angular component
    const initMap = () => {
      if (!window.google) return;
      const mapOptions = {
        zoom: 14,
        center: new window.google.maps.LatLng(53.470692, -2.220328),
        scrollwheel: false,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      };
      mapInstance.current = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      boundsRef.current = new window.google.maps.LatLngBounds();
      infowindowRef.current = new window.google.maps.InfoWindow({ content: 'loading...' });
      setMarkers(mapInstance.current, locations);
      mapInstance.current.fitBounds(boundsRef.current);
      window.google.maps.event.addListener(mapInstance.current, 'zoom_changed', () => {
        if (mapInstance.current.getZoom() > 16) mapInstance.current.slide = false;
      });
    };

    const setMarkers = (map, locs) => {
      locs.forEach((item) => {
        const latlng = new window.google.maps.LatLng(item.lat, item.lng);
        const marker = new window.google.maps.Marker({ position: latlng, map, icon: '/assets/img/marker.png' });
        boundsRef.current.extend(latlng);
        marker.addListener('click', () => {
          setInfo(item);
          infowindowRef.current.open(map, marker);
        });
      });
    };

    const setInfo = (marker) => {
      const content = `
        <div class="card border-0" style="width:100%;display:inline-block;">
          <div class="card-body">
            <div class="doc-img d-flex align-items-center">
              <a href="${marker.profile_link || '#'}" class="avatar flex-shrink-0 me-2 avatar-xl avatar-rounded" target="_blank">
                <img class="img-fluid" alt="${marker.doc_name}" src="${marker.image}" />
              </a>
              <div>
                <h6 class="title fs-16 mb-1"><a href="${marker.profile_link || '#'}">${marker.doc_name}</a><span class="badge bg-orange mt-1"><i class="fa-solid fa-star me-1"></i>5.0</span></h6>
                <p class="speciality text-indigo">${marker.speciality}</p>
              </div>
            </div>
            <div class="pro-content"><ul class="available-info"><li><i class="fas fa-map-marker-alt"></i> ${marker.address}</li></ul></div>
          </div>
        </div>`;
      infowindowRef.current.setContent(content);
    };

    // Wait until google maps is available
    if (window.google && window.google.maps) initMap();
    else {
      // Try to load maps if script tag exists on page elsewhere
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initMap();
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <>
      <BreadcrumbSearch />
      <div className="content top-space pet-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6"><h3 className="main-title">Showing <span className="text-secondary">450</span> Doctors For You</h3></div>
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-end mb-4">
                <div className="dropdown header-dropdown me-2">
                  <a className="dropdown-toggle sort-dropdown" data-bs-toggle="dropdown" href="#"> <span>Sort By</span>Price (Low to High)</a>
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
              {/* Filters and listings omitted for brevity - render static card example */}
              <div className="row">
                <div className="col-xxl-4 col-md-6">
                  <div className="card">
                    <div className="card-img card-img-hover">
                      <img src="/assets/img/doctor-grid/doctor-grid-011.webp" alt="" />
                      <div className="grid-overlay-item d-flex align-items-center justify-content-between"><span className="badge bg-orange"><i className="fa-solid fa-star me-1"></i>5.0</span><a href="#" className="fav-icon"><i className="fa fa-heart"></i></a></div>
                    </div>
                    <div className="card-body p-0">
                      <div className="d-flex active-bar align-items-center justify-content-between p-3"><a className="text-indigo fw-medium fs-14">Psychologist</a><span className="badge bg-success-light d-inline-flex align-items-center"><i className="fa-solid fa-circle fs-5 me-1"></i>Available</span></div>
                      <div className="p-3 pt-0">
                        <div className="doctor-info-detail mb-3 pb-3"><h3 className="mb-1"><a>Dr. Michael Brown</a></h3><div className="d-flex align-items-center"><p className="d-flex align-items-center mb-0 fs-14"><i className="isax isax-location me-2"></i>Minneapolis, MN</p><i className="fa-solid fa-circle fs-5 text-primary mx-2 me-1"></i><span className="fs-14 fw-medium">30 Min</span></div></div>
                        <div className="d-flex align-items-center justify-content-between"><div><p className="mb-1">Consultation Fees</p><h3 className="text-orange">$650</h3></div><a href="/booking" className="theme-btn btn-primary"><span><i className="isax isax-calendar-1 me-2"></i> Book Now</span></a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-3 map-right">
              <div id="map" ref={mapRef} style={{ width: '100%', height: '600px' }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
