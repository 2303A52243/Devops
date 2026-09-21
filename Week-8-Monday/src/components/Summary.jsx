import React from 'react';

/**
 * Summary Component
 *
 * Responsibilities:
 * - Receives summary statistics from the parent component (App.jsx) via props.
 * - Displays 5 responsive metric cards:
 *   1. Total Students
 *   2. Present Students (marked present in today's roll call)
 *   3. Absent Students (marked absent in today's roll call)
 *   4. Eligible Students (attendance >= 75%)
 *   5. Not Eligible Students (attendance < 75%)
 *
 * Viva Concepts:
 * - "Props": Read-only properties passed down from App.jsx to this child component.
 * - "Props Destructuring": Unpacking values directly in the function arguments:
 *   function Summary({ totalStudents, presentStudents, absentStudents, eligibleStudents, notEligibleStudents })
 * - "Derived State": The metrics are calculated on each render based on the current students state in App.jsx.
 */
function Summary({
  totalStudents = 0,
  presentStudents = 0,
  absentStudents = 0,
  eligibleStudents = 0,
  notEligibleStudents = 0,
}) {
  return (
    <section className="summary-section" aria-label="Attendance Overview Summary">
      <div className="section-header">
        <h2 className="section-title">Attendance Overview</h2>
        <span className="section-hint">Live campus metrics calculated in real-time</span>
      </div>

      <div className="summary-grid">
        {/* Card 1: Total Students */}
        <div className="summary-card card-total">
          <div className="summary-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="summary-card-body">
            <span className="summary-card-label">Total Students</span>
            <div className="summary-card-value">{totalStudents}</div>
            <span className="summary-card-sub">Enrolled in section</span>
          </div>
        </div>

        {/* Card 2: Present Students */}
        <div className="summary-card card-present">
          <div className="summary-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="summary-card-body">
            <span className="summary-card-label">Present</span>
            <div className="summary-card-value">{presentStudents}</div>
            <span className="summary-card-sub">Marked in session</span>
          </div>
        </div>

        {/* Card 3: Absent Students */}
        <div className="summary-card card-absent">
          <div className="summary-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="summary-card-body">
            <span className="summary-card-label">Absent</span>
            <div className="summary-card-value">{absentStudents}</div>
            <span className="summary-card-sub">Pending / excused</span>
          </div>
        </div>

        {/* Card 4: Eligible Students */}
        <div className="summary-card card-eligible">
          <div className="summary-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="summary-card-body">
            <span className="summary-card-label">Eligible</span>
            <div className="summary-card-value">{eligibleStudents}</div>
            <span className="summary-card-sub">&ge; 75% attendance</span>
          </div>
        </div>

        {/* Card 5: Not Eligible Students */}
        <div className="summary-card card-not-eligible">
          <div className="summary-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="summary-card-body">
            <span className="summary-card-label">Not Eligible</span>
            <div className="summary-card-value">{notEligibleStudents}</div>
            <span className="summary-card-sub">&lt; 75% exam criteria</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
