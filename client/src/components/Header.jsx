import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice.js";
import { Button } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const valid = userInfo !== null && userInfo.verified;
  {
    /* Need to clean up this code, this ugly asl */
  }
  {
    /* Does work tho */
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {valid ? (
            <>
              <LinkContainer to="/dashboard">
                <Navbar.Brand>Boiler Pal</Navbar.Brand>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="/">
                <Navbar.Brand>Boiler Pal</Navbar.Brand>
              </LinkContainer>
            </>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {valid ? (
                <>
                  <LinkContainer to="/menu">
                    <Nav.Link>Dining Menu</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to='/building-info'>
                    <Nav.Link>Building Info</Nav.Link>
                  </LinkContainer>

                  {/* <LinkContainer to="/vending">
                    <Nav.Link>Vending Machines</Nav.Link>
                  </LinkContainer> */}

                  <NavDropdown title="Vending" id="nav-dropdown">
                    <LinkContainer to="/vending">
                      <NavDropdown.Item>Pharmacy</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/foodVending">
                      <NavDropdown.Item>Food</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <NavDropdown title="Routing" id="nav-dropdown">
                    <LinkContainer to="/routing">
                      <NavDropdown.Item>Navigation</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/routeplan">
                      <NavDropdown.Item>Route for Today</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <LinkContainer to="/calendar">
                    <Nav.Link>Calendar</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/gpa-calc">
                    <Nav.Link>GPA Calculator</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/retail">
                    <Nav.Link>Retail Dining</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/bustimes">
                    <Nav.Link>Bus Schedule</Nav.Link>
                  </LinkContainer>
                  <Button
                    onClick={() => {
                      window.location.assign("http://localhost:5173/chat");
                    }}
                  >
                    <ChatBubbleOutlineIcon />
                    <pre>AI_Chat</pre>
                  </Button>

                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
