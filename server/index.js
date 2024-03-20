const http = require('http'); // Import the built-in HTTP module
require('dotenv').config();
const mysql = require('mysql2/promise');
const cors = require('cors');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MrL@zeo101',
  port: '3306'
});

pool.getConnection()
    .then(conn => {
        console.log('Connected to MySQL database!');
        // Perform database operations here using `conn.query()`
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL database:', err);
    });

const server = http.createServer((req, res) => {
  // Handle Cors Function To Allow Axios
  handleCors(req, res);

  // GET Requests 
  if (req.method === "GET") {
      if (req.url === "/") {
          res.setHeader('Content-Type', 'text/html');
          res.write('<html><head><title>Hello, World!</title></head><body><h1>Hello, World!</h1></body></html>');
          res.end();
      }
    }
  else if (req.method === "POST") {
  }
  else if(req.method == "DELETE") {

  }
});

const handleCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
  }
};

const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
