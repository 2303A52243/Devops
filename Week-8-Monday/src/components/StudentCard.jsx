import React from 'react';
import Attendance from './Attendance';

/**
 * StudentCard Component
 *
 * Responsibilities:
 * - Receives individual student details and attendance callback via props.
 * - Displays:
 *   - Student Name
 *   - Roll Number
 *   - Branch
 *   - Attendance Percentage with smooth animated Progress Bar
 *   - Classes attended count (e.g. 41 / 50 classes)
 *   - Eligibility status ("Eligible" if >= 75%, "Not Eligible" if < 75%)
 * - Highlights card with warning accents if attendance falls below 75%.
 * - Renders child <Attendance /> component to handle user interaction.
 *
 * Viva Concepts:
 * - "Props Passing": Receives `student` and `onMarkAttendance` from `StudentList.jsx`.
 * - "Conditional Rendering":
 *   - Renders "Eligible" (green badge) if percentage >= 75.
 *   - Renders "Not Eligible" (red/amber badge) if percentage < 75.
 *   - Conditionally applies the CSS class `is-low-attendance` to highlight the card.
 * - "Dynamic Inline Styles": The progress bar width is set dynamically using style={{ width: `${clampedPercentage}%` }}.
 */
function StudentCard({ student, onMarkAttendance }) {
  if (!student) return null;

  const {
    id,
    name,
    rollNumber,
    branch,
    attendancePercentage = 0,
    presentClasses = 0,
    totalClasses = 0,
    todayStatus,
  } = student;

  // Criteria: 75% or higher is Eligible for exams
  const isEligible = attendancePercentage >= 75;

  // Clamp percentage between 0 and 100 for safe progress bar rendering
  const clampedPercentage = Math.min(100, Math.max(0, attendancePercentage));

  // Determine avatar initials from student name
  const initials = name
    ? name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <article
      className={`student-card ${isEligible ? 'card-status-eligible' : 'card-status-low is-low-attendance'}`}
      aria-labelledby={`student-name-${id}`}
    >
      {/* Low Attendance Notice Banner (Conditional Rendering) */}
      {!isEligible && (
        <div className="low-attendance-alert" role="alert">
          <svg
            className="alert-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>Attendance below 75% requirement</span>
        </div>
      )}

      {/* Card Header: Avatar, Name, Roll No, Branch */}
      <div className="student-card-header">
        <div className={`student-avatar ${isEligible ? 'avatar-eligible' : 'avatar-warning'}`}>
          {initials}
        </div>
        <div className="student-info">
          <h3 id={`student-name-${id}`} className="student-name">
            {name}
          </h3>
          <div className="student-meta-row">
            <span className="roll-badge" title="Roll Number">
              {rollNumber}
            </span>
            <span className="branch-tag" title="Branch">
              {branch}
            </span>
          </div>
        </div>
      </div>

      {/* Attendance Stats & Progress Bar */}
      <div className="attendance-metric-block">
        <div className="metric-row">
          <span className="metric-label">Attendance Rate</span>
          <div className="metric-value-wrap">
            <span className={`attendance-percentage ${isEligible ? 'text-eligible' : 'text-danger'}`}>
              {attendancePercentage}%
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Attendance progress for ${name}`}
        >
          <div
            className={`progress-fill ${isEligible ? 'fill-eligible' : 'fill-danger'}`}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>

        <div className="classes-counter-row">
          <span className="classes-count">
            Attended: <strong>{presentClasses}</strong> / {totalClasses} classes
          </span>
          <span className="classes-ratio">
            {totalClasses > 0 ? `${Math.round((presentClasses / totalClasses) * 100)}% actual` : '0%'}
          </span>
        </div>
      </div>

      {/* Eligibility Status Tag (Conditional Rendering) */}
      <div className="status-row">
        <span className="status-label">Exam Eligibility:</span>
        {isEligible ? (
          <span className="status-badge badge-eligible">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="badge-icon">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Eligible
          </span>
        ) : (
          <span className="status-badge badge-not-eligible">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="badge-icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Not Eligible
          </span>
        )}
      </div>

      {/* Card Footer: Child Attendance Component */}
      <div className="student-card-footer">
        <span className="action-prompt">Mark Today's Session:</span>
        <Attendance
          studentId={id}
          studentName={name}
          todayStatus={todayStatus}
          onMarkAttendance={onMarkAttendance}
        />
      </div>
    </article>
  );
}

export default StudentCard;
