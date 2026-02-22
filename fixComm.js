const fs = require('fs');
let code = fs.readFileSync('src/data/careerData.js', 'utf8');

const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('topCompanies:')) {
        let prevIndex = i - 1;
        let prev = lines[prevIndex];
        if (prev && !prev.trim().endsWith(',')) {
            // Just add a comma at the end of the line
            lines[prevIndex] = prev.trimRight() + ',';
        }
    }
}
fs.writeFileSync('src/data/careerData.js', lines.join('\n'));
console.log('Fixed commas!');
