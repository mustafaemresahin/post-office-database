const http = require('http'); // Import the built-in HTTP module
require('dotenv').config();
const mysql = require('mysql2/promise');

/*
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,  // Replace with your database name
  port: process.env.DB_PORT
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

    */
// Define a function to handle incoming requests
const handleRequest = (request, response) => {
  // Set the response headers
  response.setHeader('Content-Type', 'application/json');  // Assuming JSON response

  // Handle different HTTP methods (e.g., GET, POST)
  if (request.method === 'GET') {
    // Handle GET requests (logic to retrieve data)
    response.statusCode = 200; // Set status code for successful request
    response.end(JSON.stringify({ message: 'This is a GET response' }));  // Example response data
  } else if (request.method === 'POST') {
    // Handle POST requests (logic to process data)
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });

    request.on('end', () => {
      // Parse the request body (if applicable)
      const parsedData = JSON.parse(data);
      // Process the data here (logic based on received data)
      response.statusCode = 201; // Set status code for successful creation
      response.end(JSON.stringify({ message: 'Data received successfully' }));
    });
  } else {
    // Handle other methods or errors
    response.statusCode = 405; // Method Not Allowed
    response.end(JSON.stringify({ message: 'Method not supported' }));
  }
};

// Create an HTTP server and listen for requests
const server = http.createServer(handleRequest);
const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
