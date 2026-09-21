import React from 'react';

/**
 * Header Component
 *
 * Responsibilities:
 * - Displays the primary system title: "Student Attendance Management System"
 * - Displays subtitle: "College Attendance Dashboard"
 * - Displays collegiate insignia badge and current date
 * - Displays Administrator Profile for Sri Sahith (passed via props)
 *
 * Viva Concepts:
 * - "Props Passing": Receives `admin` object from App.jsx.
 * - "Default Props / Fallbacks": Handles undefined or partial prop values gracefully.
 */
function Header({
  admin = {
    name: 'Sri Sahith',
    role: 'Faculty Administrator',
    designation: 'Lab In-Charge & Faculty Coordinator',
    department: 'CSE',
  },
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="header-container" role="banner">
      <div className="header-content">
        {/* College & Project Branding */}
        <div className="header-brand">
          <div className="college-logo-badge" aria-hidden="true">
            {/* Graduation Cap SVG Icon */}
            <svg
              className="college-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <h1 className="header-title">Student Attendance Management System</h1>
            <p className="header-subtitle">College Attendance Dashboard &bull; Academic Portal</p>
          </div>
        </div>

        {/* Admin Profile & Session Metadata */}
        <div className="header-meta">
          {/* Admin Profile Badge */}
          <div className="admin-profile-pill" title={`Logged in as ${admin.name} (${admin.role})`}>
            <div className="admin-avatar">
              {admin.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="admin-info-col">
              <div className="admin-name-row">
                <span className="admin-name">{admin.name}</span>
                <span className="admin-role-badge">ADMIN</span>
              </div>
              <span className="admin-designation">{admin.designation}</span>
            </div>
          </div>

          {/* Session & Date Indicators */}
          <div className="session-badges">
            <span className="live-badge" title="Live session active">
              <span className="pulse-dot"></span> Active Session
            </span>
            <span className="date-badge">{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
