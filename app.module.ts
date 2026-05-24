<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Management — NestJS + Drizzle ORM</title>
  <link rel="stylesheet" href="/css/style.css" />
</head>
<body>

<!-- ── Header ────────────────────────────────────────────────────────────── -->
<header class="header">
  <div>
    <h1>🎓 Student Management System</h1>
    <p>NestJS · TypeScript · PostgreSQL · Drizzle ORM</p>
  </div>
</header>

<!-- ── Stats Bar ─────────────────────────────────────────────────────────── -->
<div class="stats-bar">
  <div class="stat-card">
    <div class="value" id="stat-total">—</div>
    <div class="label">Total Students</div>
  </div>
  <div class="stat-card active">
    <div class="value" id="stat-active">—</div>
    <div class="label">Active</div>
  </div>
  <div class="stat-card graduated">
    <div class="value" id="stat-graduated">—</div>
    <div class="label">Graduated</div>
  </div>
  <div class="stat-card inactive">
    <div class="value" id="stat-inactive">—</div>
    <div class="label">Inactive</div>
  </div>
  <div class="stat-card">
    <div class="value" id="stat-gpa">—</div>
    <div class="label">Avg GPA</div>
  </div>
</div>

<!-- ── Main ──────────────────────────────────────────────────────────────── -->
<main class="main">

  <!-- Toolbar -->
  <div class="toolbar">
    <input type="text" id="search" placeholder="Search by name, email, roll number…" />
    <select id="filter-dept">
      <option value="">All Departments</option>
      <option value="computer_science">Computer Science</option>
      <option value="mathematics">Mathematics</option>
      <option value="physics">Physics</option>
      <option value="chemistry">Chemistry</option>
      <option value="biology">Biology</option>
      <option value="english">English</option>
      <option value="history">History</option>
      <option value="economics">Economics</option>
      <option value="other">Other</option>
    </select>
    <select id="filter-status">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="graduated">Graduated</option>
      <option value="suspended">Suspended</option>
    </select>
    <select id="filter-semester">
      <option value="">All Semesters</option>
      <option value="1">Semester 1</option>
      <option value="2">Semester 2</option>
      <option value="3">Semester 3</option>
      <option value="4">Semester 4</option>
      <option value="5">Semester 5</option>
      <option value="6">Semester 6</option>
      <option value="7">Semester 7</option>
      <option value="8">Semester 8</option>
    </select>
    <button class="btn btn-primary" onclick="applyFilters()">🔍 Search</button>
    <button class="btn btn-success" onclick="openAdd()">+ Add Student</button>
  </div>

  <!-- Table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Roll No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Department</th>
          <th>Semester</th>
          <th>GPA</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr><td colspan="8" class="loading">Loading students…</td></tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <span id="pag-info"></span>
      <div class="page-btns" id="page-btns"></div>
    </div>
  </div>

</main>

<!-- ── Modal ──────────────────────────────────────────────────────────────── -->
<div class="overlay" id="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2 id="modal-title">Add Student</h2>
      <button onclick="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="form-grid" id="student-form">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="f-name" placeholder="e.g. Arjun Sharma" required />
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input type="email" id="f-email" placeholder="arjun@example.com" required />
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="text" id="f-phone" placeholder="9876543210" />
        </div>
        <div class="form-group">
          <label>Roll Number *</label>
          <input type="text" id="f-roll" placeholder="CS2024001" required />
        </div>
        <div class="form-group">
          <label>Department *</label>
          <select id="f-dept">
            <option value="computer_science">Computer Science</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="economics">Economics</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Semester *</label>
          <select id="f-semester">
            <option value="1">1</option><option value="2">2</option>
            <option value="3">3</option><option value="4">4</option>
            <option value="5">5</option><option value="6">6</option>
            <option value="7">7</option><option value="8">8</option>
          </select>
        </div>
        <div class="form-group">
          <label>GPA</label>
          <input type="text" id="f-gpa" placeholder="e.g. 8.75" />
        </div>
        <div class="form-group">
          <label>Date of Birth</label>
          <input type="date" id="f-dob" />
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="f-status">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div class="form-group full">
          <label>Address</label>
          <input type="text" id="f-address" placeholder="Street, City, State" />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closeModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveStudent()">💾 Save Student</button>
    </div>
  </div>
</div>

<!-- ── Toast ──────────────────────────────────────────────────────────────── -->
<div id="toast"></div>

<script src="/js/app.js"></script>
</body>
</html>
