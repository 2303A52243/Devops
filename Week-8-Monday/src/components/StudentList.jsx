import React from 'react';
import StudentCard from './StudentCard';

/**
 * StudentList Component
 *
 * Responsibilities:
 * - Receives the list of filtered students from App.jsx via props.
 * - Iterates over the students array using JavaScript's `.map()` method.
 * - Renders a <StudentCard /> for each individual student, passing their data and action handler.
 * - Displays a friendly "No students found" message if the search filter produces an empty list.
 *
 * Viva Concepts:
 * - "Rendering Lists with .map()": Transforms the array of student objects into JSX elements.
 * - "The 'key' Prop": Essential for React's Virtual DOM to uniquely identify elements across re-renders (`key={student.id}`).
 * - "Conditional Rendering": Renders either the grid of cards or an empty state alert.
 */
function StudentList({ students = [], onMarkAttendance }) {
  // If search query matches zero students, display empty state
  if (!students || students.length === 0) {
    return (
      <div className="empty-state-card" role="status" aria-live="polite">
        <div className="empty-state-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h3 className="empty-state-title">No students found</h3>
        <p className="empty-state-desc">
          No student records matched your current search query. Try checking for typos or searching by roll number.
        </p>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="student-grid" role="region" aria-label="Student Attendance Cards">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onMarkAttendance={onMarkAttendance}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
