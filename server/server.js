const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  // Add any more mime types as needed
};

// This serves files from the specified directory
const serveFile = (filePath, contentType, response) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If the file is not found, return 404
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('Not found');
      } else {
        // For any other server error, return 500
        response.writeHead(500);
        response.end('Sorry, there was an error on the server.');
      }
    } else {
      // If file is found, serve it
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
};

// Create an HTTP server that responds to all requests
const server = http.createServer((req, res) => {
  const basePath = path.join(__dirname, '../client/build');
  let filePath = basePath + req.url;

  // If no specific file requested, serve the index.html (SPA support)
  if (req.url === '/') {
    filePath = path.join(basePath, 'index.html');
  }

  const ext = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeType[ext] || 'application/octet-stream';

  // Serve the requested file
  serveFile(filePath, contentType, res);
});

// Start the HTTP server on the port provided by Heroku
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
