/* ── Reset & Base ─────────────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary:    #4f46e5;
  --primary-dk: #4338ca;
  --success:    #10b981;
  --danger:     #ef4444;
  --warning:    #f59e0b;
  --info:       #3b82f6;
  --bg:         #f1f5f9;
  --card:       #ffffff;
  --border:     #e2e8f0;
  --text:       #1e293b;
  --muted:      #64748b;
  --radius:     10px;
  --shadow:     0 2px 12px rgba(0,0,0,.08);
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.header {
  background: linear-gradient(135deg, var(--primary), var(--primary-dk));
  color: #fff;
  padding: 20px 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 16px rgba(79,70,229,.35);
}
.header h1 { font-size: 1.5rem; font-weight: 700; }
.header p  { font-size: .875rem; opacity: .85; }

/* ── Stats Bar ───────────────────────────────────────────────────────────── */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  padding: 20px 32px 0;
}
.stat-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px 20px;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--primary);
}
.stat-card.active  { border-color: var(--success); }
.stat-card.graduated { border-color: var(--info); }
.stat-card.inactive  { border-color: var(--warning); }
.stat-card .value { font-size: 2rem; font-weight: 700; color: var(--text); }
.stat-card .label { font-size: .78rem; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }

/* ── Main Layout ─────────────────────────────────────────────────────────── */
.main { padding: 24px 32px; max-width: 1400px; margin: 0 auto; }

/* ── Toolbar ─────────────────────────────────────────────────────────────── */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.toolbar input[type="text"] {
  flex: 1;
  min-width: 200px;
  padding: 9px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: .9rem;
  outline: none;
  transition: border .2s;
}
.toolbar input[type="text"]:focus { border-color: var(--primary); }
.toolbar select {
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: .875rem;
  background: var(--card);
  cursor: pointer;
}
.btn {
  padding: 9px 20px;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: .875rem;
  font-weight: 600;
  transition: opacity .15s, transform .1s;
}
.btn:hover  { opacity: .88; transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn-primary { background: var(--primary); color: #fff; }
.btn-success { background: var(--success); color: #fff; }
.btn-danger  { background: var(--danger);  color: #fff; }
.btn-warning { background: var(--warning); color: #fff; }
.btn-sm { padding: 5px 12px; font-size: .8rem; }

/* ── Table ───────────────────────────────────────────────────────────────── */
.table-wrap {
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}
table { width: 100%; border-collapse: collapse; }
thead th {
  background: #f8fafc;
  padding: 12px 14px;
  text-align: left;
  font-size: .78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--muted);
  border-bottom: 1px solid var(--border);
}
tbody tr { border-bottom: 1px solid var(--border); transition: background .1s; }
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: #f8faff; }
tbody td { padding: 12px 14px; font-size: .875rem; vertical-align: middle; }

/* ── Badges ──────────────────────────────────────────────────────────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: .73rem;
  font-weight: 600;
  text-transform: capitalize;
}
.badge-active    { background: #d1fae5; color: #065f46; }
.badge-inactive  { background: #fef3c7; color: #92400e; }
.badge-graduated { background: #dbeafe; color: #1e40af; }
.badge-suspended { background: #fee2e2; color: #991b1b; }

/* ── Pagination ──────────────────────────────────────────────────────────── */
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  font-size: .875rem;
  color: var(--muted);
}
.page-btns { display: flex; gap: 8px; }
.page-btns button {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--card);
  cursor: pointer;
  font-size: .85rem;
  transition: background .15s;
}
.page-btns button:hover    { background: #f1f5f9; }
.page-btns button.active   { background: var(--primary); color: #fff; border-color: var(--primary); }
.page-btns button:disabled { opacity: .4; cursor: not-allowed; }

/* ── Modal ───────────────────────────────────────────────────────────────── */
.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 999;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  overflow-y: auto;
}
.overlay.open { display: flex; }
.modal {
  background: var(--card);
  border-radius: 14px;
  width: 100%;
  max-width: 560px;
  box-shadow: 0 20px 60px rgba(0,0,0,.2);
  animation: slideIn .2s ease;
}
@keyframes slideIn { from { transform: translateY(-24px); opacity: 0; } }
.modal-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h2 { font-size: 1.1rem; font-weight: 700; }
.modal-header button { background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--muted); }
.modal-body { padding: 20px 24px; }
.modal-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; justify-content: flex-end; }

/* ── Form ────────────────────────────────────────────────────────────────── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group.full { grid-column: 1 / -1; }
.form-group label { font-size: .8rem; font-weight: 600; color: var(--muted); }
.form-group input,
.form-group select,
.form-group textarea {
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: .875rem;
  outline: none;
  transition: border .2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--primary); }
.error-msg { color: var(--danger); font-size: .78rem; }

/* ── Toast ───────────────────────────────────────────────────────────────── */
#toast {
  position: fixed;
  bottom: 24px; right: 24px;
  background: #1e293b;
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: .875rem;
  box-shadow: 0 6px 24px rgba(0,0,0,.25);
  z-index: 9999;
  transform: translateY(80px);
  opacity: 0;
  transition: all .3s ease;
}
#toast.show { transform: translateY(0); opacity: 1; }
#toast.success { border-left: 4px solid var(--success); }
#toast.error   { border-left: 4px solid var(--danger); }

/* ── Loading ─────────────────────────────────────────────────────────────── */
.loading { text-align: center; padding: 48px; color: var(--muted); font-size: .95rem; }

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .main, .header, .stats-bar { padding-left: 16px; padding-right: 16px; }
  .form-grid { grid-template-columns: 1fr; }
  .form-group.full { grid-column: 1; }
  table { font-size: .8rem; }
  thead th:nth-child(n+5), tbody td:nth-child(n+5) { display: none; }
}
