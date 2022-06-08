import "./footer.css";
import { FaTwitter } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";

export function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_content">
        <div className="upper_content">
          <div>About Morning VIBES</div>
          <div>Terms Of Use</div>
          <div>Privacy Policy</div>
          <div>FAQ</div>
          <div>Feedback</div>
        </div>
        <div className="lower_content">
          © 2022 VIBES. All Rights Reserved. HBO, Home Box Office and all
          related channel and programming logos are service marks of, and all
          related programming visuals and elements are the property of, Home Box
          Office, Inc. All rights reserved.
        </div>
      </div>

      <div className="social_content">
        <div className="social_upper_content">Connect with us</div>
        <div className="social_logo">
          <FaTwitter className="twitter" />
          <GrFacebookOption className="facebook" />
        </div>
      </div>
    </div>
  );
}
