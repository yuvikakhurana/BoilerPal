import { Container, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./dash.css";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const TempDash = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isPurdueEmail = userInfo.email.endsWith("@purdue.edu");

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-dark w-75">
          <h1 className="text-center mb-4 text-light">Welcome to BoilerPal <WavingHandIcon fontSize="large"/></h1>
          {isPurdueEmail ? (
            <div>
              <a href="https://purdue.brightspace.com/d2l/login" target="_blank">
              <button class="glow-on-hover m-2" type="button">
                BrightSpace <MenuBookIcon/>
              </button>
              </a>
              <a href="https://wl.mypurdue.purdue.edu" target="_blank">
              <button class="glow-on-hover m-2" type="button">
                myPurdue <CalendarMonthIcon/>
              </button>
              </a>
              <a href="https://purdue.campus.eab.com/" target="_blank">
              <button class="glow-on-hover m-2" type="button">
                BoilerConnect <GroupsIcon/>
              </button>
              </a>
            </div>
          ) : (
            <p className="text-center mb-4 text-white">
              Temporary Dashboard page
            </p>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default TempDash;
