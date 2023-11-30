import React, { useState } from 'react';
import "./Accordion.css"
import Accordion from 'react-bootstrap/Accordion';


const AccordionRetail = ({ title, content }) => {

  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
          {content}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>reviews</Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionRetail;