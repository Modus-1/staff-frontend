import { useNavigate } from "react-router-dom";
import "../styling/landingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="lp-main-content">
      <div className="lp-header">Select your role.</div>
      <div className="lp-button-container">
        <button className="lp-button" onClick={() => navigate("/kitchen")}>
          Kitchen
        </button>
        <button className="lp-button" onClick={() => navigate("/waiter")}>
          Waiter
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
