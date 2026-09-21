import React, { useState } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import StudentList from './components/StudentList';
import { initialStudents } from './data/studentsData';
import './App.css';

/**
 * App Component - Root Component
 *
 * Administrator: Sri Sahith (Faculty Coordinator & Lab In-Charge)
 *
 * Responsibilities:
 * - Owns and manages the primary state of the application using `useState`.
 * - Manages `students`, `searchTerm`, `adminUser`, and Add-Student modal state.
 * - Computes dynamic summary metrics on every render.
 * - Handles attendance marking with immutable state updates.
 * - Provides Admin Sri Sahith with administrative privileges:
 *     - Add new student to the roster
 *     - Mark all students present (bulk action)
 *     - Reset attendance records
 *     - Export / Print report
 * - Passes data down to child components via props.
 */
function App() {
  // 1. STATE: Administrator Profile for Sri Sahith
  const [adminUser] = useState({
    name: 'Sri Sahith',
    role: 'Faculty Administrator',
    designation: 'Lab In-Charge & Academic Coordinator',
    department: 'Computer Science & Engineering',
    id: 'ADMIN-SS-2024',
  });

  // 2. STATE: Student records
  const [students, setStudents] = useState(() =>
    initialStudents.map((student) => ({ ...student }))
  );

  // 3. STATE: Search query string
  const [searchTerm, setSearchTerm] = useState('');

  // 4. STATE: Feedback toast message
  const [toast, setToast] = useState(null);

  // 5. STATE: Add Student Modal open/close
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 6. STATE: New Student Form Inputs
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    rollNumber: '',
    branch: 'Computer Science & Engineering',
    totalClasses: 50,
    presentClasses: 42,
  });

  /**
   * Helper to display a temporary notification toast
   */
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  /**
   * Handler to update an individual student's attendance dynamically
   *
   * Logic:
   * - Present: totalClasses + 1, presentClasses + 1, recalculate percentage
   * - Absent: totalClasses + 1, absentClasses + 1, recalculate percentage
   * - Formula: Math.round((presentClasses / totalClasses) * 100)
   */
  const handleMarkAttendance = (studentId, status) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) => {
        if (student.id !== studentId) {
          return student;
        }

        const isPresent = status === 'present';
        const newTotal = student.totalClasses + 1;
        const newPresent = isPresent ? student.presentClasses + 1 : student.presentClasses;
        const newAbsent = !isPresent ? student.absentClasses + 1 : student.absentClasses;
        const newPercentage = Math.round((newPresent / newTotal) * 100);

        return {
          ...student,
          totalClasses: newTotal,
          presentClasses: newPresent,
          absentClasses: newAbsent,
          attendancePercentage: newPercentage,
          todayStatus: isPresent ? 'Present' : 'Absent',
        };
      });
    });

    const targetStudent = students.find((s) => s.id === studentId);
    const studentName = targetStudent ? targetStudent.name : 'Student';
    showToast(`${studentName} marked as ${status.toUpperCase()}`);
  };

  /**
   * Admin Privilege: Mark all students present for today's lecture
   */
  const handleMarkAllPresent = () => {
    const isConfirmed = window.confirm(
      'Admin Sri Sahith: Do you want to mark all students as PRESENT for today\'s session?'
    );

    if (isConfirmed) {
      setStudents((prev) =>
        prev.map((student) => {
          const newTotal = student.totalClasses + 1;
          const newPresent = student.presentClasses + 1;
          return {
            ...student,
            totalClasses: newTotal,
            presentClasses: newPresent,
            attendancePercentage: Math.round((newPresent / newTotal) * 100),
            todayStatus: 'Present',
          };
        })
      );
      showToast('Admin Sri Sahith: All students marked PRESENT for today.');
    }
  };

  /**
   * Admin Privilege: Reset Attendance to original initial data
   */
  const handleResetAttendance = () => {
    const isConfirmed = window.confirm(
      'Admin Sri Sahith: Are you sure you want to reset attendance for all students back to default records?'
    );

    if (isConfirmed) {
      setStudents(initialStudents.map((student) => ({ ...student })));
      setSearchTerm('');
      showToast('All attendance records restored to default.');
    }
  };

  /**
   * Admin Privilege: Add a new student to the live roster
   */
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();

    if (!newStudentForm.name.trim() || !newStudentForm.rollNumber.trim()) {
      alert('Please provide both student name and roll number.');
      return;
    }

    const total = parseInt(newStudentForm.totalClasses, 10) || 50;
    const present = Math.min(total, parseInt(newStudentForm.presentClasses, 10) || 0);
    const absent = Math.max(0, total - present);
    const percentage = Math.round((present / total) * 100);

    const createdStudent = {
      id: Date.now(), // Unique ID generated from timestamp
      name: newStudentForm.name.trim(),
      rollNumber: newStudentForm.rollNumber.trim().toUpperCase(),
      branch: newStudentForm.branch,
      totalClasses: total,
      presentClasses: present,
      absentClasses: absent,
      attendancePercentage: percentage,
      todayStatus: percentage >= 75 ? 'Present' : 'Absent',
    };

    setStudents((prev) => [createdStudent, ...prev]);
    setIsAddModalOpen(false);
    setNewStudentForm({
      name: '',
      rollNumber: '',
      branch: 'Computer Science & Engineering',
      totalClasses: 50,
      presentClasses: 42,
    });
    showToast(`Admin Sri Sahith: Added ${createdStudent.name} (${createdStudent.rollNumber}) to roster.`);
  };

  /**
   * Export / Print printable report
   */
  const handlePrintReport = () => {
    window.print();
  };

  // 7. DERIVED STATE: Filter students by Search Term (Name, Roll, Branch)
  const normalizedQuery = searchTerm.toLowerCase().trim();
  const filteredStudents = students.filter((student) => {
    if (!normalizedQuery) return true;
    const nameMatch = student.name.toLowerCase().includes(normalizedQuery);
    const rollMatch = student.rollNumber.toLowerCase().includes(normalizedQuery);
    const branchMatch = student.branch.toLowerCase().includes(normalizedQuery);
    return nameMatch || rollMatch || branchMatch;
  });

  // 8. DERIVED STATE: Dynamic summary counts
  const totalStudents = students.length;
  const presentStudents = students.filter((s) => s.todayStatus === 'Present').length;
  const absentStudents = students.filter((s) => s.todayStatus === 'Absent').length;
  const eligibleStudents = students.filter((s) => s.attendancePercentage >= 75).length;
  const notEligibleStudents = students.filter((s) => s.attendancePercentage < 75).length;

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast && (
        <div className="toast-notification" role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Header Component with Admin Sri Sahith props */}
      <Header admin={adminUser} />

      {/* Main Dashboard Workspace */}
      <main className="main-content">
        {/* Administrator Welcome Banner & Quick Action Toolbar */}
        <section className="admin-banner-card" aria-label="Administrator Controls">
          <div className="admin-banner-left">
            <div className="admin-shield-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <div className="admin-badge-row">
                <span className="admin-tag">ADMINISTRATOR PORTAL</span>
                <span className="admin-access-tag">FULL ACCESS</span>
              </div>
              <h2 className="admin-welcome-title">
                Welcome back, {adminUser.name}
              </h2>
              <p className="admin-welcome-desc">
                Authorized administrator for {adminUser.department} &bull; ID: {adminUser.id}
              </p>
            </div>
          </div>

          <div className="admin-actions-bar">
            {/* Action 1: Add Student */}
            <button
              type="button"
              className="btn-admin-action btn-add-student"
              onClick={() => setIsAddModalOpen(true)}
              title="Add a new student record to the section"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="action-svg">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>+ Add Student</span>
            </button>

            {/* Action 2: Mark All Present */}
            <button
              type="button"
              className="btn-admin-action btn-mark-all"
              onClick={handleMarkAllPresent}
              title="Mark all students as Present for today's session"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="action-svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>Mark All Present</span>
            </button>

            {/* Action 3: Print / Export */}
            <button
              type="button"
              className="btn-admin-action btn-print-report"
              onClick={handlePrintReport}
              title="Print or export current attendance summary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="action-svg">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print Report</span>
            </button>
          </div>
        </section>

        {/* Attendance Overview Summary Component */}
        <Summary
          totalStudents={totalStudents}
          presentStudents={presentStudents}
          absentStudents={absentStudents}
          eligibleStudents={eligibleStudents}
          notEligibleStudents={notEligibleStudents}
        />

        {/* Dashboard Controls: Search & Reset */}
        <section className="controls-section" aria-label="Search and Action Controls">
          <div className="controls-wrapper">
            {/* Search Input */}
            <div className="search-bar-container">
              <label htmlFor="student-search-input" className="visually-hidden">
                Search students by name, roll number, or branch
              </label>
              <div className="search-input-wrapper">
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  id="student-search-input"
                  type="search"
                  className="search-input"
                  placeholder="Search students by name, roll number, or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search input"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Reset Attendance Button */}
            <button
              type="button"
              className="btn-reset-attendance"
              onClick={handleResetAttendance}
              title="Reset all attendance changes to initial dataset"
            >
              <svg
                className="btn-reset-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              <span>Reset Attendance</span>
            </button>
          </div>

          {/* Quick Filter Info Bar */}
          <div className="search-status-bar">
            <span className="results-count">
              Showing <strong>{filteredStudents.length}</strong> of {totalStudents} students
            </span>
            {searchTerm && (
              <span className="search-tag">
                Filtering by: &ldquo;{searchTerm}&rdquo;
              </span>
            )}
          </div>
        </section>

        {/* Student Cards Section */}
        <section className="students-section" aria-label="Student Attendance Cards">
          <StudentList
            students={filteredStudents}
            onMarkAttendance={handleMarkAttendance}
          />
        </section>
      </main>

      {/* Admin Modal: Add New Student */}
      {isAddModalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <span className="modal-tag">ADMIN ACCESS &bull; SRI SAHITH</span>
                <h3 id="modal-title" className="modal-title">Enroll New Student</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="student-name-field" className="form-label">
                  Student Full Name <span className="required-star">*</span>
                </label>
                <input
                  id="student-name-field"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Manisha Rao"
                  value={newStudentForm.name}
                  onChange={(e) =>
                    setNewStudentForm({ ...newStudentForm, name: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="student-roll-field" className="form-label">
                    Roll Number <span className="required-star">*</span>
                  </label>
                  <input
                    id="student-roll-field"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. 23CS011"
                    value={newStudentForm.rollNumber}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, rollNumber: e.target.value })
                    }
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="student-branch-field" className="form-label">
                    Branch / Department
                  </label>
                  <select
                    id="student-branch-field"
                    className="form-input"
                    value={newStudentForm.branch}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, branch: e.target.value })
                    }
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="Electronics & Communication">ECE</option>
                    <option value="Mechanical Engineering">MECH</option>
                    <option value="Electrical & Electronics">EEE</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="student-total-field" className="form-label">
                    Total Classes Conducted
                  </label>
                  <input
                    id="student-total-field"
                    type="number"
                    min="1"
                    className="form-input"
                    value={newStudentForm.totalClasses}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, totalClasses: e.target.value })
                    }
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="student-present-field" className="form-label">
                    Present Classes
                  </label>
                  <input
                    id="student-present-field"
                    type="number"
                    min="0"
                    max={newStudentForm.totalClasses}
                    className="form-input"
                    value={newStudentForm.presentClasses}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, presentClasses: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-modal-submit">
                  + Add to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* College Lab Assignment Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            <strong>College Student Attendance Management System</strong> &bull; React.js Lab Project
          </p>
          <p className="footer-subtext">
            Admin: <strong>{adminUser.name}</strong> &bull; {adminUser.designation} &bull; {adminUser.department}
          </p>
          <p className="footer-viva-text">
            Built with React Functional Components, Props, useState Hook &amp; Dynamic Conditional Rendering
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
