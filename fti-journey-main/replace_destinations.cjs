const fs = require('fs');
const file = 'src/pages/Destinations.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg/1200px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Toronto_skyline_from_the_islands.jpg/1200px-Toronto_skyline_from_the_islands.jpg': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Opera_House_Sails.jpg/1200px-Sydney_Opera_House_Sails.jpg': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Trinity_College_Dublin_Library_Long_Room.jpg/1200px-Trinity_College_Dublin_Library_Long_Room.jpg': 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Stanford_University_Main_Quad_2.jpg/1200px-Stanford_University_Main_Quad_2.jpg': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Budapest_Chain_Bridge_and_Buda_Castle.jpg/1200px-Budapest_Chain_Bridge_and_Buda_Castle.jpg': 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bosphorus_Bridge_%2815_July_Martyrs_Bridge%29.jpg/1200px-Bosphorus_Bridge_%2815_July_Martyrs_Bridge%29.jpg': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Paphos_harbour_castle.jpg/1200px-Paphos_harbour_castle.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Kuala_Lumpur_city_center.jpg/1200px-Kuala_Lumpur_city_center.jpg': 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Gamla_Stan_Stockholm.jpg/1200px-Gamla_Stan_Stockholm.jpg': 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Lake_Tekapo_and_Mount_John_Observatory.jpg/1200px-Lake_Tekapo_and_Mount_John_Observatory.jpg': 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200'
};

for (const [oldUrl, newUrl] of Object.entries(replacements)) {
  content = content.split(oldUrl).join(newUrl);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Reverted all Wikimedia links in Destinations.tsx back to stable Unsplash links!');
