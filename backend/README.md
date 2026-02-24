# Music School Backend Server

This backend server provides two login systems: Admin and Student, built with Node.js and Express.

## Features

- Admin login system at `/api/admin/login`
- Student login system at `/api/student/login`
- Root route for server testing at `/`
- CORS enabled for all origins
- JSON request parsing

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for database operations - optional for basic functionality)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Starting the Server

### Using npm:
```bash
npm run dev
```
This will start the server with nodemon on port 5000.

### Using node directly:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Root Route (Test Server)
- **GET** `/`
- Response: `Server is running fine!`

### Admin Login
- **POST** `/api/admin/login`
- Request Body: `{"username": "admin", "password": "admin123"}`
- Success Response: `{"success": true, "message": "Admin logged in"}`
- Error Response: `{"success": false, "message": "Invalid credentials"}` (Status 401)

### Student Login
- **POST** `/api/student/login`
- Request Body: `{"studentId": "1001", "password": "student123"}`
- Success Response: `{"success": true, "message": "Student logged in"}`
- Error Response: `{"success": false, "message": "Invalid student credentials"}` (Status 401)

## Testing Frontend Login Requests

### Admin Login Example (JavaScript fetch):
```javascript
fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Login successful:', data.message);
  } else {
    console.log('Login failed:', data.message);
  }
});
```

### Student Login Example (JavaScript fetch):
```javascript
fetch('http://localhost:5000/api/student/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    studentId: '1001',
    password: 'student123'
  })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Login successful:', data.message);
  } else {
    console.log('Login failed:', data.message);
  }
});
```

## Database Integration Notes

The current implementation uses hardcoded credentials for simplicity. To replace with database queries:

### For MySQL:
1. Install MySQL driver: `npm install mysql2`
2. Create database connection
3. Replace hardcoded validation with database query:
```javascript
// Example MySQL query for admin login
const connection = require('./db'); // Your MySQL connection
const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
connection.execute(query, [username, password], (err, results) => {
  if (results.length > 0) {
    // Login successful
  } else {
    // Invalid credentials
  }
});
```

### For MongoDB:
1. Ensure Mongoose is installed: `npm install mongoose`
2. Create User model with admin/student schema
3. Replace hardcoded validation with Mongoose query:
```javascript
// Example MongoDB query for admin login
const User = require('./models/User'); // Your User model
const user = await User.findOne({ 
  username: username, 
  role: 'admin',
  password: hashedPassword // Use bcrypt to hash passwords
});
if (user) {
  // Login successful
} else {
  // Invalid credentials
}
```

## Troubleshooting

- If you get a "port in use" error, make sure no other instances of the server are running
- If CORS errors occur, verify the server is running and the frontend is making requests to the correct URL
- For database integration, ensure your database server is running before starting the backend