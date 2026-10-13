/**
 * VERDANT-9: The Last Experiment — Core Engine
 * Set 4 of Webhunt Archive Series
 */

const STORAGE_KEY = 'verdant9_state_v1';

const INITIAL_GAME_STATE = {
  completed: {
    m1: false, // Module 01: Specimen Catalogue (V-09)
    m2: false, // Module 02: Laboratory Notes (DARK-CYCLE)
    m3: false, // Module 03: Growth Analysis (09)
    m4: false  // Module 04: Final Field Report (NIGHTBLOOM)
  },
  evidence: {
    specimenId: null,
    activityPattern: null,
    observationSlot: null,
    species: null
  },
  selectedSpecimen: null,
  activityLog: [
    {
      id: 'init-1',
      timestamp: '2049-10-17 20:00:14',
      code: 'SYS-BOOT',
      msg: 'Archive node connected. Recovered 4 fragmented modules.',
      type: 'info'
    }
  ]
};

// Specimen Catalogue Dataset — Technical Spectrometry & Chrono-Biology
const SPECIMENS_DATA = [
  {
    id: "V-02",
    name: "Solcrest",
    binomialName: "Helianthus radialis",
    characteristics: "Diurnal heliotropic flora. Foliar stomata open strictly at photon irradiance > 800 µmol/m²/s.",
    habitat: "Conservatory Alpha (Arid Highland Solarium)",
    photoperiod: "Diurnal / Full Sun (12h solar cycle)",
    temperatureRange: "24°C - 32°C",
    emissionSpectrum: "0 nm (Non-emitting / Total optical silence)",
    solarZenithIndex: "1.00 (Maximum response at 12:00 solar noon)",
    activationLux: "> 600 lx (Quiescent in darkness)",
    fieldNotes: "Parenchyma relies on direct solar insolation. Stomata collapse when lux drops below 400 lx. Emits zero optical radiation across visible and ultraviolet spectra.",
    exclusionReason: "Rejected: Solar zenith quotient (1.00) indicates peak activity at midday. Zero luminescence detected."
  },
  {
    id: "V-04",
    name: "Duskmoss",
    binomialName: "Bryum crepusculum",
    characteristics: "Sciophytic bryophyte. Thrives in sub-canopy shadow without measurable photon discharge.",
    habitat: "Chamber Gamma (Subsurface Peat Bog)",
    photoperiod: "Shade-tolerant / Continuous low baseline",
    temperatureRange: "16°C - 20°C",
    emissionSpectrum: "0 nm (Absorptive / No fluorophore synthesis)",
    solarZenithIndex: "0.12 (Aperiodic flat baseline)",
    activationLux: "10 - 50 lx (Low light threshold)",
    fieldNotes: "Metabolic transport occurs in diffuse understory conditions. Sensors recorded absolute zero fluorometric activity across all photodetector bands.",
    exclusionReason: "Rejected: Shade-adapted, but exhibits zero fluorophore emission (0 nm)."
  },
  {
    id: "V-06",
    name: "Glassfern",
    binomialName: "Pteris vitrea",
    characteristics: "Achlorophyllous vitreous fern. Pinnules refract sunlight with sharp noon crest.",
    habitat: "Chamber Beta (High-Humidity Solarium)",
    photoperiod: "Diurnal / Solar Zenith Dependent",
    temperatureRange: "22°C - 26°C",
    emissionSpectrum: "540 nm (Passive prism scatter only; vanishes at darkness)",
    solarZenithIndex: "0.98 (Peak metabolic flux at 12:00 - 13:00 midday)",
    activationLux: "> 1000 lx (Solar zenith dependent)",
    fieldNotes: "Cell walls composed of silicon-rich crystal matrices. Peak optical refraction occurs at 12:30 midday solar peak. Discarded by Dr. Voss's explicit exclusion protocol.",
    exclusionReason: "Excluded by Voss Protocol: Peak response registered at midday solar zenith (Index 0.98)."
  },
  {
    id: "V-07",
    name: "Embervine",
    binomialName: "Parthenocissus pyrocarpa",
    characteristics: "Thermal-activated liana. Nodal glands discharge amber radiation under heat shock.",
    habitat: "Sector 3 (Geothermal Hydroponic Duct)",
    photoperiod: "Thermal dependent / Aperiodic",
    temperatureRange: "28°C - 38°C",
    emissionSpectrum: "625 nm (Thermal phosphor emission in warm amber-orange)",
    solarZenithIndex: "0.05 (Temperature-driven, not photoperiodic)",
    activationLux: "Independent of illumination (ΔT > 10°C required)",
    fieldNotes: "Infrared imaging confirms secondary phosphor discharge centered at 625 nm (amber-orange band) triggered only when ambient temperature exceeds 30°C.",
    exclusionReason: "Excluded by Voss Protocol: Luminescence is amber-orange (625 nm) and triggered by thermal heating, not darkness."
  },
  {
    id: "V-09",
    name: "Nightbloom",
    binomialName: "Nyctanthus cyaneus",
    characteristics: "Nocturnal angiosperm. Synthesizes organic luciferin triggered exclusively by environmental darkness.",
    habitat: "Sector 4 Vault (Climate Pod 9)",
    photoperiod: "Nocturnal / Inverse Circadian Rhythm",
    temperatureRange: "18°C - 22°C (Constant night baseline)",
    emissionSpectrum: "498 nm (Narrow-band cyan/blue-green bioluminescence)",
    solarZenithIndex: "0.01 (Near-zero daytime metabolic transport)",
    activationLux: "< 5 lx (Triggered strictly by facility dark-cycle)",
    fieldNotes: "Sensors register intense enzymatic bioluminescence strictly within the cyan band (498 nm). Activation occurs once illumination drops below 5 lx, reaching maximum crest 6 hours after lights-out.",
    isTarget: true
  },
  {
    id: "V-11",
    name: "Frostroot",
    binomialName: "Cryorhiza nivalis",
    characteristics: "Cryophilic alpine flora. Radicular transport collapses under refrigeration.",
    habitat: "Pod 11 (Cryogenic Sub-level Nursery)",
    photoperiod: "Sub-zero tolerance",
    temperatureRange: "4°C - 10°C",
    emissionSpectrum: "0 nm (Passive cold scatter only)",
    solarZenithIndex: "0.35 (Morning thaw interval)",
    activationLux: "50 - 200 lx",
    fieldNotes: "Radicular xylem channels freeze and cease ion mobility when temperature drops below 6°C. Emits no active biological photons.",
    exclusionReason: "Rejected: Non-luminescent cryophile. Vascular transport collapses in cold baseline."
  }
];

