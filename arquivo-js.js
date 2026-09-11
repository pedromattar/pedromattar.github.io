/**
 * pedromattar.io - Clean, Fast & Minimalist Scorekeeper
 * Pure functionality, local storage persistence, zero unnecessary effects.
 */

const STORAGE_KEY = 'pedromattar_scorekeeper_v1';
const THEME_KEY = 'pedromattar_theme_clean';

let currentSuit = 'copas';
let currentFilter = 'all';
let searchQuery = '';
let records = [];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStorage();
  initEvents();
  render();
});

/* ==========================================================================
   Theme Handling
   ========================================================================== */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
  }
}

/* ==========================================================================
   Storage
   ========================================================================== */
function initStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      records = JSON.parse(data);
    } else {
      records = [
        { id: '1', nome: 'Pedro', bebida: 'Truco', quantidade: 3, naipe: 'copas', timestamp: Date.now() - 3600000 },
        { id: '2', nome: 'Lucas', bebida: 'Partida 1', quantidade: 1, naipe: 'espadas', timestamp: Date.now() - 2400000 },
        { id: '3', nome: 'Marcelo', bebida: 'Vitória', quantidade: 6, naipe: 'ouros', timestamp: Date.now() - 1200000 },
        { id: '4', nome: 'Pedro', bebida: 'Doze', quantidade: 12, naipe: 'paus', timestamp: Date.now() - 600000 }
      ];
      save();
    }
  } catch (e) {
    records = [];
  }
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Save failed:', e);
  }
}

/* ==========================================================================
   Events
   ========================================================================== */
function initEvents() {
  // Theme
  const btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

  // CSV
  const btnCsv = document.getElementById('btn-export-csv');
  if (btnCsv) btnCsv.addEventListener('click', exportCsv);

  // Reset
  const btnReset = document.getElementById('btn-reset-data');
  if (btnReset) btnReset.addEventListener('click', resetData);

  // Suit Picker Buttons
  const suitBtns = document.querySelectorAll('.suit-btn');
  suitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      suitBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      currentSuit = btn.getAttribute('data-suit');
    });
  });

  // Counter Stepper
  const btnInc = document.getElementById('btn-aumentar');
  const btnDec = document.getElementById('btn-diminuir');
  const inputNum = document.getElementById('numero');

  if (btnInc && inputNum) {
    btnInc.addEventListener('click', () => {
      const val = parseInt(inputNum.value, 10) || 0;
      inputNum.value = val + 1;
    });
  }

  if (btnDec && inputNum) {
    btnDec.addEventListener('click', () => {
      const val = parseInt(inputNum.value, 10) || 0;
      if (val > 0) inputNum.value = val - 1;
    });
  }

  // Presets
  const presets = document.querySelectorAll('.preset-pill');
  presets.forEach(p => {
    p.addEventListener('click', () => {
      const val = parseInt(p.getAttribute('data-val'), 10);
      if (inputNum) inputNum.value = val;
    });
  });

  // Submit
  const btnSubmit = document.getElementById('btn-enviar');
  if (btnSubmit) btnSubmit.addEventListener('click', addRecord);

  // Search
  const search = document.getElementById('input-search');
  if (search) {
    search.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTables();
    });
  }

  // Filter Tabs
  const filterTabs = document.querySelectorAll('.tab-btn');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderTables();
    });
  });
}

/* ==========================================================================
   Actions
   ========================================================================== */
function addRecord() {
  const nameEl = document.getElementById('nome');
  const descEl = document.getElementById('bebida');
  const numEl = document.getElementById('numero');

  const nome = nameEl.value.trim();
  const bebida = descEl.value.trim() || 'Geral';
  const quantidade = parseInt(numEl.value, 10) || 1;

  if (!nome) {
    nameEl.focus();
    toast('Informe o nome do jogador');
    return;
  }

  records.unshift({
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
    nome,
    bebida,
    quantidade,
    naipe: currentSuit,
    timestamp: Date.now()
  });

  save();
  render();

  nameEl.value = '';
  descEl.value = '';
  numEl.value = 1;
  nameEl.focus();

  toast(`Registrado para ${nome}`);
}

function removeRecord(id) {
  records = records.filter(r => r.id !== id);
  save();
  render();
  toast('Item removido');
}

