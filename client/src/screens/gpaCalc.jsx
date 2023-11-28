import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./GpaCalc.css"; // Import the custom CSS

function GpaCalc() {
  const [grades, setGrades] = useState([{ class: "", grade: "", credit: "" }]);

  const [errors, setErrors] = useState({});

  const [calculatedGpa, setCalculatedGpa] = useState(null);
  const [gpaError, setGpaError] = useState(null);

  const [targetGpa, setTargetGpa] = useState(4.0);
  const [additionalCredits, setAdditionalCredits] = useState(0);
  const [requiredGrade, setRequiredGrade] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const clearAllClasses = () => {
    setGrades([{ class: "", grade: "", credit: "" }]);
    setCalculatedGpa(null);
    setGpaError(null);
    setRequiredGrade(null);
    setTotalCredits(0);
    setTotalPoints(0);
  };

  const calculateRequiredGrade = () => {
    let totalPointsNeeded = targetGpa * (totalCredits + additionalCredits);
    console.log(targetGpa, totalCredits, additionalCredits, totalPointsNeeded);
    let additionalPointsNeeded = totalPointsNeeded - totalPoints;
    console.log(totalPointsNeeded, additionalPointsNeeded);
    let averageGradeNeeded = additionalPointsNeeded / additionalCredits;

    if (averageGradeNeeded > 4.0) {
      setRequiredGrade("Not achievable");
    } else {
      let closestGrade = Object.keys(gradePoints).reduce((prev, curr) => {
        return Math.abs(gradePoints[curr] - averageGradeNeeded) <
          Math.abs(gradePoints[prev] - averageGradeNeeded)
          ? curr
          : prev;
      });
      setRequiredGrade(closestGrade);
    }
  };

  useEffect(() => {
    if (calculatedGpa !== null) {
      calculateRequiredGrade();
    }
  }, [targetGpa, additionalCredits, calculatedGpa]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...grades];
    const errorMessages = { ...errors };

    // Validation logic
    if (name === "class") {
      const classFormatRegex = /^[A-Za-z]+ \d+$/;
      if (!classFormatRegex.test(value)) {
        errorMessages[`class${index}`] =
          'must be in format "ClassID ClassCode" eg. "CSC 101".';
      } else {
        delete errorMessages[`class${index}`];
      }
    }

    if (name === "credit") {
      const creditNumber = parseInt(value, 10);
      if (
        !Number.isInteger(creditNumber) ||
        creditNumber < 1 ||
        creditNumber > 5
      ) {
        errorMessages[`credit${index}`] =
          "Credits must be a whole number between 1 and 5.";
      } else {
        delete errorMessages[`credit${index}`];
      }
    }

    list[index][name] = value;
    setGrades(list);
    setErrors(errorMessages);
  };

  const handleAddClick = () => {
    setGrades([...grades, { class: "", grade: "", credit: "" }]);
  };

  const handleRemoveClick = (index) => {
    const list = [...grades];
    list.splice(index, 1);
    setGrades(list);
  };

  // Mapping of grades to GPA points
  const gradePoints = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let computedTotalPoints = 0,
      computedTotalCredits = 0,
      isEmptyField = false;
    grades.forEach((gradeEntry) => {
      if (!gradeEntry.class || !gradeEntry.grade || !gradeEntry.credit) {
        isEmptyField = true;
        return;
      }

      const points = gradePoints[gradeEntry.grade];
      const credits = parseInt(gradeEntry.credit, 10);
      computedTotalPoints += points * credits;
      computedTotalCredits += credits;
    });

    if (isEmptyField) {
      // Handle error for empty fields
      setGpaError("All fields must be filled.");
      setCalculatedGpa(null);
      return;
    }

    if (computedTotalCredits === 0) {
      // Handle error for zero total credits
      setGpaError("Total credits cannot be zero.");
      setCalculatedGpa(null);
      return;
    }

    setTotalPoints(computedTotalPoints);
    setTotalCredits(computedTotalCredits);

    const gpa = computedTotalPoints / computedTotalCredits;
    setCalculatedGpa(gpa);
    // Reset error
    setGpaError(null);

    // Further steps for graph and credit points calculation...
  };

  return (
    <Container fluid className="gpa-calc-container">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit} className="gpa-calc-form">
            <h2 className="text-center">GPA Calculator</h2>
            {grades.map((x, i) => {
              return (
                <Row key={i} className="mb-3 grade-row">
                  <Col>
                    <Form.Control
                      className="input-field"
                      name="class"
                      placeholder="Enter Class"
                      value={x.class}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    {errors[`class${i}`] && (
                      <Alert variant="danger">{errors[`class${i}`]}</Alert>
                    )}
                  </Col>
                  <Col>
                    <Form.Select
                      className="input-field"
                      name="grade"
                      value={x.grade}
                      onChange={(e) => handleInputChange(e, i)}
                    >
                      <option value="">Select Grade</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="B-">B-</option>
                      <option value="C+">C+</option>
                      <option value="C">C</option>
                      <option value="C-">C-</option>
                      <option value="D+">D+</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Control
                      className="input-field"
                      name="credit"
                      type="number"
                      placeholder="Enter Credit Hours"
                      value={x.credit}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    {errors[`credit${i}`] && (
                      <Alert variant="danger">{errors[`credit${i}`]}</Alert>
                    )}
                  </Col>
                  <Col>
                    {grades.length !== 1 && (
                      <Button
                        variant="outline-danger"
                        className="action-button"
                        onClick={() => handleRemoveClick(i)}
                      >
                        Remove
                      </Button>
                    )}
                    {grades.length - 1 === i && (
                      <Button
                        variant="outline-primary"
                        className="action-button"
                        onClick={handleAddClick}
                      >
                        + Class
                      </Button>
                    )}
                  </Col>
                </Row>
              );
            })}
            <Button variant="primary" type="submit" className="submit-button">
              Calculate GPA
            </Button>
            <Button
              variant="danger"
              className="mt-3 align-center"
              onClick={clearAllClasses}
            >
              Clear All Classes
            </Button>
          </Form>
          {gpaError && <Alert variant="danger">{gpaError}</Alert>}
          {calculatedGpa !== null && (
            <>
              <Alert variant={calculatedGpa >= 3.0 ? "success" : "danger"}>
                Your GPA is: {calculatedGpa.toFixed(2)}
              </Alert>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="targetGpa">
                      <Form.Label>Select Target GPA</Form.Label>
                      <Form.Select
                        value={targetGpa}
                        onChange={(e) => setTargetGpa(e.target.value)}
                      >
                        {[
                          3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0,
                        ].map((gpa) => (
                          <option key={gpa} value={gpa}>
                            {gpa}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="additionalCredits">
                      <Form.Label>Additional Credits</Form.Label>
                      <Form.Control
                        type="number"
                        value={additionalCredits}
                        onChange={(e) =>
                          setAdditionalCredits(
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              {requiredGrade && (
                <Alert variant="info">
                  {requiredGrade === "Not achievable"
                    ? "Target GPA not achievable with current performance."
                    : `Need an average grade of ${requiredGrade} in future courses.`}
                </Alert>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default GpaCalc;
