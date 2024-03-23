const http = require('http'); // Import the built-in HTTP module
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    'postofficeproject',
    {
      expiresIn: '30d',
    }
  );
};

const db = mysql.createConnection(
{
    host: 'post-office-web-database.mysql.database.azure.com',
    user: 'postofficeadmin',
    password: 'D@tabase123',
    database: 'mydb',
    port: 3306,
    //ssl: {ca: fs.readFileSync('C:\\Users\\rayya.DESKTOP-92F6ECR\\.ssh\\DigiCertGlobalRootCA.crt.pem')}
});

// connect to database
db.connect((err) => {
  if (err) {
      console.log('Not connected to database');
      throw err;
  } else {
      console.log('Connected to database');
  }
});
const handleCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
  }
};
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

const server = http.createServer( async (req, res) => {
  // Handle Cors Function To Allow Axios
  handleCors(req, res);

  const basePath = path.join(__dirname, '../client/build');
  let filePath = basePath + req.url;

  // GET Requests 
  if (req.method === "GET") {
    if (req.url === "/") {
      
      
      if (req.url === "/") {
        filePath = path.join(basePath, 'index.html');
      }

      
    }
    // Get ALl Users
    else if (req.url === "/users") 
    {
      db.query("SELECT * FROM customer_user", (error, result) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error }));
          return; // Exit early since we've completed handling this request
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return; // Exit early since we've completed handling this request
        }
      });
    }
    // Get ALl Customers
    else if (req.url === "/customers") 
    {
      db.query(
        "SELECT * FROM customer",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
          } else {
             res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        }
      );
    }
    // Get ALL packages
    else if (req.url === "/package") 
    {
      db.query(
        "SELECT * FROM package",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
          } else {
             res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        }
      );
    }
    // Get ALL transactions
    else if (req.url === "/transaction") 
    {
      db.query(
        "SELECT * FROM transaction",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
          } else {
             res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
          }
        }
      );
    }
  }
  else if (req.method === "POST") {
    if (req.url === "/register") {
      let data = "";
      req.on("data", (chunk) => {
          data += chunk;
      });
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
      req.on("end", () => {
          const body = JSON.parse(data);
          const userid = uuidv4().substring(0,10);
          const firstname = body.firstname;
          const lastname = body.lastname; 
          const username = body.username;
          const password = body.password;
          const phoneNumber = body.phoneNumber;
          const email = body.email;
          const dateSignup = formattedDate; 
          const role = 'User';
          const address = body.address;
          
          db.query(
            "INSERT INTO customer_user (UserID, CustomerUser, CustomerPass, Email, firstname, lastname, address, phonenumber, dateSignedUp, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [userid, username, password, email, firstname, lastname, address, phoneNumber, dateSignup, role],
              (error) => {
                  if (error) {
                    console.log(error);
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: "Do we get this far?"}));
                  } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ message: "User has signed up successfully" }));
                  }
              }
          );
      });
    }
    else if (req.url === "/login") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      
      req.on("end", () => {
        const body = JSON.parse(data);
        const username = body.username;
        const password = body.password;
    
        // Here, make sure you are hashing and comparing passwords correctly if using hashing
        // If passwords are hashed, compare the hash of the provided password with the stored hash
        db.query(
          "SELECT * FROM customer_user WHERE CustomerUser = ?",
          [username],
          (error, results) => {
            if (error) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
              if (results.length > 0) {
                const user = results[0]; // Assuming user is found in the first result

                const userRole = user.role;
                // Check if the provided password matches the stored password
                // If you're using hashed passwords, this is where bcrypt.compare would be used
                if (user.CustomerPass === password) {
                  // Generate token
                  const token = generateToken(user);
                  // Send user details and token in response
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({
                    id: user.UserID,
                    username: user.CustomerUser,
                    email: user.Email,
                    role: userRole,
                    token: token
                  }));
                } else {
                  // Password does not match
                  res.writeHead(401, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: "Wrong username or password" }));
                }
              } else {
                // No user found
                res.writeHead(401, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Wrong username or password" }));
              }
            }
          }
        );
      });
    }
    
  }
  else if(req.method == "DELETE") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");
  }
  const ext = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeType[ext] || 'application/octet-stream';

  serveFile(filePath, contentType, res);
});

const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
