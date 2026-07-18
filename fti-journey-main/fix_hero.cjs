const fs = require('fs');
const path = require('path');
const dir = 'src/features/destinations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.page.tsx') && !f.includes('CountryDetail') && !f.includes('Destinations'));

const heroUrls = {
  'Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200',
  'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200',
  'Cyprus': 'https://images.unsplash.com/photo-1558981285-6f0c68a8df6d?auto=format&fit=crop&w=1200',
  'Finland': 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200',
  'Hungary': 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200',
  'Ireland': 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200',
  'Malaysia': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200',
  'NewZealand': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200',
  'Sweden': 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200',
  'Turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200',
  'UK': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200',
  'USA': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200'
};

files.forEach(file => {
  const countryName = file.replace('Detail.page.tsx', '');
  if (!heroUrls[countryName]) return;
  
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  const regex = /<img\s+src=["']([^"']+)["']\s+alt=["']Study in [^"']+["']/;
  const match = content.match(regex);
  
  if (match) {
    const oldSrc = match[1];
    const newSrc = heroUrls[countryName];
    if (oldSrc !== newSrc) {
      content = content.replace(oldSrc, newSrc);
      fs.writeFileSync(path.join(dir, file), content, 'utf8');
      console.log('Forcefully fixed hero in', file);
    } else {
      console.log('Hero already correct in', file);
    }
  }
});
