# Set 4: VERDANT-9 — The Last Experiment · Game Master & Organizer Guide

## 🌿 Theme & Overview
- **Title:** VERDANT-9 — The Last Experiment
- **Genre:** Botanical Mystery / Environmental Research Investigation
- **Look & Feel:** Warm ivory paper archives, deep forest green (`#183D32`), botanical sage (`#547C59`), muted gold stamps, and pulsing cyan bioluminescence (`#72D9C5`). 100% offline, zero external dependencies required.
- **Target Completion Time:** ~8 to 12 minutes.
- **Structure:** 4 connected research modules + Facility Briefing landing page + Final Project NIGHTBLOOM Completion Chamber.

---

## 🗺️ Page Flow & Walkthrough

| Step | Page File | Module | Puzzle Type | Solution | Solved Unlocks |
|:---:|:---|:---|:---|:---:|:---|
| **0** | [`index.html`](file:///c:/Users/manuk/webhunt/verdant-9/index.html) | Archive Briefing | Overview of Dr. Elara Voss's 2049 fragmented research dossier | **Explore Cards** | Direct links to all 4 modules |
| **1** | [`specimens.html`](file:///c:/Users/manuk/webhunt/verdant-9/specimens.html) | Module 01: Catalogue | Filter 6 specimens based on midday exclusion & warmth emission exclusion | **`V-09`** | `SPECIMEN ID: V-09` |
| **2** | [`lab-notes.html`](file:///c:/Users/manuk/webhunt/verdant-9/lab-notes.html) | Module 02: Lab Notes | Match peak fluorometric activity (91 @ 02:00) with lighting schedule (20:00 - 06:00) | **`DARK-CYCLE`** | `ACTIVITY PATTERN: DARK-CYCLE` |
| **3** | [`growth-chart.html`](file:///c:/Users/manuk/webhunt/verdant-9/growth-chart.html) | Module 03: Growth Analysis | Locate the 3rd slot in the +3 progression where activity crosses sustained threshold | **`09`** | `OBSERVATION SLOT: 09` |
| **4** | [`field-report.html`](file:///c:/Users/manuk/webhunt/verdant-9/field-report.html) | Module 04: Field Report | Synthesize V-09, DARK-CYCLE, and Slot 09 with catalogue profile | **`NIGHTBLOOM`** | Unlocks Completion Chamber |
| **5** | [`completion.html`](file:///c:/Users/manuk/webhunt/verdant-9/completion.html) | Final Discovery | Grand conclusion debrief, glowing specimen illustration, evidence review, and restart | **Victory** | Archive Reconstructed |

---

## 🔑 Canonical Final Answer
```
NIGHTBLOOM
```
*(Case-insensitive: accepts `NIGHTBLOOM`, `nightbloom`, or `Nightbloom`)*

---

## 🧩 Detailed Puzzle Solutions & Time Estimates

### 1. Module 01: Specimen Catalogue (`specimens.html`) — ~2.5 minutes
- **Dr. Voss's Clue:**
  > “Exclude the specimen whose strongest response occurs at midday. Exclude the one that responds to warmth with an orange emission. The target produces a blue-green signal during darkness. Its activity peaks after the dark cycle begins.”
- **Deduction:**
  - V-02 (Solcrest): Diurnal, no visible glow.
  - V-04 (Duskmoss): Grows in shade, but zero luminescence.
  - V-06 (Glassfern): Excluded — peak activity at midday.
  - V-07 (Embervine): Excluded — orange glow triggered by warmth.
  - **V-09 (Nightbloom):** Blue-green glow in darkness, peak activity during dark cycle. Matches all criteria.
  - V-11 (Frostroot): Pale roots, activity collapses in cold.
- **Answer:** Select **`V-09`** and click *Confirm Identification*.
- **Unlocked Evidence:** `SPECIMEN ID: V-09`

### 2. Module 02: Laboratory Notes (`lab-notes.html`) — ~2 minutes
- **Chronobiology Telemetry Dataset:**
  - +0h (20:00): 12 units
  - +2h (22:00): 28 units
  - +4h (00:00): 64 units
  - **+6h (02:00): 91 units (PEAK)**
  - +8h (04:00): 74 units
  - +10h (06:00): 33 units
- **Illumination Schedule:**
  - `LIGHTS OUT: 20:00`
  - `LIGHTS ON: 06:00`
- **Deduction:** The peak occurs 6 hours post-lights-out at `02:00`, which is in the middle of the dark cycle.
- **Answer:** Select **`DARK-CYCLE`** and submit.
- **Unlocked Evidence:** `ACTIVITY PATTERN: DARK-CYCLE`

### 3. Module 03: Growth Analysis (`growth-chart.html`) — ~2.5 minutes
- **Observation Progression:** `03, 06, 09, 12, 15, ?` (Arithmetic spacing: +3).
- **Dr. Voss's Annotation:**
  > “The identification code begins with the observation slot at which the unusual signal first becomes sustained. The first sustained signal occurred at the third slot. The final two digits were preserved in the original specimen record.”
- **Deduction:** The 3rd slot in the schedule is `09`, which is explicitly marked on the chart as the threshold where activity crosses from transient noise (amplitude 87).
- **Answer:** Enter **`09`** and submit.
- **Unlocked Evidence:** `OBSERVATION SLOT: 09`

### 4. Module 04: Final Field Report (`field-report.html`) — ~2 minutes
- **Synthesize Dossier:**
  - Specimen: `V-09`
  - Activity Pattern: `DARK-CYCLE`
  - Observation Slot: `09`
  - Catalogue Profile: Blue-green glow during darkness -> Species: `Nightbloom`
- **Dr. Voss's Conclusion:**
  > “The project designation was never a scientific classification. It was the name used by the research team for the plant that responded to darkness.”
- **Answer:** Type **`NIGHTBLOOM`** and submit.
- **Unlocked Evidence:** `SPECIES: NIGHTBLOOM` -> Redirects to `completion.html`.

---

## 🧪 Verification & Testing
To run the automated verification suite, execute either:

```powershell
powershell -ExecutionPolicy Bypass -File "verdant-9/test.ps1"
```
Or with Node.js:
```bash
node verdant-9/test.js
```
Checks verified:
1. All 9 essential HTML, CSS, JS, and test files exist.
2. Specimen screening logic excludes midday/warmth candidates and isolates V-09.
3. Chronobiology peak 91 at 02:00 verifies `DARK-CYCLE`.
4. Growth sequence threshold identifies `09`.
5. Canonical answer `NIGHTBLOOM` accepted with whitespace/case-insensitivity.
6. LocalStorage persistence, audit activity log, and reset dialog functionality confirmed.
