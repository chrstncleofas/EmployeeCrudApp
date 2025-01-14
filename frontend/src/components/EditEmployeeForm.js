import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployeeForm = ({ fetchEmployees }) => {
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
  const [loading, setLoading] = useState(true);
  const { id: employeeID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        console.log("Fetching employee with ID:", employeeID);
        const res = await axios.get(`http://localhost:5000/api/employees/${employeeID}`);
        console.log("Employee data:", res.data);  // Check what data you're receiving
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employee:", err.response ? err.response.data : err.message);
        setLoading(false);
        // Display a user-friendly error message
      }
    };
    fetchEmployee();
  }, [employeeID]);
  

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
      await axios.put(`http://localhost:5000/api/employees/${employeeID}`, data);
      fetchEmployees();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h6 className="mb-4">Update Record</h6>
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
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </>
  );
};

export default EditEmployeeForm;
