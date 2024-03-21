const http = require('http'); // Import the built-in HTTP module
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const url = require('url');
const { v4: uuidv4 } = require('uuid');


const fs = require('fs');

const db = mysql.createConnection(
{
    host: 'post-office-web-database.mysql.database.azure.com',
    user: 'postofficeadmin',
    password: 'D@tabase123',
    database: 'mydb',
    port: 3306,
    ssl: {ca: fs.readFileSync('C:\\Users\\rayya.DESKTOP-92F6ECR\\.ssh\\DigiCertGlobalRootCA.crt.pem')}
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

  if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
  }
};

const server = http.createServer( async (req, res) => {
  // Handle Cors Function To Allow Axios
  handleCors(req, res);

  // GET Requests 
  if (req.method === "GET") {
    if (req.url === "/") {
      res.setHeader('Content-Type', 'text/html');
      res.write('<html><head><title>Hello, World!</title></head><body><h1>Hello, World!</h1></body></html>');
      res.end();
    }
    // Get ALl Users
    else if (req.url === "/users") 
    {
      db.query(
        "SELECT * FROM customer_user",
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

      req.on("end", () => {
          const body = JSON.parse(data);
          const userid = body.userid;
          const firstname = body.firstname;
          const lastname = body.lastname; 
          const username = body.username;
          const password = body.password;
          const phoneNumber = body.phoneNumber;
          const email = body.email;
          const dateSignup = body.dateSignup; 
          const role = body.role;
          const address = body.address;
          
          db.query(
            "INSERT INTO customer_user (UserID, CustomerUser, CustomerPass, Email, firstname, lastname, address, phonenumber, dateSignedUp, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [userid, firstname, lastname, email, username, password, address, phoneNumber, dateSignup, role],
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
  }
  else if(req.method == "DELETE") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");
  }
});

const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
