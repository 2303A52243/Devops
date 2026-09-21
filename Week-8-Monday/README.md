# College Student Attendance Management System

A clean, modern, fully functional React.js web application built for a college lab assignment. Designed with functional components, dynamic state management via `useState`, unidirectional data flow through `props`, responsive vanilla CSS, and an Administrator Portal featuring **Sri Sahith** as the Faculty Administrator & Lab In-Charge.

---

## 🌟 Features Overview

1. **Administrator Portal (Sri Sahith)**:
   - Dedicated Faculty Administrator profile in Header and Dashboard with verified badges.
   - **+ Add Student**: Enroll new students into the live attendance roster with custom roll number, branch, and initial stats.
   - **Mark All Present**: Fast-track roll call tool to mark all students present for today's session.
   - **Print Report**: Generates a clean, print-optimized attendance report.

2. **Live Attendance State Management (`useState`)**:
   - Stores attendance data dynamically in React state.
   - Clicking **Present**: Increases total classes by 1, increases present classes by 1, and recalculates attendance percentage.
   - Clicking **Absent**: Increases total classes by 1, increases absent classes by 1, and recalculates attendance percentage.
   - Uses **immutable state updates** (no page reloads, instantaneous Virtual DOM updates).

3. **Automatic Eligibility Calculation & Alerts**:
   - Criteria: $\ge 75\%$ is **Eligible**; $< 75\%$ is **Not Eligible**.
   - Conditional rendering dynamically adjusts status badges and color gradients.
   - Cards of low-attendance students are highlighted with visual warning alerts.

4. **Dynamic Attendance Overview Summary**:
   - 5 responsive summary metric cards computed on every state change:
     1. **Total Students**
     2. **Present** (marked in today's roll call)
     3. **Absent**
     4. **Eligible** ($\ge 75\%$)
     5. **Not Eligible** ($< 75\%$)

5. **Live Search Filtering**:
   - Instant search by **Student Name**, **Roll Number**, or **Branch**.
   - Displays a friendly **"No students found"** empty state if no records match.

6. **Reset Attendance**:
   - Restores all student attendance records to initial default values.
   - Includes user confirmation dialog (`window.confirm`) to prevent accidental resets.

7. **Responsive & Accessible UI**:
   - Tailored academic color palette with glassmorphism effects and subtle elevation shadows.
   - Smooth animated progress bars.
   - Fully responsive on Desktop, Tablet, and Mobile devices.
   - Accessible ARIA labels, semantic HTML, and keyboard navigation.

---

## 📁 Project Folder Structure

```
STUDENT_ATTENDANCE/
├── index.html                  # HTML entry point with Google Fonts & SEO tags
├── package.json                # Project scripts and React dependencies
├── vite.config.js              # Vite configuration
├── src/
│   ├── components/
│   │   ├── Header.jsx          # College branding & Admin Sri Sahith profile
│   │   ├── Summary.jsx         # 5 Dynamic Overview Cards via props
│   │   ├── StudentList.jsx     # Maps over students array & empty state
│   │   ├── StudentCard.jsx     # Displays student details, progress bar & badges
│   │   └── Attendance.jsx      # Present & Absent action buttons
│   ├── data/
│   │   └── studentsData.js     # Initial dataset with realistic student records
│   ├── App.jsx                 # Root component holding state and admin handlers
│   ├── App.css                 # Comprehensive modern CSS styling
│   ├── index.css               # Global reset & CSS design tokens
│   └── main.jsx                # React root mount file
└── README.md                   # Lab documentation & Viva guide
```

---

## 🚀 How to Run the Project Locally

### 1. Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local URL (e.g. `http://localhost:5173/` or `http://localhost:5175/`).

### 3. Build for Production
```bash
npm run build
```

---

## 🎓 College Viva Preparation Guide

### 1. What is React.js?
React is a popular open-source JavaScript library developed by Meta for building dynamic, interactive user interfaces using reusable **components** and a **Virtual DOM** that updates efficiently without reloading the page.

### 2. What are Functional Components?
In modern React, functional components are JavaScript functions that return JSX (JavaScript XML). They represent UI elements and can manage state and side-effects using React Hooks like `useState`.

### 3. What are Props?
**Props** (short for *properties*) are read-only inputs passed from a parent component to a child component. In this project:
- `App.jsx` passes the `students` array to `StudentList.jsx`.
- `StudentList.jsx` passes individual `student` objects to `StudentCard.jsx`.
- `StudentCard.jsx` passes attendance data and click callbacks to `Attendance.jsx`.
- `App.jsx` passes calculated metric counts to `Summary.jsx`.

### 4. What is State and why use `useState()`?
State represents data that can change over time based on user interactions. When state changes, React automatically re-renders the component and updates the DOM. `useState()` is a React Hook that declares a state variable and a setter function:
```jsx
const [students, setStudents] = useState(initialStudents);
```

### 5. What is Unidirectional Data Flow?
Data flows in one direction:
- **Downwards**: From parent to child via `props`.
- **Upwards**: Child communicates actions to the parent via **callback functions** (e.g., `onMarkAttendance(studentId, status)`).

### 6. How is Attendance Percentage Calculated?
```javascript
percentage = Math.round((presentClasses / totalClasses) * 100);
```
- When **Present** is clicked: `totalClasses` increases by 1, `presentClasses` increases by 1, and the percentage is recalculated.
- When **Absent** is clicked: `totalClasses` increases by 1, `absentClasses` increases by 1, and the percentage is recalculated.

### 7. How does Conditional Rendering work?
Conditional rendering renders different UI elements based on conditions:
```jsx
{isEligible ? (
  <span className="badge-eligible">Eligible</span>
) : (
  <span className="badge-not-eligible">Not Eligible</span>
)}
```
Also, low attendance cards apply the class:
```jsx
className={`student-card ${isEligible ? 'card-status-eligible' : 'card-status-low is-low-attendance'}`}
```

### 8. How does Search Filtering work?
Array filtering uses `.filter()` to check if the student's name, roll number, or branch includes the user's search query in a case-insensitive manner:
```jsx
const filteredStudents = students.filter(student =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
);
```
If `filteredStudents.length === 0`, `StudentList.jsx` conditionally renders the "No students found" message.
