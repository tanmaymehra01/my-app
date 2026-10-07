import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Connects to localhost:5000 since code evaluates on client's machine outside the container network
      const response = await fetch('http://192.168.100.137:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        setIsRegistered(true);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  if (isRegistered && userData) {
    return (
      <div className="container">
        <h2>Registration Successful!</h2>
        <div className="result-card">
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
        <button onClick={() => { setIsRegistered(false); setUsername(''); setEmail(''); }}>Sign Up Another User</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>React Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
