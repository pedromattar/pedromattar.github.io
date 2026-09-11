/**
 * Pedromattar.io - Modern Interactive Score & Companion App
 * Full state management, LocalStorage sync, KPI computations & animations.
 */

// Application State
const STATE_KEY = 'pedromattar_io_data_v2';
const THEME_KEY = 'pedromattar_io_theme';

let currentSuit = 'copas';
let currentFilter = 'all';
let searchQuery = '';
let records = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadRecords();
  bindEvents();
  renderApp();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
  showToast(`Modo ${next === 'dark' ? 'Escuro' : 'Claro'} ativado!`, 'info');
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

/* ==========================================================================
   Storage & State
   ========================================================================== */
function loadRecords() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      records = JSON.parse(raw);
    } else {
      // Seed initial sample data if completely empty
      records = [
        { id: '1', nome: 'Pedro', bebida: 'Truco 6', quantidade: 6, naipe: 'copas', timestamp: Date.now() - 3600000 },
        { id: '2', nome: 'Lucas', bebida: 'Cerveja IPA', quantidade: 2, naipe: 'espadas', timestamp: Date.now() - 2400000 },
        { id: '3', nome: 'Marcelo', bebida: 'Rodada Ouros', quantidade: 3, naipe: 'ouros', timestamp: Date.now() - 1200000 },
        { id: '4', nome: 'Pedro', bebida: 'Truco 12', quantidade: 12, naipe: 'paus', timestamp: Date.now() - 600000 }
      ];
      saveRecords();
    }
  } catch (err) {
    console.error('Error loading records:', err);
    records = [];
  }
}

function saveRecords() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Error saving records:', err);
  }
}

/* ==========================================================================
   Event Binding
   ========================================================================== */
function bindEvents() {
  // Theme Toggle
  const btnTheme = document.getElementById('btn-theme-toggle');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

  // CSV Export
  const btnCsv = document.getElementById('btn-export-csv');
  if (btnCsv) btnCsv.addEventListener('click', exportToCsv);

  // Reset Data
  const btnReset = document.getElementById('btn-reset-data');
  if (btnReset) btnReset.addEventListener('click', resetAllData);

  // Suit Selection
  const suitCards = document.querySelectorAll('.suit-card');
  suitCards.forEach(card => {
    card.addEventListener('click', () => {
      suitCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-checked', 'true');
      currentSuit = card.getAttribute('data-suit');
    });
  });

  // Stepper Controls
  const btnAumentar = document.getElementById('btn-aumentar');
  const btnDiminuir = document.getElementById('btn-diminuir');
  const inputNumero = document.getElementById('numero');

  if (btnAumentar && inputNumero) {
    btnAumentar.addEventListener('click', () => {
      const val = parseInt(inputNumero.value, 10) || 0;
      inputNumero.value = val + 1;
    });
  }

  if (btnDiminuir && inputNumero) {
    btnDiminuir.addEventListener('click', () => {
      const val = parseInt(inputNumero.value, 10) || 0;
      if (val > 0) inputNumero.value = val - 1;
    });
  }

  // Quick Preset Chips
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.getAttribute('data-val'), 10);
      if (inputNumero) {
        inputNumero.value = val;
        showToast(`Valor definido para +${val}`, 'info');
      }
    });
  });

  // Form Submit
  const btnEnviar = document.getElementById('btn-enviar');
  if (btnEnviar) {
    btnEnviar.addEventListener('click', handleFormSubmit);
  }

  // Search Input
  const inputSearch = document.getElementById('input-search');
  if (inputSearch) {
    inputSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTables();
    });
  }

  // Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-filter');
      renderTables();
    });
  });
}

/* ==========================================================================
   Form Submission & Actions
   ========================================================================== */
function handleFormSubmit() {
  const nomeInput = document.getElementById('nome');
  const bebidaInput = document.getElementById('bebida');
  const numeroInput = document.getElementById('numero');

  const nome = nomeInput.value.trim();
  const bebida = bebidaInput.value.trim() || 'Rodada Geral';
  const quantidade = parseInt(numeroInput.value, 10) || 1;

  if (!nome) {
    showToast('Por favor, informe o nome do jogador!', 'error');
    nomeInput.focus();
    return;
  }

  const newRecord = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
    nome,
    bebida,
    quantidade,
    naipe: currentSuit,
    timestamp: Date.now()
  };

  records.unshift(newRecord);
  saveRecords();
  renderApp();

  // Reset inputs
  nomeInput.value = '';
  bebidaInput.value = '';
  numeroInput.value = 1;
  nomeInput.focus();

  // Celebration Confetti
  triggerConfetti();
  showToast(`Registro adicionado para ${nome} em ${currentSuit.toUpperCase()}!`, 'success');
}

function deleteRecord(id) {
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    const deleted = records.splice(index, 1)[0];
    saveRecords();
    renderApp();
    showToast(`Registro de ${deleted.nome} removido.`, 'info');
  }
}

