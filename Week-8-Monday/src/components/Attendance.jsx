import React from 'react';

/**
 * Attendance Component
 *
 * Responsibilities:
 * - Renders the "Present" and "Absent" action buttons.
 * - Receives student attendance details and callbacks through props.
 * - Notifies the parent component when an action is clicked.
 *
 * Props Received:
 * - studentId: number/string (unique ID of the student)
 * - studentName: string (for accessible screen-reader labels)
 * - todayStatus: string ('Present' | 'Absent' | undefined)
 * - onMarkAttendance: function (callback to notify parent of state update)
 *
 * Viva Concepts:
 * - "Lifting State Up": The Attendance component itself does not store persistent attendance data;
 *   instead, it informs the parent (`App.jsx`) which owns the state by calling `onMarkAttendance(studentId, status)`.
 * - "Event Handling": onClick triggers synthetic React events cleanly.
 */
function Attendance({
  studentId,
  studentName = 'Student',
  todayStatus,
  onMarkAttendance,
}) {
  const handlePresentClick = () => {
    if (typeof onMarkAttendance === 'function') {
      onMarkAttendance(studentId, 'present');
    }
  };

  const handleAbsentClick = () => {
    if (typeof onMarkAttendance === 'function') {
      onMarkAttendance(studentId, 'absent');
    }
  };

  return (
    <div className="attendance-actions" role="group" aria-label={`Attendance options for ${studentName}`}>
      {/* Present Button */}
      <button
        type="button"
        className={`btn-attendance btn-present ${todayStatus === 'Present' ? 'is-active' : ''}`}
        onClick={handlePresentClick}
        aria-label={`Mark ${studentName} as Present`}
        title={`Mark ${studentName} as Present (+1 class attended)`}
      >
        <svg
          className="btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>Present</span>
      </button>

      {/* Absent Button */}
      <button
        type="button"
        className={`btn-attendance btn-absent ${todayStatus === 'Absent' ? 'is-active' : ''}`}
        onClick={handleAbsentClick}
        aria-label={`Mark ${studentName} as Absent`}
        title={`Mark ${studentName} as Absent (+1 class missed)`}
      >
        <svg
          className="btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span>Absent</span>
      </button>
    </div>
  );
}

export default Attendance;
