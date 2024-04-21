# Post Office Database Application

This comprehensive web application, built with React, Node.js, and MySQL, is designed to facilitate efficient management of postal services. It integrates essential functionalities for package tracking, user management, and inventory alerts, ensuring a seamless operational flow within a postal or courier service environment.

## Key Features

### User Roles
- **Admin**: Manages all aspects of the post office, including handling users, packages, stock levels, and accessing detailed reports.
- **Employee (Service Clerk, Driver, Manager)**: Manages the status of packages, takes care of vehicles, and helps with daily operations.
- **Customer**: Sends packages, tracks them, and gets updates when packages are delivered.

### Data Management
The application provides various forms allowing users to interact with and manage different types of data efficiently. Here’s what can be added, modified, or edited through these forms:

- **Register User Account**: Add new user accounts to the database.
- **Send Package**: Register packages for delivery with initial status settings.
- **Package Status**: Update the status of packages, such as changing from Pending to In Transit, Delivered, or Lost. Also allows for assigning or modifying the vehicle associated with the delivery using a dropdown menu.
- **Edit Profile**: Users can edit their profiles with options to update personal and login information.
- **Manage Customers**: Add new customers to the system or delete existing ones.
- **Employee Management**: Add new employees or assign existing users new roles within the employee hierarchy.
- **Vehicle Management**: Vehicles can be added, edited, or deleted. Assign vehicles to employees or modify their assignment through a dropdown menu.

### Semantic Constraints
- **Automated Notifications**: Customers get automatic messages when their packages are delivered, which helps improve communication and satisfaction.
- **Inventory Alerts**: Admins get notified if the stock of supplies drops too low, helping them refill items as needed.

### Reports
- **Sales Report**: Shows a summary and detailed view of transactions, which can be adjusted to display information from any chosen date range. This helps analyze sales effectively.
- **Package Report**: Keeps track of how packages are moving and their delivery success, which can be seen over selected periods. This helps understand how well the operations are running.
- **User Sign-Up Report**: Shows how many new users have signed up, selectable by year and month, and provides a list of these new users to track growth and user uptake.

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