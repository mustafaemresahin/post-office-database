const http = require('http'); // Import the built-in HTTP module
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const util = require('util');

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.pricePerItem;
  }, 0);
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      cart: user.cart, 
      role: user.role
    },
    'postofficeproject',
    {
      expiresIn: '30d',
    }
  );
};

const db = mysql.createPool({
  host: 'localhost',
  // host: 'post-office-web-database.mysql.database.azure.com',
  user: 'root',
  password: 'A.Kkill5524u',
  database: 'mydb',
  port: 3306,
  // You can add connection pool specific options here (refer to official docs)
  // connectionLimit: 10, // Maximum number of connections in the pool (default: 10)
  // queueLimit: 0, // Maximum number of queued requests for the pool (default: 0 - no limit)
  // waitForConnections: true, // Whether to wait for a connection if the pool is full (default: true)
});
db.queryAsync = util.promisify(db.query).bind(db);
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

    // api for filling out profile efit fields, not working :)
    else if (req.url.startsWith("/api/users/")) {
    const parts = req.url.split('/');
    const userID = parts[parts.length - 1];
    {
      db.query("SELECT Email, firstname, lastname, address, phonenumber FROM customer_user WHERE UserID = ?",
      [userID],
       (error, result) => {
        if (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error }));
          return;
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
          //console.log(result);
          return;
        }
      });
      return;
    }}
  
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
      db.query("SELECT * FROM employee", (error, result) => {
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
    else if (req.url.startsWith("/api/trackpackages")) {
      // Extract the tracking number from the query string
      const url = new URL(req.url, `http://${req.headers.host}`);
      const trackingNumber = url.searchParams.get("trackingNumber");
  
      // Check if trackingNumber is provided
      if (!trackingNumber) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Tracking number is required" }));
          return;
      }
  
      // Database query to select records based on trackingNumber
      db.query(
          "SELECT * FROM trackinghistory WHERE TrackingID = ?",
          [trackingNumber],  // Use parameterized query to prevent SQL injection
          (error, result) => {
              if (error) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "Database error" }));
                  return;
              }
              if (result.length === 0) {
                  res.writeHead(404, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: "No tracking information found" }));
                  return;
              }
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(result));
              return;
          }
      );
      return;
  }
  
    // Get ALL packages
    else if (req.url === "/api/package") 
    {
      db.query(
        "SELECT * FROM package ORDER BY DateSent DESC;",
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

    else if (req.url === "/api/trackinghistory") 
    {
      db.query("SELECT * FROM trackinghistory ORDER BY Timestamp DESC;", (error, result) => {
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
    // Get ALL transactions
    else if (req.url === "/api/transaction") 
    {
      db.query(
        "SELECT * FROM transaction  ORDER BY TransactionDate DESC;",
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

    else if (req.url === "/api/departments"){
      db.query(
        "SELECT * FROM deparments",
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

    else if (req.url === "/api/employeesanddepartments"){
      db.query(
        "SELECT e.EmployeeID, e.Fname, e.Lname, e.Phone, e.Email, e.DepartmentID, d.Address as DepartmentAddress, d.OperatingHours FROM employee e JOIN deparments d ON e.DepartmentID = d.DeparmentsID;",
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

    else if (req.url === "/api/vehiclesandemployees"){
      db.query(
        "SELECT v.VehicleID, v.Location, v.Status, v.Type, e.EmployeeID, e.Fname, e.Lname, e.Phone FROM vehicles v JOIN employee e ON v.EmployeeID = e.EmployeeID;",
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

    else if (req.url === "/api/packagesender"){
      db.query(
        "SELECT p.PackageID, p.SenderID, p.Weight, p.Dimensions, p.Type, p.Status, p.DateSent, p.destination, cu.CustomerUser, cu.firstname, cu.lastname, cu.Email FROM package p JOIN customer_user cu ON p.SenderID = cu.UserID;",
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
      return;
    }

    else if (req.url === ("/api/vehicleSelect")) {
 
      db.query(
          "SELECT v.VehicleID, e.Fname, e.Lname, v.Type FROM mydb.employee as e, mydb.vehicles as v WHERE e.EmployeeID = v.EmployeeID",
          (error, result) => {
              if (error) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: error }));
                  return;
              } else {
                  if (result.length === 0) {
                      res.writeHead(404, { "Content-Type": "application/json" });
                      res.end(JSON.stringify({ error: 'Vehicle not found' }));
                      return;
                  }
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(result)); 
                  return;
              }
          }
      );
      return;
    }
    // get all employees that are drivers
    else if (req.url === '/api/employeeDrivers'){
      db.query(
        "SELECT Fname, Lname, EmployeeID FROM employee WHERE Role = 'Driver' ",
        (error, result) => {
            if (error) {
                //console.log('oof');
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: error }));
                return;
            } else {
                if (result.length === 0) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: 'Drivers not found' }));
                    return;
                }
                //console.log('Drivers found:', result);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(result)); 
                return;
            }
        }
    );
    return;
    }

    else if (req.url === "/api/cart_items") 
    {
      db.query("SELECT * FROM cart_items", 
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
      });
      return;
    }
    else if (req.url === "/api/storeitem") 
    {
      db.query("SELECT * FROM storeitem", 
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
      });
      return;
    }
    else if (req.url === "/api/cart") {
      db.query(
        "SELECT * FROM cart",
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
    else if(req.url === "/api/notify") {
      db.query(
        "SELECT * FROM notifications ORDER BY timestamp DESC;" ,
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
    // Queries/Reports
    else if(req.url === "/api/amountforallusers") {
      db.query(
        "SELECT c.UserID, c.firstname,  c.lastname, c.Email, SUM(t.TotalAmount) AS TotalSpent FROM customer_user AS c JOIN transaction AS t ON c.CartID = t.CartID GROUP BY c.UserID, c.firstname, c.lastname, c.Email;" ,
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
    else if(req.url === "/api/packageinfo") {
      db.query(
        "SELECT c.UserID, c.firstname,  c.lastname, c.Email, COUNT(p.PackageID) AS TotalPackages,SUM(CASE WHEN p.status = 'Pending' THEN 1 ELSE 0 END) AS PendingPackages, SUM(CASE WHEN p.status = 'Accepted' THEN 1 ELSE 0 END) AS AcceptedPackages, SUM(CASE WHEN p.status = 'Delivered' THEN 1 ELSE 0 END) AS DeliveredPackages FROM customer_user AS c JOIN package AS p ON c.UserID = p.SenderID GROUP BY c.UserID, c.firstname, c.lastname, c.Email;" ,
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
    else if(req.url === "/api/employeepackage") {
      db.query(
        "SELECT e.EmployeeID, e.Fname, e.Minit, e.Lname, e.Email, e.Phone, v.Type, COUNT(p.PackageID) AS TotalPackages FROM employee AS e JOIN vehicles AS v ON e.EmployeeID = v.EmployeeID JOIN package AS p ON v.VehicleID = p.VehicleID GROUP BY e.EmployeeID, v.VehicleID" ,
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
    else if(req.url.startsWith("/api/sales")) {
      const reqUrl = new URL(req.url, `http://${req.headers.host}`);
      const startDate = reqUrl.searchParams.get('startDate');
      const endDate = reqUrl.searchParams.get('endDate');
  
      const summaryQuery = "SELECT TransactionType, COUNT(*) AS NumberOfTransactions, SUM(TotalAmount) AS TotalRevenue, AVG(TotalAmount) AS AverageTransactionValue FROM transaction WHERE TransactionDate BETWEEN ? AND ? GROUP BY TransactionType;";
  
      const detailQuery = `
          SELECT t.TransactionID, t.TransactionDate, t.TotalAmount, t.TransactionType, 
                 cu.UserID, cu.firstname, cu.lastname, cu.Email 
          FROM transaction t
          JOIN customer_user cu ON t.CartID = cu.CartID
          WHERE t.TransactionDate BETWEEN ? AND ?
          ORDER BY t.TransactionDate ASC;
      `;
  
      db.query(summaryQuery, [startDate, endDate], (error, summaryResult) => {
          if (error) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: error.toString() }));
              return;
          }
  
          db.query(detailQuery, [startDate, endDate], (error, detailResult) => {
              if (error) {
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: error.toString() }));
                  return;
              }
  
              const response = {
                  salesSummary: summaryResult,
                  transactionDetails: detailResult,
              };
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(response));
          });
      });
  }

  else if(req.url.startsWith("/api/packagereport")) {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const startDate = reqUrl.searchParams.get('startDate');
    const endDate = reqUrl.searchParams.get('endDate');

    const summaryQuery = "SELECT p.Status, COUNT(*) AS `Number of Packages`, COUNT(*) / (SELECT COUNT(*) FROM `package` WHERE DateSent BETWEEN ? AND ?) * 100 AS `Percentage of Total Packages` FROM `package` p WHERE p.DateSent BETWEEN ? AND ? GROUP BY p.Status ORDER BY `Number of Packages` DESC;";

    db.query(summaryQuery, [startDate, endDate, startDate, endDate], (error, summaryResult) => {
        if (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.toString() }));
            return;
        }

      const response = {
          packagesSummary: summaryResult,
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
}
  
else if(req.url.startsWith("/api/monthlysignups")) {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const year = reqUrl.searchParams.get('year');
  const month = reqUrl.searchParams.get('month');

  const countQuery = `
    SELECT COUNT(*) AS TotalSignUps
    FROM customer_user
    WHERE DATE_FORMAT(dateSignedUp, '%Y-%m') = ?;
  `;

  const usersQuery = `
    SELECT firstname, lastname, CustomerUser, Email, dateSignedUp
    FROM customer_user
    WHERE DATE_FORMAT(dateSignedUp, '%Y-%m') = ?
    ORDER BY dateSignedUp;
  `;

  // First, get the total signups count
  db.query(countQuery, [`${year}-${month}`], (error, countResults) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }

    // Then, get the list of users who signed up
    db.query(usersQuery, [`${year}-${month}`], (error, usersResults) => {
      if (error) {
        return res.status(500).json({ error: error.toString() });
      }

      const response = {
        totalSignUps: countResults[0].TotalSignUps,
        users: usersResults
      };
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    });
  });
} 

