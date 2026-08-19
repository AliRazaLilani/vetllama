import BreadcrumbSearch from '@/components/common/BreadCrumbSearch'
import { Loader } from '@/components/common/Loader'
import { getCompanyTenants } from '@/lib/api/privateService'
import { ArrowRight, ChevronRight, Heart, MapPin, PawPrint, Pill, ShieldAlert, ShieldCheck, User } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useRef, useState, type JSX } from 'react'

type TenantDomain = {
  host: string
  domain: string
  type: string
  label: string
}

type Tenant = {
  id: number
  template_id: number | null
  name: string
  slug: string
  business_name: string | null
  image: string | null
  email: string | null
  primary_phone: string | null
  secondary_phone: string | null
  can_prescribe: number
  university_name: string | null
  university_address: string | null
  home_address: string | null
  home_latitude: string | null
  home_longitude: string | null
  short_bio: string | null
  support_email: string | null
  support_phone: string | null
  status: string
  onboarding_status: string
  onboarding_completed_at: string | null
  is_active: boolean
  published_at: string | null
  primary_domain: TenantDomain | null
}

type PaginationMeta = {
  total: number
  current: number
  first: number
  last: number
  previous: number
  next: number
  pages: number[]
  from: number
  to: number
}

const DEFAULT_IMAGE = '/assets/images/doctor-grid/doctor-grid-011.webp'
const DEFAULT_CENTER = { lat: 24.8607, lng: 67.0011 } // Karachi fallback
const PER_PAGE = 12

const ALL_CLINICS = 'All Clinics'
const PRESCRIBE_OPTIONS = ['Yes', 'No']

function parseCoord(value: string | null): number | null {
  if (!value) return null
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : null
}

const MIN_RADIUS_KM = 50
const MAX_RADIUS_KM = 200
const KM_TO_MILES = 0.621371

const GOOGLE_MAPS_API_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '' // TODO: set this
let googleMapsScriptPromise: Promise<void> | null = null

function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if ((window as any).google?.maps?.places) return Promise.resolve()
  if (googleMapsScriptPromise) return googleMapsScriptPromise

  googleMapsScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google Maps script'))
    document.head.appendChild(script)
  })

  return googleMapsScriptPromise
}

