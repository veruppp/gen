const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generate', (req, res) => {
  const { title, desc, owner, color } = req.body;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; background: #f9f9f9; color: #333; padding: 20px; }
    h1 { color: ${color}; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
  <footer>&copy; 2025 ${owner}</footer>
</body>
</html>
  `;

  const tempPath = path.join(__dirname, 'temp');
  const htmlPath = path.join(tempPath, 'index.html');
  const zipPath = path.join(tempPath, 'website.zip');

  fs.mkdirSync(tempPath, { recursive: true });
  fs.writeFileSync(htmlPath, htmlContent);

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    res.download(zipPath, 'website.zip', () => {
      fs.rmSync(tempPath, { recursive: true, force: true });
    });
  });

  archive.pipe(output);
  archive.file(htmlPath, { name: 'index.html' });
  archive.finalize();
});

const PORT = process.env.PORT || 3000;
// Removed for Vercel serverless
module.exports = (req, res) => {
  if (req.method === 'POST') {
    req.body = req.body || {}; , (req, res) => {
  const { title, desc, owner, color } = req.body;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; background: #f9f9f9; color: #333; padding: 20px; }
    h1 { color: ${color}; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p>${desc}</p>
  <footer>&copy; 2025 ${owner}</footer>
</body>
</html>
  `;

  const tempPath = path.join(__dirname, 'temp');
  const htmlPath = path.join(tempPath, 'index.html');
  const zipPath = path.join(tempPath, 'website.zip');

  fs.mkdirSync(tempPath, { recursive: true });
  fs.writeFileSync(htmlPath, htmlContent);

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    res.download(zipPath, 'website.zip', () => {
      fs.rmSync(tempPath, { recursive: true, force: true });
    });
  });

  archive.pipe(output);
  archive.file(htmlPath, { name: 'index.html' });
  archive.finalize();
});

const PORT = process.env.PORT || 3000;

  } else {
    res.status(405).send('Method Not Allowed');
  }
};PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
      