function resetAllData() {
  if (confirm('Deseja realmente limpar todos os registros do aplicativo?')) {
    records = [];
    saveRecords();
    renderApp();
    showToast('Todos os dados foram resetados.', 'info');
  }
}

/* ==========================================================================
   Rendering & Calculations
   ========================================================================== */
function renderApp() {
  renderKPIs();
  renderTables();
}

function renderKPIs() {
  const totalPoints = records.reduce((sum, r) => sum + (r.quantidade || 0), 0);
  const playerScores = {};
  const suitCounts = { copas: 0, espadas: 0, ouros: 0, paus: 0 };

  records.forEach(r => {
    playerScores[r.nome] = (playerScores[r.nome] || 0) + (r.quantidade || 0);
    if (suitCounts[r.naipe] !== undefined) {
      suitCounts[r.naipe] += (r.quantidade || 0);
    }
  });

  // Top Player (MVP)
  let topPlayer = '—';
  let maxScore = -1;
  for (const [player, score] of Object.entries(playerScores)) {
    if (score > maxScore) {
      maxScore = score;
      topPlayer = `${player} (${score})`;
    }
  }

  // Top Suit
  let topSuit = '—';
  let maxSuitScore = -1;
  const suitNames = { copas: '♥ Copas', espadas: '♠ Espadas', ouros: '♦ Ouros', paus: '♣ Paus' };
  for (const [suit, count] of Object.entries(suitCounts)) {
    if (count > maxSuitScore && count > 0) {
      maxSuitScore = count;
      topSuit = suitNames[suit];
    }
  }

  const uniquePlayers = Object.keys(playerScores).length;

  // DOM Updates
  const elTopPlayer = document.getElementById('kpi-top-player');
  const elTotalPoints = document.getElementById('kpi-total-points');
  const elTopSuit = document.getElementById('kpi-top-suit');
  const elTotalPlayers = document.getElementById('kpi-total-players');

  if (elTopPlayer) elTopPlayer.textContent = topPlayer;
  if (elTotalPoints) elTotalPoints.textContent = totalPoints;
  if (elTopSuit) elTopSuit.textContent = topSuit;
  if (elTotalPlayers) elTotalPlayers.textContent = uniquePlayers;
}

function renderTables() {
  const suits = ['copas', 'espadas', 'ouros', 'paus'];

  suits.forEach(suit => {
    const tableContainer = document.querySelector(`.table-card[data-suit="${suit}"]`);
    const tbody = document.querySelector(`#tabela-${suit} tbody`);
    const emptyState = document.getElementById(`empty-${suit}`);
    const badgeCount = document.getElementById(`count-${suit}`);

    if (!tbody || !tableContainer) return;

    // Filter cards visibility based on top filter tabs
    if (currentFilter !== 'all' && currentFilter !== suit) {
      tableContainer.style.display = 'none';
      return;
    } else {
      tableContainer.style.display = 'flex';
    }

    // Filter items for this suit
    const suitRecords = records.filter(r => {
      if (r.naipe !== suit) return false;
      if (!searchQuery) return true;
      return r.nome.toLowerCase().includes(searchQuery) || (r.bebida && r.bebida.toLowerCase().includes(searchQuery));
    });

    // Update Header Counts
    const totalSuitPts = suitRecords.reduce((acc, cur) => acc + (cur.quantidade || 0), 0);
    if (badgeCount) {
      badgeCount.textContent = `${suitRecords.length} reg • ${totalSuitPts} pts`;
    }

    // Render Table Rows
    tbody.innerHTML = '';
    if (suitRecords.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';

      suitRecords.forEach(record => {
        const tr = document.createElement('tr');
        const initial = (record.nome || '?').charAt(0).toUpperCase();

        tr.innerHTML = `
          <td>
            <div class="player-cell">
              <span class="player-avatar">${initial}</span>
              <span>${escapeHtml(record.nome)}</span>
            </div>
          </td>
          <td>
            <span class="item-badge">${escapeHtml(record.bebida)}</span>
          </td>
          <td>
            <span class="score-pill">+${record.quantidade}</span>
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn-delete-row" title="Excluir registro" onclick="deleteRecord('${record.id}')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }
  });
}

/* ==========================================================================
   Export to CSV
   ========================================================================== */
function exportToCsv() {
  if (records.length === 0) {
    showToast('Não há dados para exportar.', 'error');
    return;
  }

  const header = ['ID', 'Data/Hora', 'Naipe', 'Jogador', 'Descricao_Bebida', 'Pontos'];
  const rows = records.map(r => [
    r.id,
    new Date(r.timestamp).toLocaleString('pt-BR'),
    r.naipe,
    `"${r.nome.replace(/"/g, '""')}"`,
    `"${r.bebida.replace(/"/g, '""')}"`,
    r.quantidade
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `pedromattar_io_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Arquivo CSV baixado com sucesso!', 'success');
}

/* ==========================================================================
   Utilities: Confetti & Toast
   ========================================================================== */
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#a855f7', '#ff2a6d', '#6366f1', '#10b981', '#f59e0b']
    });
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-circle-exclamation';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