export default function MapGrid(): JSX.Element {
  const [prescribe, setPrescribe] = useState(PRESCRIBE_OPTIONS[0])
  const [addressInputEl, setAddressInputEl] = useState<HTMLInputElement | null>(null)
  const addressInputRef = useCallback((node: HTMLInputElement | null) => setAddressInputEl(node), [])
  const autocompleteRef = useRef<any>(null)
  const [searchAddress, setSearchAddress] = useState('')
  const [searchLat, setSearchLat] = useState<number | null>(null)
  const [searchLng, setSearchLng] = useState<number | null>(null)
  const [radiusKm, setRadiusKm] = useState<number>(MIN_RADIUS_KM)
  const [isGoogleMapsReady, setIsGoogleMapsReady] = useState(false)
  const [isLocatingUser, setIsLocatingUser] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)

  const [doctors, setDoctors] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true) // first-load, full screen
  const [error, setError] = useState<string | null>(null)

  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const boundsRef = useRef<any>(null)
  const infowindowRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const searchCircleRef = useRef<any>(null)

  const radiusMiles = useMemo(() => radiusKm * KM_TO_MILES, [radiusKm])

  const canPrescribeParam: boolean = prescribe === 'Yes'

  const hasLocationFilter = searchLat != null && searchLng != null

  useEffect(() => {
    let cancelled = false
    loadGoogleMapsScript()
      .then(() => {
        if (!cancelled) setIsGoogleMapsReady(true)
      })
      .catch((err) => {
        console.error('Failed to load Google Maps:', err)
        if (!cancelled) setLocationError('Failed to load location services.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isGoogleMapsReady || !addressInputEl || autocompleteRef.current) return

    const autocomplete = new (window as any).google.maps.places.Autocomplete(addressInputEl, {
      fields: ['formatted_address', 'geometry'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place?.geometry?.location) {
        setLocationError('Please select a location from the suggestions list.')
        return
      }

      setSearchAddress(place.formatted_address || addressInputEl.value || '')
      setSearchLat(place.geometry.location.lat())
      setSearchLng(place.geometry.location.lng())
      setLocationError(null)
      setPage(1)
    })

    autocompleteRef.current = autocomplete
  }, [isGoogleMapsReady, addressInputEl])

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value)
    setSearchLat(null)
    setSearchLng(null)
    setLocationError(null)
  }

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.')
      return
    }

    setIsLocatingUser(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setSearchLat(latitude)
        setSearchLng(longitude)
        setPage(1)

        if ((window as any).google?.maps) {
          const geocoder = new (window as any).google.maps.Geocoder()
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any, status: string) => {
            setIsLocatingUser(false)
            if (status === 'OK' && results?.[0]) {
              setSearchAddress(results[0].formatted_address)
              if (addressInputEl) addressInputEl.value = results[0].formatted_address
            }
          })
        } else {
          setIsLocatingUser(false)
        }
      },
      () => {
        setIsLocatingUser(false)
        setLocationError('Could not access your location. Please search for it manually.')
      }
    )
  }, [])

  const handleClearLocation = () => {
    setSearchAddress('')
    setSearchLat(null)
    setSearchLng(null)
    setLocationError(null)
    if (addressInputEl) addressInputEl.value = ''
    setPage(1)
  }

  useEffect(() => {
    let cancelled = false

    const fetchDoctors = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getCompanyTenants({
          page,
          per_page: PER_PAGE,
          ...(hasLocationFilter
            ? { latitude: searchLat, longitude: searchLng, radius: radiusKm }
            : {}),
          can_prescribe: canPrescribeParam,
        })

        if (!cancelled) {
          setDoctors(Array.isArray(data?.list) ? data.list : [])
          setPagination(data?.pagination ?? null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load clinics')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    const timeout = setTimeout(fetchDoctors, 350)

    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasLocationFilter, searchLat, searchLng, radiusKm, canPrescribeParam])


  const mappableDoctors = useMemo(() => {
    return doctors
      .map((t) => {
        const lat = parseCoord(t.home_latitude)
        const lng = parseCoord(t.home_longitude)
        return lat !== null && lng !== null ? { ...t, lat, lng } : null
      })
      .filter((t): t is Tenant & { lat: number; lng: number } => t !== null)
  }, [doctors])

  useEffect(() => {
    const clearMarkers = () => {
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []
    }

    const setInfo = (tenant: Tenant) => {
      const badge = tenant.can_prescribe ? 'Can Prescribe' : 'General'
      const websiteLink = tenant.primary_domain
        ? `https://${tenant.primary_domain.host}`
        : null

      const content = `
        <div class="card border-0" style="width:100%;display:inline-block;">
          <div class="card-body">
            <div class="doc-img d-flex align-items-center">
              <a href="${websiteLink || '#'}" class="avatar flex-shrink-0 me-2 avatar-xl avatar-rounded" target="_blank">
                <img class="img-fluid" alt="${tenant.business_name || tenant.name}" src="${tenant.image || DEFAULT_IMAGE}" />
              </a>
              <div>
                <h6 class="title fs-16 mb-1">
                  <a href="${websiteLink || '#'}" target="_blank">${tenant.business_name || tenant.name}</a>
                  <span class="badge bg-orange mt-1">${badge}</span>
                </h6>
                <p class="speciality text-indigo">${tenant.university_name || 'Veterinary Practice'}</p>
              </div>
            </div>
            <div class="pro-content">
              <ul class="available-info">
                <li><i class="fas fa-map-marker-alt"></i> ${tenant.home_address || 'Address not provided'}</li>
              </ul>
            </div>
          </div>
        </div>
      `

      infowindowRef.current?.setContent(content)
    }

    const setMarkers = (map: any, items: (Tenant & { lat: number; lng: number })[]) => {
      clearMarkers()
      if (!items.length || !map) return

      items.forEach((item) => {
        const latlng = new (window as any).google.maps.LatLng(item.lat, item.lng)

        const marker = new (window as any).google.maps.Marker({
          position: latlng,
          map,
          icon: '/assets/images/marker.png',
          title: item.business_name || item.name,
        })

        boundsRef.current.extend(latlng)
        markersRef.current.push(marker)

        marker.addListener('click', () => {
          setInfo(item)
          infowindowRef.current.open(map, marker)
        })
      })
    }

    const initMap = () => {
      const googleAny = (window as any).google
      if (!googleAny || !googleAny.maps || !mapRef.current) return

      const center = hasLocationFilter
        ? { lat: searchLat!, lng: searchLng! }
        : mappableDoctors.length
        ? { lat: mappableDoctors[0].lat, lng: mappableDoctors[0].lng }
        : DEFAULT_CENTER

      if (!mapInstance.current) {
        const mapOptions = {
          zoom: 14,
          center: new googleAny.maps.LatLng(center.lat, center.lng),
          scrollwheel: false,
          mapTypeId: googleAny.maps.MapTypeId.ROADMAP,
        }

        mapInstance.current = new googleAny.maps.Map(mapRef.current, mapOptions)
        infowindowRef.current = new googleAny.maps.InfoWindow({ content: 'loading...' })

        googleAny.maps.event.addListener(mapInstance.current, 'zoom_changed', () => {
          if (mapInstance.current.getZoom() > 16) {
            mapInstance.current.slide = false
          }
        })
      } else {
        mapInstance.current.setCenter(new googleAny.maps.LatLng(center.lat, center.lng))
      }

      if (searchCircleRef.current) {
        searchCircleRef.current.setMap(null)
        searchCircleRef.current = null
      }

      if (hasLocationFilter) {
        searchCircleRef.current = new googleAny.maps.Circle({
          strokeColor: '#B46935',
          strokeOpacity: 0.6,
          strokeWeight: 2,
          fillColor: '#FFC269',
          fillOpacity: 0.12,
          map: mapInstance.current,
          center: { lat: searchLat!, lng: searchLng! },
          radius: radiusKm * 1000, // meters
        })
      }

      boundsRef.current = new googleAny.maps.LatLngBounds()
      setMarkers(mapInstance.current, mappableDoctors)

      if (hasLocationFilter) {
        boundsRef.current.extend(new googleAny.maps.LatLng(searchLat!, searchLng!))
        mapInstance.current.fitBounds(boundsRef.current)
      } else if (!boundsRef.current.isEmpty()) {
        mapInstance.current.fitBounds(boundsRef.current)
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
  }, [mappableDoctors, hasLocationFilter, searchLat, searchLng, radiusKm])

  const goToPage = (target: number | undefined) => {
    if (!target || target === page) return
    setPage(target)
  }

  // if (isLoading) {
  //   return <Loader message="Loading..." fullScreen />
  // }

  return (
    <>
      <BreadcrumbSearch />
      {error ? (
        <div className="text-center py-5">
          <p className="text-danger">{error}</p>
        </div>
      ) : isLoading ? <Loader message="Loading..." fullScreen /> : (
        <div className="content top-space pet-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="mb-4">
                  <h3 className="main-title">
                    Showing <span className="text-secondary">{(pagination?.total ?? 0) > 0 ? pagination?.from : 0}-
                    {(pagination?.total ?? 0) > 0 ? pagination?.to : 0}</span>
                    {pagination ? ` of ${pagination.total}` : ''} Clinics
                  </h3>
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="d-flex align-items-center justify-content-end mb-4">
                  <div className="dropdown header-dropdown me-2">
                    <a className="dropdown-toggle sort-dropdown" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                      <span>Sort By</span>Name (A - Z)
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a href="#" className="dropdown-item"> Name (A - Z) </a>
                      <a href="#" className="dropdown-item"> Name (Z - A) </a>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="row align-items-end mb-4">
                  <div className="col-md-3">
                    <label className="form-label fw-medium mb-2">Can Prescribe</label>
                    <div className="">
                      <select className="form-select select" value={prescribe} onChange={(e) => setPrescribe(e.target.value)}>
                        {PRESCRIBE_OPTIONS.map((item) => (
                          <option value={item} key={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium mb-1">Search by location</label>
                    <div className="d-flex gap-2 items-center">
                      <div className="position-relative flex-grow-1">
                        <input
                          ref={addressInputRef}
                          type="text"
                          defaultValue={searchAddress}
                          onChange={handleAddressInputChange}
                          placeholder="Enter a city or address"
                          className="form-control h-12 mt-1"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-secondary d-flex align-items-center gap-1"
                        onClick={handleUseMyLocation}
                        disabled={isLocatingUser}
                        title="Use my current location"
                      >
                        <MapPin size={16} />
                        {isLocatingUser ? 'Locating…' : 'Near Me'}
                      </button>
                      {hasLocationFilter && (
                        <button type="button" className="btn btn-link text-secondary" onClick={handleClearLocation}>
                          Clear
                        </button>
                      )}
                    </div>
                    {locationError && <p className="text-danger fs-13 mt-1 mb-0">{locationError}</p>}
                    {/* {searchAddress && searchLat == null && !locationError && (
                      <p className="text-muted fs-13 mt-1 mb-0">Select a suggestion from the list, or tap "Near Me".</p>
                    )} */}
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-medium mb-1">
                      Radius: {radiusKm} km <span className="text-muted">({radiusMiles.toFixed(0)} mi)</span>
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={MIN_RADIUS_KM}
                      max={MAX_RADIUS_KM}
                      step={1}
                      value={radiusKm}
                      onChange={(e) => {
                        setRadiusKm(Number(e.target.value))
                        setPage(1)
                      }}
                      disabled={!hasLocationFilter}
                    />
                    {!hasLocationFilter && (
                      <p className="text-muted fs-13 mt-1 mb-0">Search a location above to filter by radius.</p>
                    )}
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-md-10">
                    <div className="row">
                      {/* <div className="col-sm-4 col-6">
                        <div className="mb-4">
                          <select className="form-select custom-mat-select select" value={clinic} onChange={(e) => setClinic(e.target.value)}>
                            {clinicOptions.map((item) => (
                              <option value={item} key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div> */}
                      {/* <div className="col-sm-4 col-6">
                        <div className="mb-4">
                          <select className="form-select select" value={onboarding} onChange={(e) => setOnboarding(e.target.value)}>
                            {STATUS_OPTIONS.map((item) => (
                              <option value={item} key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="col-md-2">
                    <div className="text-end mb-3">
                      <button
                        type="button"
                        className="fw-medium text-secondary text-decoration-underline btn btn-link p-0"
                        onClick={() => {
                          setClinic(ALL_CLINICS)
                          setPrescribe(PRESCRIBE_OPTIONS[0])
                          setOnboarding(STATUS_OPTIONS[0])
                          setAvailableOnly(false)
                          handleClearLocation()
                          setRadiusKm(MIN_RADIUS_KM)
                        }}
                      >
                        Clear All
                      </button>
                    </div>
                  </div> */}
                </div>

                {/* <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                  <div className="doctor-filter-availability d-flex align-items-center gap-3">
                    <p className="mb-0">Active Only</p>
                    <div className="status-toggle status-tog">
                      <input
                        type="checkbox"
                        id="status_6"
                        className="check"
                        checked={availableOnly}
                        onChange={() => setAvailableOnly((prev) => !prev)}
                      />
                      <label htmlFor="status_6" className="checktoggle">checkbox</label>
                    </div>
                  </div>
                </div> */}

                <div className="row">
                  {doctors?.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <p>No clinics match these filters on this page.</p>
                    </div>
                  ) : (
                    // doctors?.map((tenant) => {
                    //   const websiteLink = tenant.primary_domain ? `https://${tenant.primary_domain.host}` : null
                    //   const badgeClass = tenant.can_prescribe ? 'text-teal' : 'text-indigo'

                    //   return (
                    //     <div className="col-xxl-3 col-md-6" key={tenant.id}>
                    //       <div className="card">
                    //         <div className="card-img card-img-hover">
                    //           <a href={websiteLink || '#'} target="_blank" rel="noreferrer">
                    //             {tenant?.image ? 
                    //             <img className="w-[250px] h-[250px] object-cover" src={tenant.image} alt={tenant.business_name || tenant.name} />
                    //             : <div className="flex w-full h-[250px] justify-center items-center bg-gray-300"><User className="w-24 h-24 " /></div>  }
                    //           </a>
                    //           <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                    //             <span className={`badge ${tenant.is_active ? 'bg-success-light' : 'bg-danger-light'}`}>
                    //               {tenant.is_active ? 'Active' : 'Inactive'}
                    //             </span>
                    //           </div>
                    //         </div>
                    //         <div className="card-body p-0">
                    //           <div className={`d-flex active-bar align-items-center justify-content-between p-3 ${badgeClass}`}>
                    //             <span className={`fw-medium fs-14 ${badgeClass}`}>
                    //               {tenant.can_prescribe ? 'Can Prescribe' : 'General'}
                    //             </span>
                    //             <span className="badge bg-success-light d-inline-flex align-items-center">
                    //               <i className="fa-solid fa-circle fs-5 me-1"></i>
                    //               {tenant.status}
                    //             </span>
                    //           </div>
                    //           <div className="p-3 pt-0">
                    //             <div className="doctor-info-detail mb-3 pb-3">
                    //               <h3 className="mb-1">
                    //                 <a href={websiteLink || '#'} target="_blank" rel="noreferrer">
                    //                   {tenant.business_name || tenant.name}
                    //                 </a>
                    //               </h3>
                    //               <div className="d-flex align-items-center">
                    //                 <p className="d-flex align-items-center mb-0 fs-14">
                    //                   <i className="isax isax-location me-2"></i>
                    //                   {tenant.home_address || 'Address not provided'}
                    //                 </p>
                    //               </div>
                    //             </div>
                    //             <div className="d-flex align-items-center justify-content-between">
                    //               <div>
                    //                 <p className="mb-1">Contact</p>
                    //                 <h3 className="text-orange fs-16">{tenant.primary_phone || tenant.email || 'N/A'}</h3>
                    //               </div>
                    //               {websiteLink && (
                    //                 <a href={websiteLink} target="_blank" rel="noreferrer" className="theme-btn btn-primary p-2 rounded-full">
                    //                   <span className="get-started-content"><i className="isax isax-calendar-1 me-2"></i> Visit Site</span>
                    //                 </a>
                    //               )}
                    //             </div>
                    //           </div>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   )
                    // })
                    doctors?.map((tenant) => {
                      const websiteLink = tenant.primary_domain ? `https://${tenant.primary_domain.host}` : null;

                      return (
                        <div className="col-xxl-4 col-md-6 mb-4" key={tenant.id}>
                          <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm border border-amber-100/60 transition-all duration-300 hover:shadow-md">
                            
                            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-amber-50/70 pointer-events-none" />
                              <PawPrint size={50} className="absolute top-4 right-6 rotate-[300deg] text-[#B46935] fill-[#B46935]" />
                              <Heart size={30} className="absolute top-16 right-2 text-[#B46935] rotate-[340deg]" />

                            <div className="relative z-10 flex items-center gap-8 mb-4">
                              {/* Avatar Section */}
                              <div className="relative flex-shrink-0 border ring-4 ring-[#FFC269] p-1 rounded-full">
                                <a href={websiteLink || '#'} target="_blank" rel="noreferrer" className="block">
                                  {/* {tenant?.image ? ( */}
                                    <img
                                      className="h-28 w-28 rounded-full object-contain"
                                      src={tenant.image ?? "/assets/images/petvet-connect.jpg"}
                                      alt={tenant.business_name || tenant.name}
                                    />
                                  {/* ) : (
                                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                      <User className="h-10 w-10" />
                                    </div>
                                  )} */}
                                </a>
                                {/* Small Prescription Badge Icon */}
                                <span 
                                  className={`absolute bottom-1 -right-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs text-white shadow-sm bg-[#FFC269] p-2`}
                                >
                                  <PawPrint className="rotate-[315deg] text-[#B46935] fill-[#B46935]" />
                                </span>
                              </div>

                              {/* Text Details */}
                              <div className="flex-1 min-w-0">
                                {/* Status Pill */}
                                {/* <div className="flex items-center gap-2 mb-1">
                                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                    tenant.is_active 
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                                      : 'bg-rose-50 text-rose-700 border border-rose-200/60'
                                  }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${tenant.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                    {tenant.is_active ? 'Active' : 'Inactive'}
                                  </span>

                                  {tenant.status && (
                                    <span className="text-xs text-gray-500 font-medium truncate">
                                      • {tenant.status}
                                    </span>
                                  )}
                                </div> */}

                                {/* Doctor/Clinic Title */}
                                <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                                  <a href={websiteLink || '#'} target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors">
                                    {tenant.business_name || tenant.name}
                                  </a>
                                </h3>
                              </div>
                            </div>

                            {/* Feature Tags Row */}
                            <div className={`grid ${tenant?.home_address && tenant?.can_prescribe ? "grid-cols-3" : "grid-cols-2"} gap-2 mb-4 min-h-[80px]`}>
                              {tenant.can_prescribe ? (
                                <div className="flex items-center gap-2 pl-1">
                                  <div className="flex h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                                    <Pill className="h-5 w-5" />
                                  </div>

                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-gray-800">
                                      Can Prescribe
                                    </p>
                                  </div>
                                </div>
                              ) : null}

                              <div className="flex items-center gap-2 rounded-xl pl-6">
                                <div
                                  className={`flex h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full ${
                                    tenant?.is_active
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {tenant?.is_active ? (
                                    <ShieldCheck className="h-7 w-7 fill-green-700 text-white" />
                                  ) : (
                                    <ShieldAlert className="h-7 w-7 fill-red-700 text-white" />
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-gray-800">
                                    {tenant.is_active ? "Active" : "Inactive"}
                                  </p>
                                </div>
                              </div>

                              {tenant?.home_address && (
                                <div className="flex items-center gap-2 w-full rounded-xl pl-1">
                                  <div className="flex h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                    <MapPin className="h-5 w-5 fill-indigo-700 text-white" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 leading-5 break-words whitespace-normal">
                                      {tenant.home_address}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Action Button */}
                            <a
                              href={websiteLink ?? ""}
                              target="_blank"
                              rel="noreferrer"
                              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-md font-semibold text-gray-600 transition-all duration-200 shadow-sm"
                              style={{ border: "2px solid #FFC269" }}
                            >
                              <span>Visit Website</span>
                              <ArrowRight className="w-5 h-5" />
                            </a>

                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {pagination && pagination.pages.length > 1 && (
                  <div className="col-md-12">
                    <div className="pagination dashboard-pagination mt-md-3 mt-0 mb-4">
                      <ul>
                        <li>
                            <a
                            href="#"
                            className={`page-link prev ${!pagination.previous ? 'disabled' : ''}`}
                            onClick={(e) => { e.preventDefault(); goToPage(pagination.previous || undefined) }}
                          >
                            Prev
                          </a>
                        </li>
                        {pagination.pages.map((p) => (
                          <li key={p}>
                            <a
                              href="#"
                              className={`page-link ${p === pagination.current ? 'active' : ''}`}
                              onClick={(e) => { e.preventDefault(); goToPage(p) }}
                            >
                              {p}
                            </a>
                          </li>
                        ))}
                        <li>
                          <a
                            href="#"
                            className={`page-link next ${!pagination.next ? 'disabled' : ''}`}
                            onClick={(e) => { e.preventDefault(); goToPage(pagination.next || undefined) }}
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}