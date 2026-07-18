const fs = require('fs');

function removeLines(filePath) {
  let file = fs.readFileSync(filePath, 'utf8');
  let lines = file.split('\n');
  
  // Find start index
  let startIndex = lines.findIndex(line => line.includes('{/* About IELTS Section */}'));
  
  // Find end index
  let endIndex = lines.findIndex(line => line.includes('<IELTSBooks />'));
  
  if (startIndex !== -1 && endIndex !== -1) {
    let newLines = [...lines.slice(0, startIndex), ...lines.slice(endIndex + 1)];
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Could not find markers in ${filePath}`);
  }
}

removeLines('src/pages/IELTS.tsx');
removeLines('src/features/ielts/IELTS.page.tsx');