else if (req.url.startsWith("/api/packagesbystatus")){
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const startDate = reqUrl.searchParams.get('startDate');
  const endDate = reqUrl.searchParams.get('endDate');
  const status = reqUrl.searchParams.get('status');

  const statusQuery = `SELECT Status, DateSent, Type, Destination, firstname, lastname, recipientFirstname, recipientLastname
                       FROM package
                       JOIN customer_user ON package.SenderID = customer_user.UserID
                       WHERE Status = ? AND DateSent BETWEEN ? AND ?;`;

  db.query(statusQuery, [status, startDate, endDate], (error, packageResults) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error.toString() }));
      return;
    }
  
    const response = {
      packages: packageResults
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
  });
}
  

  }
  else if (req.method === "PUT") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");
 
 
    // Update A USEr
    // if (pathSegments.length === 4 && pathSegments[2] === "users"){
    //   const UserID = pathSegments[3];
 
    //   let data ="";
    //   req.on("data", (chunk) => {
    //     data+=chunk;
    //   });
    //   req.on("end", () => {
    //     const body = JSON.parse(data);
 
 
    //     db.query(
    //       "UPDATE users SET 'Email' = ?, 'firstname'= ?, 'lastname'= ?, 'address'= ?, 'phonenumber' = ?,  WHERE 'UserID'= ?",
    //       [body.Email, body.firstname, body.lastname, body.address, body.phonenumber, UserID],
    //       (error) => {
    //         if (error) {
    //           res.writeHead(500, { 'Content-Type': 'application/json' });
    //           res.end(JSON.stringify({ error: 'Internal Server Error' }));
    //       } else {
    //           res.writeHead(200, { 'Content-Type': 'application/json' });
    //           res.end(JSON.stringify({ message: 'User has been updated successfully' }));
    //       }
    //       }
    //     )
    //   })
    // }

    // profile edit api
    if (req.url.startsWith("/api/profileEdit/")) {
      const parts = req.url.split('/');
      const userID = parts[parts.length - 1];
      
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const user = JSON.parse(body);
        let sql = "UPDATE customer_user SET";
        const params = [];
        // putting each const in here
    
        // checking to see if input is empty before putting in the params array
        const { Email, firstname, lastname, address, phonenumber } = user;
        if (Email !== undefined && Email !== '') {
          sql += " Email = ?,";
          params.push(Email);
        }
        if (firstname !== undefined && firstname !== '') {
          sql += " firstname = ?,";
          params.push(firstname);
        }
        if (lastname !== undefined && lastname !== '') {
          sql += " lastname = ?,";
          params.push(lastname);
        }
        if (address !== undefined && address !== '') {
          sql += " address = ?,";
          params.push(address);
        }
        if (phonenumber !== undefined && phonenumber !== '') {
          sql += " phonenumber = ?,";
          params.push(phonenumber);
        }
        if (sql.slice(-1) === ',') {
          sql = sql.slice(0, -1);
        }
        sql += " WHERE UserID = ?";
        // Add the userID to the params array
        params.push(userID);
    
        // Updating profile
        db.query(
          sql,
          params,
          (updateError) => {
            if (updateError) {
              console.error('Update error:', updateError);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Failed to update profile' }));
              return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'Profile updated successfully' }));
          }
        );
      });
    }

    else if (req.url.startsWith("/api/vehicleEdit/")) {
      const parts = req.url.split('/');
      const vehicleID = parts[parts.length - 1];
      
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const vehicle = JSON.parse(body);
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let sql = "UPDATE vehicles SET Timestamp = ?";
        const params = [timestamp];
        // putting each const in here
    
        // checking to see if input is empty before putting in the params array
        // had to do it like this or else blanks were placed in the DB
        const { location, status, unit } = vehicle;
        if (location !== undefined && location !== '') {
          sql += ", Location = ?";
          params.push(location);
        }
        if (status !== undefined && status !== '') {
          sql += ", Status = ?";
          params.push(status);
        }
        if (unit !== undefined && unit !== '') {
          sql += ", Unit = ?";
          params.push(unit);
        }
        sql += " WHERE VehicleID = ?";
        // Add the vehicleID to the params array
        params.push(vehicleID);
    
        // Updating vehicle
        db.query(
          sql,
          params,
          (updateError) => {
            if (updateError) {
              console.error('Update error:', updateError);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: 'Failed to update vehicle' }));
              return;
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'Vehicle updated successfully' }));
          }
        );
      });
    }

    // update status on packages
    else if (pathSegments.length === 4 && pathSegments[2] === "userspackages"){
      const PackageID = pathSegments[3];
      //console.log(PackageID)
      let data ="";
      req.on("data", (chunk) => {
        data+=chunk;
      });
      req.on("end", () => {
        const body = JSON.parse(data);
        const newStatus = body.Status;
        console.log(newStatus);
        console.log(PackageID);

        db.query(
          "SELECT Status FROM package WHERE PackageID = ?",
          [PackageID],
          (error, results) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
              return;
            }
            
            const currentStatus = results[0].Status;
            
            // If current status is 'Delivered', do not update
            if (currentStatus === 'Delivered') {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Cannot change status once delivered' }));
              return;
            }
    
 
 
            db.query(
              "UPDATE package SET Status = ? WHERE PackageID = ?",
              [newStatus, PackageID],
              (updateError) => {
                if (updateError) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Package status has been updated successfully' }));
                }
              }
            );
          }
        );
      });
    }
    // update VehicleID on packages, does not work
   else if (pathSegments.length === 4 && pathSegments[2] === "packageToVehicle"){
    const PackageID = pathSegments[3];
    let data ="";
    req.on("data", (chunk) => {
      data+=chunk;
    });
    req.on("end", () => {
      const body = JSON.parse(data);
      const vehicleID = body.VehicleID; // Updated to use VehicleID
      console.log(vehicleID);
      console.log(PackageID);
  
      db.query(
        "UPDATE package SET VehicleID = ? WHERE PackageID = ?", // Updated to set VehicleID
        [vehicleID, PackageID],
        (error) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'package status has been updated successfully' }));
          }
        }
      );
      return;
    });
  }

  // select driver for vehicle
  else if (pathSegments.length === 4 && pathSegments[2] === "vehiclelist"){
    const vehicleID = pathSegments[3];
    let data ="";
    req.on("data", (chunk) => {
      data+=chunk;
    });
    req.on("end", () => {
      const body = JSON.parse(data);
      const driverID = body.EmployeeID;
      //console.log(driverID);
      //console.log(vehicleID);


      db.query(
        "UPDATE vehicles SET EmployeeID = ? WHERE VehicleID = ?",
        [driverID, vehicleID],
        (error) => {
          if (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Vehicle driver designated successfully' }));
          }
        }
      );
      return;
    });
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
        const role = 'User';
        const address = body.address;
        const cartid = uuidv4().substring(0,20);

        db.query(
          "INSERT INTO customer_user (UserID, CustomerUser, CustomerPass, Email, firstname, lastname, address, phonenumber, dateSignedUp, role, CartID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [userid, username, password, email, firstname, lastname, address, phoneNumber, dateSignup, role, cartid],
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
    else if (req.url === "/api/employeeadd") {
      let data = "";
      req.on("data",(chunk) => {
        data += chunk;
      });
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
      req.on("end", () => {
        const body = JSON.parse(data);
        const employeeid = uuidv4().substring(0, `10`);
        const fname = body.fname;
        const minit = body.minit;
        const lname = body.lname;
        const ssn = body.ssn;
        const dob = body.dob;
        const phone =  body.phone;
        const email = body.email;
        const address = body.address;
        const sex = body.sex;
        const salary = body.salary;
        const role = body.role;
        const hiredate = formattedDate;
        const schedule = null;
        const departmentid = null; 

        db.query(
          "INSERT employee (EmployeeID, Fname, Minit, Lname, Ssn, Dob, Phone, Email, Address, Sex, Salary, role, HireDate, Schedule, DepartmentID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [employeeid, fname, minit, lname, ssn, dob, phone, email, address, sex, salary, role, hiredate, schedule, departmentid],
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
    else if (req.url === "/api/register") 
    {
      let data = "";
      req.on("data", (chunk) => {
          data += chunk;
      });
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
      req.on("end", () => 
      {
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
          const CartID = uuidv4().substring(0,20);
          
          db.query
          (
            "INSERT INTO customer_user (UserID, CustomerUser, CustomerPass, Email, firstname, lastname, address, phonenumber, dateSignedUp, role, CartID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [userid, username, password, email, firstname, lastname, address, phoneNumber, dateSignup, role, CartID],
              (error) => 
              {
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
                    cart: user.CartID,
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
        return;
      });
    }
    else if (req.url === '/api/cart_items/add') {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        const body = JSON.parse(data);
        const itemId = body.itemId;
        const cartId = body.cartId;
        const quantity = body.quantity || 1; // Allow optional quantity in request
    
        try {
          // Check for existing entry
          db.query("SELECT * FROM cart_items WHERE StoreItemID = ? AND CartID = ?", [itemId, cartId], (error, results) => {
            if (error) {
              console.error("Error checking for existing item:", error);
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ error: "Error adding/updating cart item" })); // More specific error message can be provided
            } else if (results.length > 0) {
              // Update quantity (existing item found)
              const existingItem = results[0];
              db.query("UPDATE cart_items SET Quantity = Quantity + ? WHERE CartItemID = ?", [quantity, existingItem.CartItemID], (updateError) => {
                if (updateError) {
                  console.error("Error updating cart item quantity:", updateError);
                  res.writeHead(500, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({ error: "Error adding/updating cart item" })); // More specific error message can be provided
                } else {
                  res.writeHead(200, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({ success: true, message: "Item quantity updated in cart" }));
                }
              });
            } else {
              // Insert new entry (no existing item found)
              const CartItemID = uuidv4().substring(0, 20);
              db.query("INSERT INTO cart_items (CartItemID, CartID, StoreItemID, Quantity) VALUES (?, ?, ?, ?)", [CartItemID, cartId, itemId, quantity], (insertError) => {
                if (insertError) {
                  console.error("Error adding new item to cart:", insertError);
                  res.writeHead(500, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({ error: "Error adding/updating cart item" })); // More specific error message can be provided
                } else {
                  res.writeHead(200, {"Content-Type": "application/json"});
                  res.end(JSON.stringify({ success: true, message: "Item added to cart successfully" }));
                }
              });
            }
          });
        } catch (error) {
          console.error("Error adding/updating cart item:", error);
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ error: "Error adding/updating cart item" })); // More specific error message can be provided
        }
      });
    }

    else if (req.url === '/api/cart_items/remove') {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        const body = JSON.parse(data);
        const itemId = body.itemId;
        const cartId = body.cartId;
        const amount = body.amount;

    
        try {
          // Check for existing entry
          db.query("SELECT * FROM cart_items WHERE StoreItemID = ? AND CartID = ?", [itemId, cartId], (error, results) => {
            if (error) {
              console.error("Error checking for existing item:", error);
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ error: "Error removing item from cart" })); // More specific error message can be provided
            } else if (results.length === 0) {
              // Item not found in cart, no need to remove
              res.writeHead(200, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ success: false, message: "Item not found in cart" }));
            } else {
              // Existing item found, decrement quantity
              const existingItem = results[0];
              const newQuantity = Math.max(existingItem.Quantity - amount, 0); // Ensure quantity doesn't go below 0

              if (newQuantity === 0) {
                // Remove item completely
                db.query("DELETE FROM cart_items WHERE CartItemID = ?", [existingItem.CartItemID], (deleteError) => {
                  if (deleteError) {
                    // Handle deletion errors
                    console.error("Error removing item from cart:", deleteError); // Handle deletion errors
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ error: "Error removing item from cart" })); // Specific error message
                  } else {
                    // Respond with success message for removal
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ success: true, message: "Item removed from cart successfully" }));
                  }
                });
              } else {
                db.query("UPDATE cart_items SET Quantity = ? WHERE CartItemID = ?", [newQuantity, existingItem.CartItemID], (updateError) => {
                  if (updateError) {
                    console.error("Error updating cart item quantity:", updateError);
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ error: "Error removing item from cart" })); // More specific error message can be provided
                  } else {
                    // Respond based on the updated quantity
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ success: true, message: "Item quantity reduced in cart" }));
                  }
                });
              }
            }
          });
        } catch (error) {
          console.error("Error removing item from cart:", error);
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ error: "Error removing item from cart" })); // More specific error message can be provided
        }
      });
    }

    else if (req.url === '/api/cart_items/update') {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        const body = JSON.parse(data);
        const itemId = body.itemId;
        const cartId = body.cartId;
        const newQuantity = Math.max(newQuantity, 0); // Ensure quantity doesn't go below 0
    
        try {
          // Update existing cart item quantity
          db.query("UPDATE cart_items SET Quantity = ? WHERE StoreItemID = ? AND CartID = ?", [newQuantity, itemId, cartId], (updateError) => {
            if (updateError) {
              console.error("Error updating cart item quantity:", updateError);
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ error: "Error updating cart item" })); // More specific error message can be provided
            } else {
              // Respond with success message
              res.writeHead(200, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ success: true, message: "updated cart item count"})); 
            }
          });
        } catch (error) {
          console.error("Error updating cart item:", error);
          res.writeHead(500, {"Content-Type": "application/json"});
          res.end(JSON.stringify({ error: "Error updating cart item" })); // More specific error message can be provided
        }
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
        const PackageID = uuidv4().substring(0,20);
        const Weight = parseFloat(body.weight);
        const dimensionsStr = `${body.length} x ${body.width} x ${body.height}`;
        const Type = body.packageType;
        const Status = 'Pending';
        const DateSent = formattedDate;
        const VehicleID = null; //we dont have vehicles yet so just leaving this blank, will prolly cause error
        const destinationAddress = body.address;
        const expedited = body.expeditedShipping;
        const SenderID = body.userId;
        const recipientFirstName = body.recipientFirstName;
        const recipientLastName = body.recipientLastName;
        const CartID = body.cartId
        let cost = 0;
        cost = parseFloat(dimensionsStr) + parseFloat(Weight) + parseFloat(expedited);
        
        if (Type === "parcel") {
          cost += 5; // Additional cost for parcel
        } else if (Type === "envelope") {
          cost += 1; // Discount for envelope
        } else if (Type === "oversized") {
          cost += 10; // Additional cost for oversized
        }
    
        db.query(
          "INSERT INTO package (PackageID, SenderID, Weight, Dimensions, Type, Status, DateSent, VehicleID, destination, expeditedShipping, recipientFirstName, recipientLastName, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [PackageID, SenderID, Weight, dimensionsStr, Type, Status, DateSent, VehicleID, destinationAddress, expedited, recipientFirstName, recipientLastName, cost],
          (error) => 
          {
            if (error) {
              console.log(error);
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({error: "Error occurred while submitting package"}));
              return;
            } else {
              // Insert into cart_items table
              const CartItemID = uuidv4().substring(0,20); 
              db.query(
                "INSERT INTO cart_items (CartItemID, CartID, PackageID, Quantity) VALUES (?, ?, ?, ?)",
                [CartItemID, CartID, PackageID, 1],
                (cartError) => {
                  if (cartError) {
                    console.log(cartError);
                    res.writeHead(500, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({error: "Error occurred while adding package to cart"}));
                    return;
                  } else {
                    res.writeHead(200, {"Content-Type": "application/json"});
                    res.end(JSON.stringify({ message: "Package submitted successfully and added to cart" }));
                    return;
                  }
                }
              );
            }
          }
        );
        return;
      });
    }
    //API for completing order
    else if (req.url === "/api/checkout") {
      let data = "";
    
      req.on("data", (chunk) => {
        data += chunk;
      });
    
      req.on("end", async () => {
        try {
          const body = JSON.parse(data); // Assume the token is sent in the request body
          const SenderID = body.userId;
          const totalAmount = body.TotalAmount;

          if (!SenderID) {
            throw new Error("Invalid or expired token");
          }
    
          // Fetch the CartID for the authenticated user
          const cartQuery = "SELECT CartID FROM customer_user WHERE UserID = ?";
          const cartResult = await db.queryAsync(cartQuery, [SenderID]);
          if (cartResult.length === 0) {
            throw new Error("No cart found for user");
          }
          const cartId = cartResult[0].CartID;
    
          // Fetch cart items, calculate total, etc.
          const cartItemsQuery = "SELECT * FROM cart_items WHERE CartID = ?";
          const cartItems = await db.queryAsync(cartItemsQuery, [cartId]);
    
          const stockUpdates = [];
        
          // Iterate over each item in the cart to check stock
          for (const item of cartItems) {
            // Check if StoreItemID is 1, 2, or 3 and is not null
            if ([1, 2, 3].includes(item.StoreItemID) && item.StoreItemID !== null) {
              try {
                const productQuery = "SELECT Inventory FROM storeitem WHERE ItemID = ?";
                const product = await db.queryAsync(productQuery, [item.StoreItemID]);
        
                if (product.length === 0) {
                  throw new Error(`Product with ID ${item.StoreItemID} not found`);
                }
        
                if (product[0].Inventory < item.Quantity) {
                  throw new Error(`Insufficient stock for product ID ${item.StoreItemID}`);
                }
        
                stockUpdates.push({
                  ProductID: item.StoreItemID,
                  NewStock: product[0].Inventory - item.Quantity,
                });
              } catch (error) {
                console.error(error); // Log any errors within this block
              }
            } else {
              // Handle package items here (assuming no stock update needed)
              console.log(`Package item: ${item.PackageID} - No stock update`);
            }
          }
        
          // Proceed with stock updates in the database for valid items
          for (const update of stockUpdates) {
            const stockUpdateQuery =
              "UPDATE storeitem SET Inventory = ? WHERE ItemID = ?";
            await db.queryAsync(stockUpdateQuery, [update.NewStock, update.ProductID]);
          }

          const transactionID = uuidv4().substring(0, 20);
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
    
          // Insert a transaction record
          const transactionQuery =
            "INSERT INTO transaction (TransactionID, CartID, TransactionDate, TotalAmount, TransactionType) VALUES (?, ?, ?, ?, ?)";
          await db.queryAsync(transactionQuery, [transactionID, cartId, formattedDate, totalAmount, "Payment"]);

          // update status to allow schema trigger to take effect
          for (const item of cartItems) {
            if (item.PackageID) {
              try {
                const updatePackageQuery = "UPDATE package SET Status = 'Accepted' WHERE PackageID = ?";
                await db.queryAsync(updatePackageQuery, [item.PackageID]);
              } catch (error) {
                console.error(`Error updating package status: ${error}`); // Log any errors
              }
            }
          }    
    
          // Respond to the client
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Checkout successful" }));
        } catch (error) {
          console.error(error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    }
    

    // API for adding a vehicle, employeeID = NULL
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

    db.query(
      "INSERT INTO vehicles (VehicleID, Timestamp, Location, Status, Type, Unit) VALUES (?, ?, ?, ?, ?, ?)",
      [vehicleID, timestamp, location, status, type, unit],
      (error) => {
        if (error) {
          console.error('Insertion error:', error);
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
  });
}
    else if(req.url === '/api/userNotifications') 
    {
      let data = "";
      req.on("data", (chunk) => {
          data += chunk;
      });
      req.on('end', () => 
      {
        const body = JSON.parse(data);
        const userID = body.userID;
        const notification_id = uuidv4().substring(0, 20);
        const message = body.message;

        db.query(
          "INSERT INTO notifications (notification_id, userID, message) VALUES (?, ?, ?)",
          [notification_id, userID, message],
          (error) => 
          {
            if (error) {
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({error: "message error"}));
            } else {
              res.writeHead(200, {"Content-Type": "application/json"});
              res.end(JSON.stringify({ message: "message has been stored successfully" }));
            }
          }
        );
      });
    }  

    else if(req.url === '/api/users/changerole'){
      let body = '';
      req.on('data', (chunk) => {
          body += chunk.toString(); // Concatenate the data chunks
      });
      req.on('end', () => {
          const user = JSON.parse(body); // Parse the received data to JSON
          const userID = user.UserID; // Use the UserID from the request body
          const setRole = user.newRole; // Set the role to 'Driver'
  
          // Update the user's role in the customer_user table
          const updateQuery = "UPDATE customer_user SET role = ? WHERE UserID = ?";
          db.query(
              updateQuery,
              [setRole, userID], // The parameters are the role and the UserID
              (updateError, updateResults) => {
                  if (updateError) {
                      console.error('Update error:', updateError);
                      res.writeHead(500, { "Content-Type": "application/json" });
                      res.end(JSON.stringify({ error: 'Failed to update user role' }));
                  } else {
                      res.writeHead(200, { "Content-Type": "application/json" });
                      res.end(JSON.stringify({ message: 'User role updated successfully' }));
                  }
              }
          );
      });
  }
  

    }    
    
  else if(req.method === "DELETE") {
    const reqURL = url.parse(req.url, true);
    const pathSegments = reqURL.pathname.split("/");

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
      
      
    else if (pathSegments.length === 5 && pathSegments[2] === "cart_item_package") {
      const PackageID = pathSegments[4];
    
      // Delete cart item using prepared statement for security
      const deleteCartItemQuery = "DELETE FROM cart_items WHERE PackageID = ?";
      db.query(deleteCartItemQuery, [PackageID], (error) => {
        if (error) {
          console.error("Error deleting cart item:", error); // Log the error for debugging
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message })); // Informative error message
          return; // Exit the callback function to prevent unnecessary package deletion
        }
    
        // Delete package upon successful cart item deletion
        const deletePackageQuery = "DELETE FROM package WHERE PackageID = ?";
        db.query(deletePackageQuery, [PackageID], (packageError) => {
          if (packageError) {
            console.error("Error deleting package:", packageError); // Log the error
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: 'Failed to remove package' }));
          } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "cart_item and package deleted successfully" }));
          }
        });
      });
    }
    
    
    else if (pathSegments.length === 4 && pathSegments[2] === "cart_items_deletion") {
      const cartId = pathSegments[3];

      // Delete cart item using prepared statement for security
      const deleteCartItemQuery = "DELETE FROM cart_items WHERE CartID = ?";
      db.query(deleteCartItemQuery, [cartId], (error) => {
        if (error) {
          console.error("Error deleting cart item:", error); // Log the error for debugging
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: error.message })); // Informative error message
          return; // Exit the callback function to prevent unnecessary package deletion
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({success: true, message: "cart_items deleted successfully" }));
        }
      });
    }
    
    // api for deleting vehicles
    else if (req.url.startsWith("/api/vehicledelete/")) 
    {
      const parts = req.url.split('/');
      const vehicleID = parts[parts.length - 1];

      db.query(
          "DELETE FROM vehicles WHERE vehicleID = ?",
          [vehicleID],
          (error) => {
              if (error) {
                  console.error('Vehicle deletion error:', error); // Corrected to use 'error'
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ error: 'Failed to remove vehicle' }));
                  return;
              } else {
                  res.writeHead(201, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ message: 'Vehicle deleted successfully' }));
                  return;
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
  
}
);

const port = process.env.PORT || 4000; // Use environment variable or default port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

