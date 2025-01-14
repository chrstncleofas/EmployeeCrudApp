import axios from 'axios';
import EmployeeTable from './EmployeeTable';
import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const filteredEmployees = employees.filter((employee) => {
    // Filter employees by firstname, lastname, or other fields based on search query
    return employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           employee.username.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Employee Records</h1>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  {/* Show per page */}
                  <select 
                    className="form-control w-auto"
                    value={perPage}
                    onChange={handlePerPageChange}
                  >
                    <option value="10">Show 10</option>
                    <option value="20">Show 20</option>
                    <option value="30">Show 30</option>
                    <option value="40">Show 40</option>
                    <option value="50">Show 50</option>
                  </select>

                  {/* Search field */}
                  <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="form-control w-auto"
                    style={{ width: "300px" }} // Adjust width of search input
                  />

                  {/* Add Employee Button */}
                  <Link to="/add-employee" className="btn btn-primary"><i className="fas fa-plus me-2"></i> Add Employee</Link>
                </div>
                {/* Employee Table with filtered employees */}
                <EmployeeTable
                  employees={filteredEmployees.slice(0, perPage)} // Show filtered employees
                  fetchEmployees={fetchEmployees}
                />
              </div>
            }
          />
          <Route
            path="/add-employee"
            element={<AddEmployeeForm fetchEmployees={fetchEmployees} />}
          />
          <Route
            path="/employees/:id"
            element={<EditEmployeeForm fetchEmployees={fetchEmployees} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
