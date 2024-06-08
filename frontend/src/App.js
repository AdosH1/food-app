import React, { useState } from 'react';

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_input: inputValue }),
    };

    try {
      const res = await fetch('http://localhost:8081/meal-plan', requestOptions);
      const contentType = res.headers.get('Content-Type');
      const text = await res.text();  // Read the response as text

      console.log(text);  // Log the response text

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = JSON.parse(text);  // Parse the text as JSON
        setResponseData(data.answer || data);  // Handle different JSON structures
      } else {
        setResponseData(text);  // Handle raw text response
      }
      setError(null);
    } catch (error) {
      setError('Error: ' + error.message);
      setResponseData(null);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>What do you want to make?</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter here!"
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
      {responseData && (
        <div style={styles.responseContainer}>
          <h2>Response from server:</h2>
          <pre style={styles.response}>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("/path/to/your/background-image.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    zIndex: 2,
  },
  header: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  responseContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
  },
  response: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    marginTop: '20px',
    color: 'red',
  }
};

export default UserInput;
