# Post Office Database Application

This repository contains the source code and all necessary files for the Post Office Database application, built using React, Node.js, and MySQL. This web application is designed to manage postal services, including package tracking, user management, and inventory notifications.

## Features

The application supports three primary user roles:
- **Admin:** Manages packages, users, inventory, and accesses reports.
- **Employee (Service Clerk, Driver, Manager):** Manages package statuses and vehicles.
- **Customer:** Sends packages, views tracking history, and receives notifications.

### Data Management
- **Users** can be added, modified, and deleted.
- **Packages** can be registered, tracked, and updated with statuses such as Pending, In Transit, and Delivered.
- **Vehicles** associated with package delivery can be managed.

### Semantic Constraints
- Automatic notifications to customers when a package is delivered.
- Alerts to admin when inventory is low.

### Available Reports
- **Sales Report:** Transaction summaries and details.
- **Package Report:** Package statuses and success rates.
- **User Sign-Up Report:** Monthly signup statistics.

## Installation

### Prerequisites
- Node.js installed on your machine.
- Node.js added to your system path.

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafaemresahin/post-office-database.git
   ```

2. Navigate to the project directory:

   ```bash
   cd post-office-database
   ```

3. Install dependencies:

   ```bash
   npm install
   npm run server_modules
   npm run client_modules
   ```

4. Start the application:
   - For development:
      ```bash
      npm run dev
      ```
   - For production:
      ```bash
      npm run build
      npm run prod
      ```


## Usage

Access the hosted web application at
<a href="https://post-office-database-web-795a025bc915.herokuapp.com/home" target="_blank">Post Office Database Web Application</a>

### User Credentials
- **Admin Access:**
  - Username: johndoe_admin
  - Password: password123
- **Employee Access:**
  - Service Clerk - Username: afina | Password: afina
  - Driver - Username: ycherrer | Password: pass
- **Customer Access:**
  - Example Customer - Username: Quagmire123 | Password: 26Dosis!234
  - Presentation Customer - Username: mustafa | Password: 123

## Contributors

This project is developed and maintained by Team 8, consisting of:
- Mustafa Sahin
- Rayyan Rahman
- Yla Herrera
- Guillermo Martinez Somoza
- Afina Apayeva