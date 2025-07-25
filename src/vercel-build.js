const { execSync } = require('child_process');

console.log('Running build script...');

try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('Building app...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}