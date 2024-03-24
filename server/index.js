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

  // GET Requests 
  if (req.method === "GET") {
    
    // Get ALl Users
    if (req.url === "/api/users") 
    {
      db.query("SELECT * FROM customer_user", (error, result) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error }));
          return;
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return;
        }
      });
      return;
    }
    // Get Admin
    else if (req.url === "/api/admin") 
    {
      db.query("SELECT * FROM admin", (error, result) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error }));
          return;
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return;
        }
      });
      return;
    }
    // Get all Employees
    else if (req.url === "/api/employees") 
    {
      db.query("SELECT * FROM employees", (error, result) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error }));
          return;
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          return;
        }
      });
      return;
    }
    // Get ALl Customers
    else if (req.url === "/api/customers") 
    {
      db.query(
        "SELECT * FROM customer",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
            return;
          } else {
             res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            return;
          }
        }
      );
      return;
    }
    // Get ALL packages
    else if (req.url === "/api/package") 
    {
      db.query(
        "SELECT * FROM package",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
            return;
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            return;
          }
        }
      );
      return;
    }
    // Get ALL transactions
    else if (req.url === "/api/transaction") 
    {
      db.query(
        "SELECT * FROM transaction",
        (error, result) => {
          if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error }));
            return;
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            return;
          }
        }
      );
      return;
    }
  }
  else if (req.method === "POST") {
    if (req.url === "/api/register") {
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
                    return;
                  } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ message: "User has signed up successfully" }));
                    return;
                  }
              }
          );
          return;
      });
    }
    else if (req.url === "/api/login") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      
      req.on("end", () => {
        const body = JSON.parse(data);
        const username = body.username;
        const password = body.password;
        const role = body.role;
    
        // Here, make sure you are hashing and comparing passwords correctly if using hashing
        // If passwords are hashed, compare the hash of the provided password with the stored hash
        if (role === "admin") {
          db.query(
            "SELECT * FROM admin WHERE AdminUser = ?", // Make sure this table name is correct
            [username],
            (error, results) => {
              if (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
              } else {
                if (results.length > 0) {
                  const user = results[0];
                  
                  // Since we're not concerned with security for this demo, we'll check the password directly
                  if (user.AdminPass === password) { // Ensure your column names match your table's case exactly
                    // Generate token
                    const token = generateToken(user);
                    // Send user details and token in response
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      id: user.AdminID,
                      username: user.AdminUser,
                      email: user.Email,
                      token: token // Ensure generateToken is defined and returns a valid token
                    }));
                    return;
                  } else {
                    // Password does not match
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Wrong username or password" }));
                    return;
                  }
                } else {
                  // No user found
                  res.writeHead(401, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: "Wrong username or password" }));
                  return;
                }
              }
            }
          );
        }
        else if(role === "Employee"){
          db.query(
            "SELECT * FROM employee WHERE CustomerUser = ?",
            [username],
            (error, results) => {
              if (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
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
                    return;
                  } else {
                    // Password does not match
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Wrong username or password" }));
                    return;
                  }
                } else {
                  // No user found
                  res.writeHead(401, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: "Wrong username or password" }));
                  return;
                }
              }
            }
          );
        }
        else{
          db.query(
            "SELECT * FROM customer_user WHERE CustomerUser = ?",
            [username],
            (error, results) => {
              if (error) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
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
                    return;
                  } else {
                    // Password does not match
                    res.writeHead(401, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Wrong username or password" }));
                    return;
                  }
                } else {
                  // No user found
                  res.writeHead(401, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: "Wrong username or password" }));
                  return;
                }
              }
            }
          );
        }
        return;
      });
    }
    
  }
  else if(req.method == "DELETE") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");
    return;
  }
  if (!req.url.startsWith("/api")) {
    // Serve static files or index.html for non-API requests
    const basePath = path.join(__dirname, '../client/build');
    let filePath = path.join(basePath, req.url);

    // Check if the file exists and is not a directory
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        // If the file doesn't exist or is a directory, serve index.html
        filePath = path.join(basePath, 'index.html');
      }

      // Determine the content type
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeType[ext] || 'application/octet-stream';

      // Serve the file
      serveFile(filePath, contentType, res);
    });

    return; // Important to return here to avoid further processing
  }
  
});

const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
