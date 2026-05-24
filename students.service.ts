// ── Config ────────────────────────────────────────────────────────────────────
const API = '/api/students';

// ── State ─────────────────────────────────────────────────────────────────────
let state = {
  students:   [],
  pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
  query:      {},
  editingId:  null,
};

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $  = id  => document.getElementById(id);
const el = sel => document.querySelector(sel);

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const t = $('toast');
  t.textContent = msg;
  t.className   = `show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className = ''; }, 3200);
}

// ── API calls ─────────────────────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const res  = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

// ── Stats ─────────────────────────────────────────────────────────────────────
async function loadStats() {
  try {
    const s = await apiFetch(`${API}/stats`);
    $('stat-total').textContent     = s.total;
    $('stat-active').textContent    = s.active;
    $('stat-graduated').textContent = s.graduated;
    $('stat-inactive').textContent  = s.inactive;
    $('stat-gpa').textContent       = s.averageGpa ?? '—';
  } catch (e) { console.warn('Stats error:', e.message); }
}

// ── Load students ─────────────────────────────────────────────────────────────
async function loadStudents(page = 1) {
  $('tbody').innerHTML = '<tr><td colspan="8" class="loading">Loading…</td></tr>';

  const params = new URLSearchParams({
    page,
    limit: state.pagination.limit,
    ...state.query,
  });

  try {
    const { data, pagination } = await apiFetch(`${API}?${params}`);
    state.students   = data;
    state.pagination = pagination;
    renderTable();
    renderPagination();
  } catch (e) {
    $('tbody').innerHTML = `<tr><td colspan="8" class="loading" style="color:red">Error: ${e.message}</td></tr>`;
  }
}

// ── Render Table ──────────────────────────────────────────────────────────────
function renderTable() {
  if (!state.students.length) {
    $('tbody').innerHTML = '<tr><td colspan="8" class="loading">No students found.</td></tr>';
    return;
  }

  $('tbody').innerHTML = state.students.map(s => `
    <tr>
      <td><strong>${escHtml(s.rollNumber)}</strong></td>
      <td>${escHtml(s.name)}</td>
      <td>${escHtml(s.email)}</td>
      <td><span class="badge badge-${s.status}">${s.status}</span></td>
      <td>${escHtml(s.department.replace('_', ' '))}</td>
      <td>${s.semester}</td>
      <td>${s.gpa ?? '—'}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="openEdit(${s.id})">Edit</button>
        <button class="btn btn-danger  btn-sm" onclick="deleteStudent(${s.id}, '${escHtml(s.name)}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

// ── Render Pagination ─────────────────────────────────────────────────────────
function renderPagination() {
  const { total, page, limit, totalPages } = state.pagination;
  const start = (page - 1) * limit + 1;
  const end   = Math.min(page * limit, total);
  $('pag-info').textContent = total ? `Showing ${start}–${end} of ${total} students` : 'No results';

  const btns = $('page-btns');
  btns.innerHTML = '';
  const addBtn = (label, pg, disabled = false, active = false) => {
    const b = document.createElement('button');
    b.textContent  = label;
    b.disabled     = disabled;
    if (active) b.className = 'active';
    b.onclick = () => loadStudents(pg);
    btns.appendChild(b);
  };

  addBtn('‹ Prev', page - 1, page <= 1);
  const range = pageRange(page, totalPages);
  range.forEach(p => {
    if (p === '…') { const s = document.createElement('span'); s.textContent = '…'; s.style.padding = '0 4px'; btns.appendChild(s); }
    else addBtn(p, p, false, p === page);
  });
  addBtn('Next ›', page + 1, page >= totalPages);
}

function pageRange(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4)   return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total-4, total-3, total-2, total-1, total];
  return [1, '…', cur-1, cur, cur+1, '…', total];
}

// ── Search & Filter ───────────────────────────────────────────────────────────
function applyFilters() {
  state.query = {};
  const search = $('search').value.trim();
  const dept   = $('filter-dept').value;
  const status = $('filter-status').value;
  const sem    = $('filter-semester').value;
  if (search) state.query.search     = search;
  if (dept)   state.query.department = dept;
  if (status) state.query.status     = status;
  if (sem)    state.query.semester   = sem;
  loadStudents(1);
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function openAdd() {
  state.editingId = null;
  $('modal-title').textContent = '➕ Add New Student';
  $('student-form').reset();
  $('modal-overlay').classList.add('open');
}

async function openEdit(id) {
  state.editingId = id;
  $('modal-title').textContent = '✏️ Edit Student';
  try {
    const s = await apiFetch(`${API}/${id}`);
    $('f-name').value        = s.name        ?? '';
    $('f-email').value       = s.email       ?? '';
    $('f-phone').value       = s.phone       ?? '';
    $('f-roll').value        = s.rollNumber  ?? '';
    $('f-dept').value        = s.department  ?? 'other';
    $('f-semester').value    = s.semester    ?? 1;
    $('f-gpa').value         = s.gpa         ?? '';
    $('f-dob').value         = s.dateOfBirth ?? '';
    $('f-status').value      = s.status      ?? 'active';
    $('f-address').value     = s.address     ?? '';
    $('modal-overlay').classList.add('open');
  } catch (e) { toast(e.message, 'error'); }
}

function closeModal() {
  $('modal-overlay').classList.remove('open');
}

// ── Save (Create / Update) ────────────────────────────────────────────────────
async function saveStudent() {
  const payload = {
    name:        $('f-name').value.trim(),
    email:       $('f-email').value.trim(),
    phone:       $('f-phone').value.trim() || undefined,
    rollNumber:  $('f-roll').value.trim(),
    department:  $('f-dept').value,
    semester:    parseInt($('f-semester').value, 10),
    gpa:         $('f-gpa').value.trim()  || undefined,
    dateOfBirth: $('f-dob').value.trim()  || undefined,
    status:      $('f-status').value,
    address:     $('f-address').value.trim() || undefined,
  };

  try {
    if (state.editingId) {
      await apiFetch(`${API}/${state.editingId}`, {
        method: 'PUT',
        body:   JSON.stringify(payload),
      });
      toast('Student updated successfully ✅');
    } else {
      await apiFetch(API, {
        method: 'POST',
        body:   JSON.stringify(payload),
      });
      toast('Student added successfully 🎉');
    }
    closeModal();
    loadStudents(state.pagination.page);
    loadStats();
  } catch (e) { toast(e.message, 'error'); }
}

// ── Delete ────────────────────────────────────────────────────────────────────
async function deleteStudent(id, name) {
  if (!confirm(`Delete student "${name}"? This cannot be undone.`)) return;
  try {
    await apiFetch(`${API}/${id}`, { method: 'DELETE' });
    toast(`Deleted "${name}" 🗑️`);
    loadStudents(state.pagination.page);
    loadStats();
  } catch (e) { toast(e.message, 'error'); }
}

// ── Utility ───────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadStudents();

  $('search').addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });
  $('modal-overlay').addEventListener('click', e => {
    if (e.target === $('modal-overlay')) closeModal();
  });
});
