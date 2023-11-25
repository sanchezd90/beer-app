import React, { useState, useEffect } from 'react';
import './App.css';
import html2canvas from 'html2canvas';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    dob: '',
    instagram: '',
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    if (!formData.name || !formData.id || !formData.dob || !formData.instagram) {
      setErrorMessage('Please fill in all fields');
      return false;
    }

    if (formData.id.length < 7 || formData.id.length > 8) {
      setErrorMessage('ID should be 7 or 8 digits');
      return false;
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    if (age < 18) {
      setErrorMessage('You must be 18 years or older');
      return false;
    }

    return true;
  };

  const generateCode = () => {
    if (validateForm()) {
      const newCode = generateUniqueCode();
      setGeneratedCode(newCode);
      saveDataToLocalhost();
      setFormSubmitted(true);
    }
  };

  const saveDataToLocalhost = () => {
    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('formSubmissionTime', new Date().toISOString());
  };

  const generateUniqueCode = () => {
    return 'ABC123'; // Replace with actual code generation logic
  };

  const downloadCodeAsJPG = () => {
    const generatedCodeDiv = document.getElementById('generated-code-div');
  
    html2canvas(generatedCodeDiv).then((canvas) => {
      // Convert canvas to JPEG image
      const imageData = canvas.toDataURL('image/jpeg');
  
      // Create a link and trigger the download
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'generated_code.jpg';
      link.click();
    });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedSubmissionTime = localStorage.getItem('formSubmissionTime');

    if (storedUserData && storedSubmissionTime) {
      const lastSubmissionTime = new Date(storedSubmissionTime);
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      if (lastSubmissionTime > twentyFourHoursAgo) {
        // Show last generated code
        setGeneratedCode(generateUniqueCode());
        setFormSubmitted(true);
      } else {
        // Clear local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('formSubmissionTime');
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="App">
      <h1>Code Generator</h1>
      {!formSubmitted ? (
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
          <div>
            <label>Instagram:</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button type="button" onClick={generateCode}>
            Generate Code
          </button>
        </form>
      ) : (
        <div id="generated-code-div">
          <h2 >Generated Code</h2>
          <p>{generatedCode}</p>
          <button type="button" onClick={downloadCodeAsJPG}>
            Download Code as JPG
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
