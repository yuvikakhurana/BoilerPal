import Accordion from "react-bootstrap/Accordion";
import "./menu.css";
import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import TextContent from "../components/TextContent";
import ListGroup from "react-bootstrap/ListGroup";
import Review from "./Review";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

const Buildings = () => {

  return (
     <div class="container-menu">
          <Fade left>
            <Accordion class="accordion" alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header><h6>Lawson Building</h6></Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Hours</Accordion.Header>
                      <Accordion.Body>
                        <div className="row"><table>
                                                                       <tr>
                                                                         <th>Sunday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Monday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Tuesday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Wednesday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Thursday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Friday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                       <tr>
                                                                         <th>Saturday</th>
                                                                         <td>7AM–10:30PM</td>
                                                                       </tr>
                                                                     </table>
                                                </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header><h6>WALC</h6></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                      <div className="row"><table>
                                                                     <tr>
                                                                       <th>Sunday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Monday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Tuesday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Wednesday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Thursday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Friday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                     <tr>
                                                                       <th>Saturday</th>
                                                                       <td>All Day</td>
                                                                     </tr>
                                                                   </table>
                                              </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><h6>Purdue Memorial Union (PMU)</h6></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                        <div className="row"><table>
                                               <tr>
                                                 <th>Sunday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Monday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Tuesday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Wednesday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Thursday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Friday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                               <tr>
                                                 <th>Saturday</th>
                                                 <td>6AM–12AM</td>
                                               </tr>
                                             </table>
                        </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header><h6>Mechanical Engineering</h6></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                      <div className="row"><table>
                                           <tr>
                                             <th>Sunday</th>
                                             <td>Closed</td>
                                           </tr>
                                           <tr>
                                             <th>Monday</th>
                                             <td>7AM–11PM</td>
                                           </tr>
                                           <tr>
                                             <th>Tuesday</th>
                                             <td>7AM–11PM</td>
                                           </tr>
                                           <tr>
                                             <th>Wednesday</th>
                                             <td>7AM–11PM</td>
                                           </tr>
                                           <tr>
                                             <th>Thursday</th>
                                             <td>7AM–11PM</td>
                                           </tr>
                                           <tr>
                                             <th>Friday</th>
                                             <td>7AM–7PM</td>
                                           </tr>
                                           <tr>
                                             <th>Saturday</th>
                                             <td>Closed</td>
                                           </tr>
                                         </table>
                    </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header><h6>Felix HAAS Hall</h6></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                      <div className="row"><table>
                                             <tr>
                                               <th>Sunday</th>
                                               <td>Closed</td>
                                             </tr>
                                             <tr>
                                               <th>Monday</th>
                                               <td>7AM–11PM</td>
                                             </tr>
                                             <tr>
                                               <th>Tuesday</th>
                                               <td>7AM–11PM</td>
                                             </tr>
                                             <tr>
                                               <th>Wednesday</th>
                                               <td>7AM–11PM</td>
                                             </tr>
                                             <tr>
                                               <th>Thursday</th>
                                               <td>7AM–11PM</td>
                                             </tr>
                                             <tr>
                                               <th>Friday</th>
                                               <td>7AM–7PM</td>
                                             </tr>
                                             <tr>
                                               <th>Saturday</th>
                                               <td>Closed</td>
                                             </tr>
                                           </table>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header><h6>Dudley and Lambertus Hall</h6></Accordion.Header>
              <Accordion.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                      <div className="row"><table>
                                             <tr>
                                               <th>Sunday</th>
                                               <td>Closed</td>
                                             </tr>
                                             <tr>
                                               <th>Monday</th>
                                               <td>6AM–1AM</td>
                                             </tr>
                                             <tr>
                                               <th>Tuesday</th>
                                               <td>6AM–1AM</td>
                                             </tr>
                                             <tr>
                                               <th>Wednesday</th>
                                               <td>6AM–1AM</td>
                                             </tr>
                                             <tr>
                                               <th>Thursday</th>
                                               <td>6AM–1AM</td>
                                             </tr>
                                             <tr>
                                               <th>Friday</th>
                                               <td>6AM–1AM</td>
                                             </tr>
                                             <tr>
                                               <th>Saturday</th>
                                               <td>Closed</td>
                                             </tr>
                                           </table>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
            </Accordion>
          </Fade>
        </div>

  );
};

export default Buildings;
