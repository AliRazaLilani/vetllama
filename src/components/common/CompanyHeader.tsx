import { type JSX } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { ClipboardClock } from 'lucide-react';
import { COMPANIES, getCurrentCompany } from '@/lib/utils/helpers';


export default function Header(): JSX.Element {
  const company = getCurrentCompany() ?? COMPANIES[0];

  return (
    <header className='vetllama-header h-[82px]'>
      <div className="vetllama-header-container">
    {/* Logo */}
    <Link to="/" className="vetllama-logo">
      <img src={company.logo} alt={company.name} className={`${company.domain === 'petvetconnect.com' ? 'w-44' : 'w-48'} h-auto object-cover`} />
    </Link>

      {/* Get Started Button */}
      <div className='flex justify-center gap-2 items-center hidden md:block'>
        <Link to="/doctor-grid" className="get-started-btn mr-2">
          <span className="get-started-fill" />

          <span className="get-started-content">
          <ClipboardClock className="w-4 h-4 mr-2" />

        <span>Book an Appointment</span>
          </span>
        </Link>
        <a rel="noreferrer" href={company.signupUrl} className="get-started-btn">
          <span className="get-started-fill" />

          <span className="get-started-content">
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
        d="M15 21V19C15 17.9391 14.5786 16.9217 13.8284 16.1716C13.0783 15.4214 12.0609 15 11 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
          />

          <path
        d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
          />

          <path d="M19 8V14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />

          <path d="M22 11H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>

        <span>Get Started</span>
          </span>
        </a>
      </div>
      </div>
    </header>
  );
}