function resetData() {
  if (confirm('Deseja limpar todos os registros?')) {
    records = [];
    save();
    render();
    toast('Dados limpos');
  }
}

/* ==========================================================================
   Render Logic
   ========================================================================== */
function render() {
  renderMetrics();
  renderTables();
}

function renderMetrics() {
  const totalPts = records.reduce((s, r) => s + (r.quantidade || 0), 0);
  const playerMap = {};
  const suitMap = { copas: 0, espadas: 0, ouros: 0, paus: 0 };

  records.forEach(r => {
    playerMap[r.nome] = (playerMap[r.nome] || 0) + (r.quantidade || 0);
    if (suitMap[r.naipe] !== undefined) {
      suitMap[r.naipe] += (r.quantidade || 0);
    }
  });

  // Top Player
  let topName = '—';
  let topScore = -1;
  for (const [name, sc] of Object.entries(playerMap)) {
    if (sc > topScore) {
      topScore = sc;
      topName = `${name} (${sc})`;
    }
  }

  // Top Suit
  let topSuit = '—';
  let topSuitScore = -1;
  const suitLabels = { copas: 'Copas', espadas: 'Espadas', ouros: 'Ouros', paus: 'Paus' };
  for (const [s, c] of Object.entries(suitMap)) {
    if (c > topSuitScore && c > 0) {
      topSuitScore = c;
      topSuit = suitLabels[s];
    }
  }

  document.getElementById('kpi-total-points').textContent = totalPts;
  document.getElementById('kpi-top-player').textContent = topName;
  document.getElementById('kpi-top-suit').textContent = topSuit;
  document.getElementById('kpi-total-players').textContent = Object.keys(playerMap).length;
}

function renderTables() {
  const suits = ['copas', 'espadas', 'ouros', 'paus'];

  suits.forEach(suit => {
    const card = document.querySelector(`.table-box[data-suit="${suit}"]`);
    const tbody = document.querySelector(`#tabela-${suit} tbody`);
    const emptyNotice = document.getElementById(`empty-${suit}`);
    const metaCount = document.getElementById(`count-${suit}`);

    if (!card || !tbody) return;

    if (currentFilter !== 'all' && currentFilter !== suit) {
      card.style.display = 'none';
      return;
    } else {
      card.style.display = 'block';
    }

    const filtered = records.filter(r => {
      if (r.naipe !== suit) return false;
      if (!searchQuery) return true;
      return r.nome.toLowerCase().includes(searchQuery) || (r.bebida && r.bebida.toLowerCase().includes(searchQuery));
    });

    const sum = filtered.reduce((s, r) => s + (r.quantidade || 0), 0);
    if (metaCount) {
      metaCount.textContent = `${filtered.length} reg • ${sum} pts`;
    }

    tbody.innerHTML = '';
    if (filtered.length === 0) {
      if (emptyNotice) emptyNotice.style.display = 'block';
    } else {
      if (emptyNotice) emptyNotice.style.display = 'none';

      filtered.forEach(r => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><span class="player-name">${escape(r.nome)}</span></td>
          <td><span class="item-desc">${escape(r.bebida)}</span></td>
          <td><span class="score-badge">+${r.quantidade}</span></td>
          <td style="text-align: right;">
            <button type="button" class="btn-del" title="Remover" onclick="removeRecord('${r.id}')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }
  });
}

/* ==========================================================================
   CSV Export
   ========================================================================== */
function exportCsv() {
  if (records.length === 0) {
    toast('Sem dados para exportar');
    return;
  }

  const header = ['ID', 'Data', 'Naipe', 'Jogador', 'Descricao', 'Pontos'];
  const lines = records.map(r => [
    r.id,
    new Date(r.timestamp).toISOString().split('T')[0],
    r.naipe,
    `"${r.nome.replace(/"/g, '""')}"`,
    `"${r.bebida.replace(/"/g, '""')}"`,
    r.quantidade
  ]);

  const csv = [header.join(','), ...lines.map(l => l.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `scorekeeper_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('CSV exportado');
}

/* ==========================================================================
   Toast & Utils
   ========================================================================== */
function toast(msg) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;

  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = msg;
  wrap.appendChild(t);

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.2s ease';
    setTimeout(() => t.remove(), 200);
  }, 2200);
}

function escape(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
