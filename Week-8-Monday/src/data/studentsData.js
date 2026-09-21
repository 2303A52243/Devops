/**
 * Sample Initial Student Data
 * Contains realistic student records for college attendance tracking.
 * Each student has an ID, full name, roll number, branch,
 * total classes conducted, present classes, absent classes,
 * today's attendance status, and calculated percentage.
 */
export const initialStudents = [
  {
    id: 1,
    name: "Rahul Kumar",
    rollNumber: "23CS001",
    branch: "Computer Science & Engineering",
    totalClasses: 50,
    presentClasses: 41,
    absentClasses: 9,
    attendancePercentage: 82, // (41 / 50) * 100 = 82%
    todayStatus: "Present"
  },
  {
    id: 2,
    name: "Priya Sharma",
    rollNumber: "23CS002",
    branch: "Computer Science & Engineering",
    totalClasses: 55,
    presentClasses: 50,
    absentClasses: 5,
    attendancePercentage: 91, // (50 / 55) * 100 = 90.9% -> 91%
    todayStatus: "Present"
  },
  {
    id: 3,
    name: "Arjun Reddy",
    rollNumber: "23CS003",
    branch: "Computer Science & Engineering",
    totalClasses: 50,
    presentClasses: 34,
    absentClasses: 16,
    attendancePercentage: 68, // (34 / 50) * 100 = 68% (< 75% -> Not Eligible)
    todayStatus: "Absent"
  },
  {
    id: 4,
    name: "Sneha Patel",
    rollNumber: "23CS004",
    branch: "Information Technology",
    totalClasses: 50,
    presentClasses: 38,
    absentClasses: 12,
    attendancePercentage: 76, // (38 / 50) * 100 = 76%
    todayStatus: "Present"
  },
  {
    id: 5,
    name: "Kiran Kumar",
    rollNumber: "23CS005",
    branch: "Electronics & Communication",
    totalClasses: 50,
    presentClasses: 32,
    absentClasses: 18,
    attendancePercentage: 64, // (32 / 50) * 100 = 64% (< 75% -> Not Eligible)
    todayStatus: "Absent"
  },
  {
    id: 6,
    name: "Ananya Singh",
    rollNumber: "23CS006",
    branch: "Computer Science & Engineering",
    totalClasses: 50,
    presentClasses: 44,
    absentClasses: 6,
    attendancePercentage: 88, // (44 / 50) * 100 = 88%
    todayStatus: "Present"
  },
  {
    id: 7,
    name: "Rohit Verma",
    rollNumber: "23CS007",
    branch: "Mechanical Engineering",
    totalClasses: 48,
    presentClasses: 35,
    absentClasses: 13,
    attendancePercentage: 73, // (35 / 48) * 100 = 72.9% -> 73% (< 75% -> Not Eligible)
    todayStatus: "Present"
  },
  {
    id: 8,
    name: "Divya Reddy",
    rollNumber: "23CS008",
    branch: "Computer Science & Engineering",
    totalClasses: 40,
    presentClasses: 38,
    absentClasses: 2,
    attendancePercentage: 95, // (38 / 40) * 100 = 95%
    todayStatus: "Present"
  }
];
