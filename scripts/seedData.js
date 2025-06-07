// Data seeding script for populating Firebase with initial data
const { spawn } = require('child_process');

console.log('Starting data seeding process...');
console.log('This will populate the database with sample data for Services, Portfolio and Blog');
console.log('----------------------------------------------------------------------');

// Execute the seeding code through Next.js runtime
const nextDev = spawn('npx', ['next', 'dev'], {
  env: {
    ...process.env,
    SEED_DATA: 'true', // Signal to seed data
    SEED_COLLECTIONS: 'services,portfolio,blog' // Only seed these collections
  },
  stdio: 'inherit' // Forward all stdio to parent process
});

nextDev.on('error', (err) => {
  console.error('Error running seeding process:', err);
  process.exit(1);
});

// Listen for SIGINT (Ctrl+C) to gracefully shut down
process.on('SIGINT', () => {
  console.log('\nShutting down seeding process...');
  nextDev.kill('SIGINT');
  process.exit(0);
}); 