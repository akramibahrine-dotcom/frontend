const Tesseract = require('tesseract.js');
const path = require('path');

async function checkImage(filename) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      path.join(__dirname, 'public/product-galery', filename),
      'ara' // Arabic
    );
    console.log(`\n--- ${filename} ---\n`);
    console.log(text.slice(0, 200));
  } catch(e) {
    console.log(`Error on ${filename}:`, e);
  }
}

async function run() {
  await checkImage('ferti 2.jpg');
  await checkImage('ferti 3.jpg');
}

run();