import { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    skills: '',
    about: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('/student/add', formData);
      setMessage(res.data.message || 'Student Added Successfully!');
      setFormData({ name: '', email: '', course: '', skills: '', about: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student. Please try again.');
    }
  };

  return (
    <div className="card">
      <h2>➕ Add New Student</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Course / Branch *</label>
          <input
            type="text"
            name="course"
            placeholder="e.g. B.Tech Computer Science"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g. React, Node.js, Python"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea
            name="about"
            placeholder="Brief description about the student..."
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
