const http = require('http'); // Import the built-in HTTP module

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
