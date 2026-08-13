import BreadcrumbSearch from '@/components/common/BreadCrumbSearch'
import { Loader } from '@/components/common/Loader'
import { getCompanyTenants } from '@/lib/api/privateService'
import { User } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState, type JSX } from 'react'

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
const PRESCRIBE_OPTIONS = ['Prescribing', 'Can Prescribe', 'Cannot Prescribe']
const STATUS_OPTIONS = ['Onboarding Status', 'Completed', 'Not Started']

const onboardingLabelToValue: Record<string, string> = {
  'Completed': 'completed',
  'Not Started': 'not_started',
}

function parseCoord(value: string | null): number | null {
  if (!value) return null
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : null
}

export default function MapGrid(): JSX.Element {
  const [clinic, setClinic] = useState(ALL_CLINICS)
  const [prescribe, setPrescribe] = useState(PRESCRIBE_OPTIONS[0])
  const [onboarding, setOnboarding] = useState(STATUS_OPTIONS[0])
  const [availableOnly, setAvailableOnly] = useState(false)

  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)

  const [doctors, setDoctors] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true) // first-load, full screen
  const [isRefetching, setIsRefetching] = useState(false) // page changes
  const [error, setError] = useState<string | null>(null)

  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstance = useRef<any>(null)
  const boundsRef = useRef<any>(null)
  const infowindowRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    let cancelled = false

    const fetchDoctors = async () => {
      try {
        if (page === 1 && doctors.length === 0) {
          setIsLoading(true)
        } else {
          setIsRefetching(true)
        }
        setError(null)

        const data = await getCompanyTenants({ page, per_page: PER_PAGE })

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
          setIsRefetching(false)
        }
      }
    }

    fetchDoctors()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // NOTE: filters below only run against the *current page* of results,
  // since the tenants endpoint only accepts page/per_page right now.
  // If you want filters to apply across the full dataset, the API needs
  // to accept clinic/can_prescribe/onboarding_status as query params too.
  const clinicOptions = useMemo(() => {
    const names = new Set<string>()
    doctors.forEach((t) => {
      const label = t.business_name || t.name
      if (label) names.add(label)
    })
    return [ALL_CLINICS, ...Array.from(names).sort()]
  }, [doctors])

  const filteredDoctors = useMemo(() => {
    return doctors.filter((t) => {
      if (availableOnly && !t.is_active) return false

      if (clinic !== ALL_CLINICS) {
        const label = t.business_name || t.name
        if (label !== clinic) return false
      }

      if (prescribe !== PRESCRIBE_OPTIONS[0]) {
        const wantsPrescribe = prescribe === 'Can Prescribe'
        if (Boolean(t.can_prescribe) !== wantsPrescribe) return false
      }

      if (onboarding !== STATUS_OPTIONS[0]) {
        const targetValue = onboardingLabelToValue[onboarding]
        if (t.onboarding_status !== targetValue) return false
      }

      return true
    })
  }, [doctors, clinic, prescribe, onboarding, availableOnly])

  const mappableDoctors = useMemo(() => {
    return filteredDoctors
      .map((t) => {
        const lat = parseCoord(t.home_latitude)
        const lng = parseCoord(t.home_longitude)
        return lat !== null && lng !== null ? { ...t, lat, lng } : null
      })
      .filter((t): t is Tenant & { lat: number; lng: number } => t !== null)
  }, [filteredDoctors])

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

      const center = mappableDoctors.length
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

      boundsRef.current = new googleAny.maps.LatLngBounds()
      setMarkers(mapInstance.current, mappableDoctors)

      if (!boundsRef.current.isEmpty()) {
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
  }, [mappableDoctors])

  const goToPage = (target: number | undefined) => {
    if (!target || target === page || isRefetching) return
    setPage(target)
  }

  if (isLoading) {
    return <Loader message="Loading..." fullScreen />
  }

  return (
    <>
      <BreadcrumbSearch />
      {error ? (
        <div className="text-center py-5">
          <p className="text-danger">{error}</p>
        </div>
      ) : (
        <div className="content top-space pet-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="mb-4">
                  <h3 className="main-title">
                    Showing <span className="text-secondary">{pagination?.total > 0 ? pagination?.from : 0}-
                    {pagination?.total > 0 ? pagination?.to : 0}</span>
                    {pagination ? ` of ${pagination.total}` : ''} Clinics
                  </h3>
                </div>
              </div>
              <div className="col-md-6">
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
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="row align-items-center mb-4">
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-sm-4 col-6">
                        <div className="mb-4">
                          <select className="form-select custom-mat-select select" value={clinic} onChange={(e) => setClinic(e.target.value)}>
                            {clinicOptions.map((item) => (
                              <option value={item} key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="mb-4">
                          <select className="form-select select" value={prescribe} onChange={(e) => setPrescribe(e.target.value)}>
                            {PRESCRIBE_OPTIONS.map((item) => (
                              <option value={item} key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="mb-4">
                          <select className="form-select select" value={onboarding} onChange={(e) => setOnboarding(e.target.value)}>
                            {STATUS_OPTIONS.map((item) => (
                              <option value={item} key={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="text-end mb-3">
                      <button
                        type="button"
                        className="fw-medium text-secondary text-decoration-underline btn btn-link p-0"
                        onClick={() => {
                          setClinic(ALL_CLINICS)
                          setPrescribe(PRESCRIBE_OPTIONS[0])
                          setOnboarding(STATUS_OPTIONS[0])
                          setAvailableOnly(false)
                        }}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
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
                </div>

                <div className="row" style={{ opacity: isRefetching ? 0.5 : 1, pointerEvents: isRefetching ? 'none' : 'auto' }}>
                  {filteredDoctors.length === 0 ? (
                    <div className="col-12 text-center py-5">
                      <p>No clinics match these filters on this page.</p>
                    </div>
                  ) : (
                    filteredDoctors.map((tenant) => {
                      const websiteLink = tenant.primary_domain ? `https://${tenant.primary_domain.host}` : null
                      const badgeClass = tenant.can_prescribe ? 'text-teal' : 'text-indigo'

                      return (
                        <div className="col-xxl-3 col-md-6" key={tenant.id}>
                          <div className="card">
                            <div className="card-img card-img-hover">
                              <a href={websiteLink || '#'} target="_blank" rel="noreferrer">
                                {tenant?.image ? 
                                <img className="w-[250px] h-[250px] object-cover" src={tenant.image} alt={tenant.business_name || tenant.name} />
                                : <div className="flex w-full h-[250px] justify-center items-center bg-gray-300"><User className="w-24 h-24 " /></div>  }
                              </a>
                              <div className="grid-overlay-item d-flex align-items-center justify-content-between">
                                <span className={`badge ${tenant.is_active ? 'bg-success-light' : 'bg-danger-light'}`}>
                                  {tenant.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>
                            <div className="card-body p-0">
                              <div className={`d-flex active-bar align-items-center justify-content-between p-3 ${badgeClass}`}>
                                <span className={`fw-medium fs-14 ${badgeClass}`}>
                                  {tenant.can_prescribe ? 'Can Prescribe' : 'General'}
                                </span>
                                <span className="badge bg-success-light d-inline-flex align-items-center">
                                  <i className="fa-solid fa-circle fs-5 me-1"></i>
                                  {tenant.status}
                                </span>
                              </div>
                              <div className="p-3 pt-0">
                                <div className="doctor-info-detail mb-3 pb-3">
                                  <h3 className="mb-1">
                                    <a href={websiteLink || '#'} target="_blank" rel="noreferrer">
                                      {tenant.business_name || tenant.name}
                                    </a>
                                  </h3>
                                  <div className="d-flex align-items-center">
                                    <p className="d-flex align-items-center mb-0 fs-14">
                                      <i className="isax isax-location me-2"></i>
                                      {tenant.home_address || 'Address not provided'}
                                    </p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>
                                    <p className="mb-1">Contact</p>
                                    <h3 className="text-orange fs-16">{tenant.primary_phone || tenant.email || 'N/A'}</h3>
                                  </div>
                                  {websiteLink && (
                                    <a href={websiteLink} target="_blank" rel="noreferrer" className="theme-btn btn-primary p-2 rounded-full">
                                      <span className="get-started-content"><i className="isax isax-calendar-1 me-2"></i> Visit Site</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
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