import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeForm = ({ fetchEmployees }) => {
  const [formData, setFormData] = useState({
    country: '',
    accountType: '',
    username: '',
    lastName: '',
    firstName: '',
    email: '',
    contactNumber: '',
  });
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (photo) data.append('photo', photo);

    try {
      await axios.post('http://localhost:5000/api/employees', data);
      fetchEmployees(); // Refresh employee list
      console.log('Employee added successfully');
      
      // Redirect to the employee list (Table page)
      navigate('/'); // Navigate to the home route (table page)
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  return (
    <>
     <h6 className="mb-4">Add Record</h6>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="form-control mb-3"
          required
        >
          <option value="" disabled>Select Country</option>
          <option value="Philippines">Philippines</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
        </select>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="form-control mb-3"
          required
        >
          <option value="" disabled>Select Account Type</option>
          <option value="Team Member">Team Member</option>
          <option value="System Administrator">System Administrator</option>
          <option value="Manager">Manager</option>
          <option value="Supervisor">Supervisor</option>
        </select>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />
        <label htmlFor="photo" className="form-label">Photo (optional)</label>
        <input
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default AddEmployeeForm;
