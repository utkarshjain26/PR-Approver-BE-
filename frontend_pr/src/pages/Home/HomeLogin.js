import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const HomeLogin = () => {
  return (
    <div className="home-body">
      <h1 className="home-heading">Current Requests</h1>
      <div className="home-show-btn">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Link to="/pull-request">
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: "10px 30px", textTransform:'none', fontSize:'18px' }}
            >
              Pending
            </Button>
          </Link>
          <Link to="/pull-request-approved">
            <Button variant="contained" color="primary" sx={{ padding: "10px 30px", textTransform:'none', fontSize:'18px' }}>
              Approved
            </Button>
          </Link>
          <Link to="/pull-request-rejected">
            <Button variant="contained" color="primary"  sx={{ padding: "10px 30px", textTransform:'none', fontSize:'18px' }}>
              Rejected
            </Button>
          </Link>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default HomeLogin;
