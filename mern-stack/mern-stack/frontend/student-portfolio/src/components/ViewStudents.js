import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/student/view');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await axios.delete(`/student/delete/${id}`);
      setMessage(res.data.message || 'Student deleted successfully');
      fetchStudents(); // Refresh list
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting student:', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="card">
      <h2>📋 All Students ({students.length})</h2>

      {message && <div className="alert alert-success">{message}</div>}

      {students.length === 0 ? (
        <div className="empty-state">
          <span style={{ fontSize: '3rem' }}>🎓</span>
          <p>No students found. Add a new student to get started!</p>
        </div>
      ) : (
        <div className="students-grid">
          {students.map((student) => (
            <div key={student._id} className="student-card">
              <h3>{student.name}</h3>
              <span className="badge">{student.course}</span>
              <p>📧 {student.email}</p>
              {student.skills && <p>🛠 {student.skills}</p>}
              {student.about && <p style={{ marginTop: '8px', fontStyle: 'italic', color: '#888' }}>{student.about}</p>}
              <div className="card-actions">
                <button className="btn btn-warning" onClick={() => handleEdit(student._id)}>✏️ Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(student._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewStudents;
