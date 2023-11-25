import React, { useState, useEffect } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    dob: "",
    instagram: "",
  });
  const [generatedCode, setGeneratedCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.id ||
      !formData.dob ||
      !formData.instagram
    ) {
      setErrorMessage("Please fill in all fields");
      return false;
    }

    if (formData.id.length < 7 || formData.id.length > 8) {
      setErrorMessage("ID should be 7 or 8 digits");
      return false;
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dobDate.getFullYear();

    if (age < 18) {
      setErrorMessage("You must be 18 years or older");
      return false;
    }

    return true;
  };

  const generateCode = () => {
    if (validateForm()) {
      const storedCode = localStorage.getItem("generatedCode");

      if (storedCode) {
        setGeneratedCode(storedCode);
      } else {
        const newCode = generateUniqueCode();
        setGeneratedCode(newCode);
        localStorage.setItem("generatedCode", newCode);
      }

      saveDataToLocalhost();
      setFormSubmitted(true);
    }
  };

  const saveDataToLocalhost = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    localStorage.setItem("formSubmissionTime", new Date().toISOString());
  };

  const generateUniqueCode = () => {
    return uuidv4();
  };

  const downloadCodeAsJPG = async () => {
    const generatedCodeDiv = document.getElementById("generated-code-div");

    // Set background color to ensure proper rendering
    generatedCodeDiv.style.backgroundColor = "#F5F5DC";

    // Wait for a short delay to ensure elements are fully rendered
    await new Promise((resolve) => setTimeout(resolve, 500));

    html2canvas(generatedCodeDiv).then((canvas) => {
      // Reset background color to its original state
      generatedCodeDiv.style.backgroundColor = "";

      // Convert canvas to JPEG image
      const imageData = canvas.toDataURL("image/jpeg");

      // Create a link and trigger the download
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "generated_code.jpg";
      link.click();
    });
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedSubmissionTime = localStorage.getItem("formSubmissionTime");

    if (storedUserData && storedSubmissionTime) {
      const lastSubmissionTime = new Date(storedSubmissionTime);
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      if (lastSubmissionTime > twentyFourHoursAgo) {
        setGeneratedCode(localStorage.getItem("generatedCode"));
        setFormSubmitted(true);
      } else {
        localStorage.removeItem("userData");
        localStorage.removeItem("formSubmissionTime");
        localStorage.removeItem("generatedCode");
      }
    }
  }, []);

  return (
    <Container className="App" id="generated-code-div">
      <h1 style={{ color: "#FF6F61", backgroundColor:'#F5F5DC', margin:'0px', padding: "20px 20px", borderTopLeftRadius:'10px',borderTopRightRadius:'10px' }}>Beer Coupon</h1>
      <div className="main-container">
        {!formSubmitted ? (
          <Form className="my-form">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label style={{ color: "#34495e" }}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="my-input"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formID">
                  <Form.Label style={{ color: "#34495e" }}>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    className="my-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formDob">
                  <Form.Label style={{ color: "#34495e" }}>
                    Date of Birth
                  </Form.Label>
                  <div className="date-picker-container">
                    <Form.Control
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      className="my-input"
                    />                    
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formInstagram">
                  <Form.Label style={{ color: "#34495e" }}>
                    Instagram
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                    className="my-input"
                  />
                </Form.Group>
              </Col>
            </Row>
            {errorMessage && (
              <p className="error-message" style={{ color: "#e74c3c" }}>
                {errorMessage}
              </p>
            )}
            <Button
              className="my-button"
              variant="primary"
              type="button"
              onClick={generateCode}
              style={{
                backgroundColor: "#FF6F61",
                border: "none",
                marginBottom: "20px",
              }}
            >
              Generate Code
            </Button>
          </Form>
        ) : (
          <Card>
            <Card.Body>
              <div>
                <h2 style={{ color: "#FF6F61" }}>User Data</h2>
                <p>
                  <strong>Name:</strong>{" "}
                  {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")).name}
                </p>
                <p>
                  <strong>ID:</strong>{" "}
                  {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")).id}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")).dob}
                </p>
                <p>
                  <strong>Instagram:</strong>{" "}
                  {localStorage.getItem("userData") &&
                    JSON.parse(localStorage.getItem("userData")).instagram}
                </p>
                <h2 style={{ color: "#FF6F61" }}>Generated Code</h2>
                <p>{generatedCode}</p>
              </div>
              <Button
                variant="success"
                type="button"
                onClick={downloadCodeAsJPG}
                style={{ backgroundColor: "#FF6F61", border: "none" }}
              >
                Download Code as JPG
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </Container>
  );
};

export default App;
