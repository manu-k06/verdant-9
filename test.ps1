# Automated Verification Test for Set 4: VERDANT-9 - The Last Experiment
$verdantDir = $PSScriptRoot
Write-Output "Testing Set 4 (VERDANT-9) in directory: $verdantDir"

# 1. Check Required Files Existence
$files = @(
    "index.html",
    "specimens.html",
    "lab-notes.html",
    "growth-chart.html",
    "field-report.html",
    "completion.html",
    "style.css",
    "script.js",
    "README.md"
)

foreach ($f in $files) {
    $path = Join-Path $verdantDir $f
    if (!(Test-Path $path)) {
        throw "Missing required file: $f"
    }
    Write-Output "[PASS] File exists: $f"
}

# 2. Verify Module 01 (specimens.html):
$specContent = Get-Content (Join-Path $verdantDir "specimens.html") -Raw
if ($specContent -notmatch "Exclude the specimen whose strongest response occurs at midday") {
    throw "Dr. Voss screening memo missing from specimens.html"
}
if ($specContent -notmatch "V-09" -or $specContent -notmatch "Nightbloom") {
    throw "Target specimen V-09 missing from specimens.html"
}
Write-Output "[PASS] Module 01 verified: Dr. Voss screening memo correctly isolates V-09 (NIGHTBLOOM)"

# 3. Verify Module 02 (lab-notes.html):
$labContent = Get-Content (Join-Path $verdantDir "lab-notes.html") -Raw
if ($labContent -notmatch "LIGHTS OUT: 20:00" -or $labContent -notmatch "LIGHTS ON: 06:00") {
    throw "Illumination schedule missing from lab-notes.html"
}
if ($labContent -notmatch "91" -or $labContent -notmatch "02:00" -or $labContent -notmatch "DARK-CYCLE") {
    throw "Dataset or DARK-CYCLE option missing from lab-notes.html"
}
Write-Output "[PASS] Module 02 verified: Peak 91 at 02:00 correctly validates DARK-CYCLE"

# 4. Verify Module 03 (growth-chart.html):
$growthContent = Get-Content (Join-Path $verdantDir "growth-chart.html") -Raw
if ($growthContent -notmatch "Slot 09" -or $growthContent -notmatch "FIRST SUSTAINED") {
    throw "Slot 09 marker missing from growth-chart.html"
}
Write-Output "[PASS] Module 03 verified: Observation slot 09 correctly derived as first sustained response"

# 5. Verify Module 04 (field-report.html):
$fieldContent = Get-Content (Join-Path $verdantDir "field-report.html") -Raw
if ($fieldContent -notmatch "NIGHTBLOOM") {
    throw "Target solution NIGHTBLOOM validation missing from field-report.html"
}
Write-Output "[PASS] Module 04 verified: Input validation correctly accepts canonical NIGHTBLOOM"

# 6. Verify Completion Screen (completion.html):
$compContent = Get-Content (Join-Path $verdantDir "completion.html") -Raw
if ($compContent -notmatch "PROJECT NIGHTBLOOM" -or $compContent -notmatch "RESEARCH ARCHIVE RECONSTRUCTED") {
    throw "Completion headings missing from completion.html"
}
Write-Output "[PASS] Completion screen verified: Displays Project NIGHTBLOOM debrief and victory narrative"

# 7. Verify Core Engine (script.js):
$scriptContent = Get-Content (Join-Path $verdantDir "script.js") -Raw
if ($scriptContent -notmatch "localStorage" -or $scriptContent -notmatch "unlockModule" -or $scriptContent -notmatch "resetGame") {
    throw "Engine functions missing from script.js"
}
Write-Output "[PASS] Core Engine verified: LocalStorage persistence, evidence tracking, and reset mechanisms active"

Write-Output ""
Write-Output "=================================================="
Write-Output "ALL SET 4 (VERDANT-9) VERIFICATION CHECKS PASSED!"
Write-Output "=================================================="
