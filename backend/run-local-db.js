const { MongoMemoryServer } = require('mongodb-memory-server');
const { exec } = require('child_process');

(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.log('✅ Local In-Memory MongoDB started at:', uri);
  console.log('Seeding database with default users...');

  const seedEnv = { ...process.env, MONGO_URI: uri };

  const seeder = exec('node seeder.js', { env: seedEnv });
  seeder.stdout.on('data', d => process.stdout.write(d));
  seeder.stderr.on('data', d => process.stderr.write(d));

  seeder.on('close', (code) => {
    console.log(`Seeder finished with code ${code}. Starting backend server...`);
    const child = exec('npx nodemon server.js', { env: seedEnv });
    child.stdout.on('data', data => process.stdout.write(data));
    child.stderr.on('data', data => process.stderr.write(data));
  });
})();