const Verdant = {
  // Retrieve saved state
  getState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...INITIAL_GAME_STATE,
          ...parsed,
          completed: { ...INITIAL_GAME_STATE.completed, ...(parsed.completed || {}) },
          evidence: { ...INITIAL_GAME_STATE.evidence, ...(parsed.evidence || {}) }
        };
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
  },

  // Save state
  saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Storage save error:", e);
    }
    this.updateCommonUI(state);
  },

  getTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `2049-10-17 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  },

  // Append entry to facility activity log
  addLog(msg, type = 'info', code = 'LOG-ENTRY') {
    const state = this.getState();
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: this.getTimestamp(),
      code,
      msg,
      type
    };
    state.activityLog = [entry, ...(state.activityLog || []).slice(0, 49)];
    this.saveState(state);
    this.renderActivityLog(state);
  },

  // Unlock research module & evidence
  unlockModule(moduleKey, evidenceKey, val, logMsg) {
    const state = this.getState();
    state.completed[moduleKey] = true;
    state.evidence[evidenceKey] = val;
    this.saveState(state);
    this.addLog(logMsg, 'success', 'EVID-RECOVERED');
  },

  // Complete reset
  resetGame() {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
    fresh.activityLog = [
      {
        id: `reset-${Date.now()}`,
        timestamp: this.getTimestamp(),
        code: 'ARCHIVE-RESET',
        msg: 'All four research modules reset to unrecovered state.',
        type: 'warning'
      }
    ];
    this.saveState(fresh);
    window.location.reload();
  },

  // Update common UI elements across pages
  updateCommonUI(state) {
    if (!state) state = this.getState();

    const count = Object.values(state.completed).filter(Boolean).length;
    const isAll = count === 4;

    const statusVal = document.getElementById('archiveStatusVal');
    if (statusVal) {
      statusVal.textContent = isAll ? 'FULLY RECONSTRUCTED' : 'PARTIALLY RECOVERED';
    }

    const counter = document.getElementById('evidenceCounter');
    if (counter) {
      counter.textContent = `${count}/4`;
    }

    const percent = Math.round((count / 4) * 100);
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = `${percent}%`;

    const progressPercent = document.getElementById('progressPercent');
    if (progressPercent) progressPercent.textContent = `${percent}%`;

    const progressDesc = document.getElementById('progressDesc');
    if (progressDesc) progressDesc.textContent = `RECONSTRUCTED (${count}/4)`;

    const stepTokens = {
      stepToken1: state.evidence.specimenId || '---',
      stepToken2: state.evidence.activityPattern || '---',
      stepToken3: state.evidence.observationSlot || '---',
      stepToken4: state.evidence.species || '---'
    };
    for (const [id, val] of Object.entries(stepTokens)) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    const stepBadges = {
      stepBadge1: state.completed.m1,
      stepBadge2: state.completed.m2,
      stepBadge3: state.completed.m3,
      stepBadge4: state.completed.m4
    };
    for (const [id, done] of Object.entries(stepBadges)) {
      const el = document.getElementById(id);
      if (el) {
        if (done) el.classList.add('step-completed');
        else el.classList.remove('step-completed');
      }
    }

    const sidePills = {
      sidePill1: state.evidence.specimenId ? `✓ ID: ${state.evidence.specimenId}` : '',
      sidePill2: state.evidence.activityPattern ? `✓ ${state.evidence.activityPattern}` : '',
      sidePill3: state.evidence.observationSlot ? `✓ SLOT: ${state.evidence.observationSlot}` : '',
      sidePill4: state.evidence.species ? `✓ ${state.evidence.species}` : ''
    };
    for (const [id, txt] of Object.entries(sidePills)) {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    }

    this.renderEvidenceModal(state);
  },

  openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('modal-open');
  },

  closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('modal-open');
  },

  renderEvidenceModal(state) {
    if (!state) state = this.getState();

    const items = [
      { id: 'evItem1', val: state.evidence.specimenId ? `SPECIMEN ID: ${state.evidence.specimenId}` : 'NOT RECOVERED', done: state.completed.m1 },
      { id: 'evItem2', val: state.evidence.activityPattern ? `ACTIVITY PATTERN: ${state.evidence.activityPattern}` : 'NOT RECOVERED', done: state.completed.m2 },
      { id: 'evItem3', val: state.evidence.observationSlot ? `OBSERVATION SLOT: ${state.evidence.observationSlot}` : 'NOT RECOVERED', done: state.completed.m3 },
      { id: 'evItem4', val: state.evidence.species ? `SPECIES: ${state.evidence.species}` : 'NOT RECOVERED', done: state.completed.m4 }
    ];

    items.forEach((item) => {
      const valEl = document.getElementById(`${item.id}Val`);
      const stampEl = document.getElementById(`${item.id}Stamp`);
      const cardEl = document.getElementById(item.id);

      if (valEl) valEl.textContent = item.val;
      if (stampEl) {
        stampEl.className = item.done ? 'archive-stamp stamp-recovered' : 'archive-stamp stamp-restricted';
        stampEl.textContent = item.done ? '✓ RECOVERED' : '🔒 NOT RECOVERED';
      }
      if (cardEl) {
        if (item.done) {
          cardEl.classList.add('evidence-recovered');
          cardEl.classList.remove('evidence-locked');
        } else {
          cardEl.classList.add('evidence-locked');
          cardEl.classList.remove('evidence-recovered');
        }
      }
    });

    const count = Object.values(state.completed).filter(Boolean).length;
    const completeBanner = document.getElementById('evidenceCompleteBanner');
    if (completeBanner) {
      completeBanner.style.display = count === 4 ? 'flex' : 'none';
    }
  },

  renderActivityLog(state) {
    if (!state) state = this.getState();
    const list = document.getElementById('logEntriesList');
    if (!list) return;

    list.innerHTML = '';
    (state.activityLog || []).forEach((entry) => {
      const div = document.createElement('div');
      div.className = `log-entry log-${entry.type}`;
      div.innerHTML = `
        <span class="log-time">[${entry.timestamp}]</span>
        <span class="log-code badge-code-${entry.type}">${entry.code}</span>
        <span class="log-msg">${entry.msg}</span>
      `;
      list.appendChild(div);
    });

    const sizeEl = document.getElementById('logBufferSize');
    if (sizeEl) sizeEl.textContent = `${(state.activityLog || []).length} events`;
  },

  launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#72D9C5', '#547C59', '#B99B60', '#F4F1E8', '#3AA58F'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.28,
        alpha: 1
      });
    }

    let frames = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rot += p.rotSpeed;
        p.alpha -= 0.012;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      frames++;
      if (frames < 90) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }
    render();
  },

  initGlobal() {
    this.updateCommonUI();
    this.renderActivityLog();

    const toggle = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('researchSidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
      });
    }

    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('modal-open');
      });
    });

    document.querySelectorAll('.modal-close-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('modal-open');
      });
    });

    const resetTrigger = document.getElementById('topbarResetBtn');
    if (resetTrigger) {
      resetTrigger.addEventListener('click', () => this.openModal('resetModal'));
    }

    const confirmResetBtn = document.getElementById('confirmResetBtn');
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener('click', () => this.resetGame());
    }

    const evidenceTrigger = document.getElementById('topbarEvidenceBtn');
    if (evidenceTrigger) {
      evidenceTrigger.addEventListener('click', () => this.openModal('evidenceModal'));
    }

    const bottomEvidenceTrigger = document.getElementById('bottomEvidenceBtn');
    if (bottomEvidenceTrigger) {
      bottomEvidenceTrigger.addEventListener('click', () => this.openModal('evidenceModal'));
    }

    const logTrigger = document.getElementById('topbarLogBtn');
    if (logTrigger) {
      logTrigger.addEventListener('click', () => this.openModal('logModal'));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Verdant.initGlobal();
});
