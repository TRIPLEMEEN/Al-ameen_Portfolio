import fs from 'fs';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Input and output file paths
const inputFile = './src/styles/global.css';
const outputFile = './src/styles/compiled.css';

// Process the CSS
fs.readFile(inputFile, (err, css) => {
  if (err) {
    console.error('Error reading CSS file:', err);
    return;
  }

  postcss([
    tailwindcss('./tailwind.config.js'),
    autoprefixer()
  ])
  .process(css, {
    from: inputFile,
    to: outputFile,
    map: { inline: false }
  })
  .then(result => {
    fs.writeFileSync(outputFile, result.css);
    console.log('Successfully rebuilt styles!');
  })
  .catch(error => {
    console.error('Error processing CSS:', error);
  });
});
