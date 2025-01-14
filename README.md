
# Employee Management System

This is an Employee Management application built with a **MERN Stack** (MongoDB, Express.js, React, Node.js). It allows admins to manage employee records, including adding, editing, and deleting employees. The frontend is built with React and styled with Bootstrap, while the backend is powered by Express.js and connected to a MongoDB database.

## Features
- Add, edit, and delete employee records.
- Manage employee information such as name, username, email, contact details, etc.
- Upload employee profile photos.
- Fully responsive UI built with React and Bootstrap.

---

## Table of Contents
1. [Technologies](#technologies)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [License](#license)

---

## Technologies

- **Frontend**:
  - React.js
  - Bootstrap
  - Axios
  - Yarn (Package Manager)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Multer (File Upload)

---

## Backend Setup

Follow the steps below to set up and run the backend part of the application.

### 1. Clone the repository
```bash
git clone https://github.com/chrstncleofas/EmployeeCrudApp.git
cd employee-management/backend
```

### 2. Install dependencies
Ensure you have `npm` installed. Run the following command to install the backend dependencies:
```bash
npm install
```

### 3. Set up environment variables
You need to set up a `.env` file in the backend folder to store your MongoDB URI and other sensitive information:

Create a `.env` file:
```bash
MONGODB_URI=mongodb+srv://tian1227:tian1227@employeedb.tjbso.mongodb.net/?retryWrites=true&w=majority&appName=employeedb
PORT=5000
```

### 4. Start the backend server
You can start the backend in one of two ways:

- Using `npm start` (preferred):
  ```bash
  npm start
  ```

- Or, you can directly run `server.js` using Node.js:
  ```bash
  node server.js
  ```

Both methods will run the backend server on `http://localhost:5000`.

---

## Frontend Setup

Follow the steps below to set up and run the frontend part of the application.

### 1. Navigate to the frontend directory
```bash
cd employee-management/frontend
```

### 2. Install dependencies
Make sure you have `Yarn` installed, then run the following command to install the frontend dependencies:
```bash
yarn install
```

### 3. Start the frontend server
To start the frontend development server, run:
```bash
yarn start
```

This will start the frontend on `http://localhost:3000`.

---

## Running the Application

1. **Run the Backend**:
   - Follow the [Backend Setup](#backend-setup) section to start the backend server.

2. **Run the Frontend**:
   - Follow the [Frontend Setup](#frontend-setup) section to start the frontend server.

Once both servers are running, the application will be accessible in your browser at:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

