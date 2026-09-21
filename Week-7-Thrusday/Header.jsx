function Header() {
  return (
    <header className="header">

      <div className="logo-section">
        <div className="logo">🎓</div>

        <div>
          <h1>SR UNIVERSITY</h1>
          <p>Student Management System</p>
        </div>
      </div>

      <nav>
        <a href="#dashboard">Dashboard</a>
        <a href="#subjects">Subjects</a>
        <a href="#exams">Examinations</a>
      </nav>

    </header>
  );
}

export default Header;