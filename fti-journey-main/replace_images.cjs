const fs = require('fs');
const path = require('path');

const dir = 'src/features/destinations';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.page.tsx'));

const replacements = {
  // Common student image that might be 403
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Library_of_Trinity_College_Dublin_2022.jpg/800px-Library_of_Trinity_College_Dublin_2022.jpg',
  // Turkey Hero Image
  'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&q=80&w=1200': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bosphorus_Bridge_%2815_July_Martyrs_Bridge%29.jpg/1200px-Bosphorus_Bridge_%2815_July_Martyrs_Bridge%29.jpg'
};

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let changed = false;
  
  for (const [oldImg, newImg] of Object.entries(replacements)) {
    if (content.includes(oldImg)) {
      content = content.replace(newImg, newImg); // safety check
      content = content.split(oldImg).join(newImg);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log('Updated images in', file);
  }
});
