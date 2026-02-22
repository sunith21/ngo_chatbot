const fs = require('fs');

const enrichDataStr = fs.readFileSync('src/data/careerEnrichment.js', 'utf8');

// The keys in careerEnrichment can be "string" or just string.
const regex = /["']?([a-zA-Z0-9-]+)["']?: \{[\s\S]*?topCompanies: (\[.*?\])[\s\S]*?relatedCareers: (\[.*?\])/g;

let enrichments = {};
let match;
while ((match = regex.exec(enrichDataStr)) !== null) {
    enrichments[match[1]] = { top: match[2], related: match[3] };
}

let code = fs.readFileSync('src/data/careerData.js', 'utf8');

for (const [id, data] of Object.entries(enrichments)) {
    // Look for the id, block, and the resources line to append after it.
    const rx = new RegExp('(id: ["\']' + id + '["\'][\\s\\S]*?)( *resources: \\[.*?\\]\\r?\\n)', 'g');
    code = code.replace(rx, `$1$2                topCompanies: ${data.top},\n                relatedCareers: ${data.related},\n`);
}

fs.writeFileSync('src/data/careerData.js', code);
console.log('Successfully enriched careerData.js');
