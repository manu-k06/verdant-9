const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- VERDANT-9 AUTOMATED INTEGRITY TESTS ---');

const files = [
  'index.html',
  'specimens.html',
  'lab-notes.html',
  'growth-chart.html',
  'field-report.html',
  'completion.html',
  'style.css',
  'script.js',
  'test.ps1',
  'README.md'
];

// Check all files
for (const file of files) {
  const filePath = path.join(__dirname, file);
  assert.ok(fs.existsSync(filePath), `File exists: ${file}`);
  console.log(`[PASS] File verified: ${file}`);
}

// Check Module 1
const specimensHtml = fs.readFileSync(path.join(__dirname, 'specimens.html'), 'utf-8');
assert.ok(specimensHtml.includes('V-09'), 'V-09 target is present in specimens.html');
assert.ok(specimensHtml.includes('Exclude the specimen whose strongest response occurs at midday'), 'Dr Voss screening memo present');
console.log('[PASS] Module 01 Specimen Catalogue verified');

// Check Module 2
const labHtml = fs.readFileSync(path.join(__dirname, 'lab-notes.html'), 'utf-8');
assert.ok(labHtml.includes('LIGHTS OUT: 20:00'), 'Lights out 20:00 present');
assert.ok(labHtml.includes('DARK-CYCLE'), 'DARK-CYCLE option present');
console.log('[PASS] Module 02 Lab Notes verified');

// Check Module 3
const growthHtml = fs.readFileSync(path.join(__dirname, 'growth-chart.html'), 'utf-8');
assert.ok(growthHtml.includes('Slot 09'), 'Slot 09 present in growth-chart.html');
assert.ok(growthHtml.includes('FIRST SUSTAINED'), 'Sustained marker present');
console.log('[PASS] Module 03 Growth Analysis verified');

// Check Module 4
const fieldHtml = fs.readFileSync(path.join(__dirname, 'field-report.html'), 'utf-8');
assert.ok(fieldHtml.includes('NIGHTBLOOM'), 'NIGHTBLOOM present in field-report.html');
console.log('[PASS] Module 04 Field Report verified');

// Check Completion
const completionHtml = fs.readFileSync(path.join(__dirname, 'completion.html'), 'utf-8');
assert.ok(completionHtml.includes('PROJECT NIGHTBLOOM'), 'Project NIGHTBLOOM present in completion.html');
console.log('[PASS] Completion chamber verified');

console.log('\n==================================================');
console.log('ALL VERDANT-9 NODE INTEGRITY CHECKS PASSED!');
console.log('==================================================');
