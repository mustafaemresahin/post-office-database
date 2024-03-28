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

const db = mysql.createPool({
  host: 'post-office-web-database.mysql.database.azure.com',
  user: 'postofficeadmin',
  password: 'D@tabase123',
  database: 'mydb',
  port: 3306,
  // You can add connection pool specific options here (refer to official docs)
  // connectionLimit: 10, // Maximum number of connections in the pool (default: 10)
  // queueLimit: 0, // Maximum number of queued requests for the pool (default: 0 - no limit)
  // waitForConnections: true, // Whether to wait for a connection if the pool is full (default: true)
});

// connect to database
db.getConnection((err) => {
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

    // get ALL vehicles
    else if (req.url === "/api/vehiclelist") {
      db.query(
      "SELECT * FROM vehicles",
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
    }
  }
  else if (req.method === "PUT") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");
 
 
    // Update A USEr
    if (pathSegments.length === 3 && pathSegments[1] === "users"){
      const UserID = pathSegments[2];
 
      let data ="";
      req.on("data", (chunk) => {
        data+=chunk;
      });
      req.on("end", () => {
        const body = JSON.parse(data);
 
 
        db.query(
          "UPDATE users SET 'Email' = ?, 'firstname'= ?, 'lastname'= ?, 'address'= ?, 'phonenumber' = ?,  WHERE 'UserID'= ?",
          [body.Email, body.firstname, body.lastname, body.address, body.phonenumber, UserID],
          (error) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'User has been updated successfully' }));
          }
          }
        )
      })
    }
  }
 
  else if (req.method === "POST") {
    if (req.url === "/api/adminAdd") {
      let data = "";
      req.on("data",(chunk) => {
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
        const role = body.role;
        const address = body.address;
        

        db.query(
          "INSERT INTO customer_user (UserID, CustomerUser, CustomerPass, Email, firstname, lastname, address, phonenumber, dateSignedUp, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [userid, username, password, email, firstname, lastname, address, phoneNumber, dateSignup, role],
            (error) => {
                if (error) {
                  console.log('Insertion error:' , error);
                  res.writeHead(500, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({error: "Do we get this far?"}));
                  return;
                } else {
                  res.writeHead(200, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({ message: "User has signed up successfully" }));
                  return;
                }
              }
        )
      }); 
    }
    else if (req.url === "/api/register") {
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
    else if (req.url === "/api/sentPackages") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

      req.on("end", () => {
        const body = JSON.parse(data);
        const PackageID = uuidv4().substring(0,10);
        const Weight = parseFloat(body.weight);
        const dimensionsStr = `${body.length} x ${body.width} x ${body.height}`;
        const Type = body.packageType;
        const Status = 'Pending';
        const DateSent = formattedDate;
        const VehicleID = null; //we dont have vehicles yet so just leaving this blank, will prolly cause error
        const destinationAddress = body.address;
        const expedited = body.expeditedShipping;
        const SenderID = "595b8a0b-c";
        const recipientFirstName = body.recipientFirstName;
        const recipientLastName = body.recipientLastName;
        let cost = 0;
        cost = parseFloat(dimensionsStr) + parseFloat(Weight) + parseFloat(expedited);
        
        if (Type === "parcel") {
          cost += 5; // Additional cost for parcel
        } else if (Type === "envelope") {
          cost += 1; // Discount for envelope
        } else if (Type === "oversized") {
          cost += 10; // Additional cost for oversized
        }

        //console.log({PackageID, SenderID, Weight, Dimensions, Type, Status, DateSent, VehicleID, destinationAddress, expedited, recipientFirstName, recipientLastName, cost});

        db.query(
          "INSERT INTO package (PackageID, SenderID, Weight, Dimensions, Type, Status, DateSent, VehicleID, destination, expeditedShipping, recipientFirstName, recipientLastName, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [PackageID, SenderID, Weight, dimensionsStr, Type, Status, DateSent, VehicleID, destinationAddress, expedited, recipientFirstName, recipientLastName, cost],
          (error) => 
          {
            if (error) {
              console.log(error);
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({error: "Do we get this far?"}));
              return;
            } else {
              res.writeHead(200, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ message: "Package submitted successfully" }));
              return;
            }
          }
        );
        return;
      });
    }
    
    // API for adding a vehicle
    else if (req.url === "/api/vehicleadd") {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const vehicle = JSON.parse(body);
        const vehicleID = uuidv4().substring(0, 10);
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const location = vehicle.location;
        const status = vehicle.status;
        const type = vehicle.type;
        const unit = vehicle.unit;
        const employeeID = vehicle.employeeID;
    
        // query to check employeeID
        db.query(
          "SELECT * FROM employee WHERE EmployeeID = ?",
          [employeeID],
          (error, result) => {
            if (error) {
              console.error('Database error:', error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Employee query Error' }));
              return;
            } else if (result.length === 0) {
              // if employeeID not found in employee table
              res.writeHead(400, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Invalid employeeID' }));
              return;
            } else {
              // if employeeID is valid, starts inserting vehicle
              db.query(
                "INSERT INTO vehicles (VehicleID, Timestamp, Location, Status, Type, Unit, EmployeeID) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [vehicleID, timestamp, location, status, type, unit, employeeID],
                (insertError) => {
                  if (insertError) {
                    console.error('Insertion error:', insertError);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: 'Failed to add vehicle' }));
                    return;
                  } else {
                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: 'Vehicle added successfully' }));
                    return;
                  }
                }
              );
            }
         }
        );
      });
    }

    else if (req.url === "/api/package/delete"){
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const data = JSON.parse(body);
        const packageID = data.packageID;
    
        // query to check employeeID
        db.query(
          "DELETE FROM package WHERE PackageID = ?",
          [packageID],
          (error) => {
            if (error) {
              console.error('Package deletion error:', insertError);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Failed to remove package' }));
              return;
            } else {
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: 'Package deleted successfully' }));
              return;
            }
          }
        );
      });
    }

  }
  else if(req.method === "DELETE") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");

      // Delete A User
      if (pathSegments.length === 4 && pathSegments[2] === "users") {
          const UserID = pathSegments[3];

          db.query(
              "DELETE FROM customer_user WHERE UserID = ?",
              [UserID],
              (error) => {
                  if (error) {
                      res.writeHead(500, {"Content-Type": "application/json"});
                      res.end(JSON.stringify({error: error}));
                  } else {
                      res.writeHead(200, {"Content-Type": "application/json"});
                      res.end(JSON.stringify({ message: "User has been deleted successfully" }));
                  }
              }
          );
      }
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
