const https = require('https');
const fs = require('fs');

const url = 'https://www.britishcouncil.pk/sites/default/files/british-council-logo.svg';
const file = fs.createWriteStream('public/british-council-logo.svg');

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download completed.');
  });
}).on('error', (err) => {
  fs.unlink('public/british-council-logo.svg', () => {});
  console.error('Error downloading:', err.message);
});
