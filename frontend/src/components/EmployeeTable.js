import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeTable = ({ employees, fetchEmployees }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();  // Refresh employee list after delete
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Initialize all tooltips after the component mounts
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl); // Initialize tooltips
    });
  }, []);

  return (
    <table className="table table-striped table-bordered mt-4">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Username</th>
          <th>Country</th>
          <th>Email</th>
          <th>Account Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>
              {employee.photo && (
                <img
                  src={`http://localhost:5000/${employee.photo}`}
                  alt="Profile"
                  width="50"
                  style={{ borderRadius: '50%' }}
                />
              )}
            </td>
            <td>{`${employee.firstName} ${employee.lastName}`}</td>
            <td>{employee.username}</td>
            <td>{employee.country}</td>
            <td>{employee.email}</td>
            <td>{employee.accountType}</td>
            <td>
              {/* Edit Button with Tooltip */}
              <Link
                to={`/employees/${employee._id}`}
                className="btn btn-warning btn-sm me-2"
                data-bs-toggle="tooltip"
                title="Edit Employee"
              >
                <i className="fas fa-edit"></i>
              </Link>

              {/* Delete Button with Tooltip */}
              <button
                onClick={() => handleDelete(employee._id)}
                className="btn btn-danger btn-sm"
                data-bs-toggle="tooltip"
                title="Delete Employee"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
