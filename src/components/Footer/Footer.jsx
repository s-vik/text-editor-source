import React from "react";
import "./footer.css";

const Footer = (props) => {
  return (
    <footer>
      <nav className="footer_nav">
        <ul>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">manager@correctarium.com</a>
          </li>
        </ul>
      </nav>
      <div className="language_switcher">
        <button className="lang_item">Українська</button>
        <button className="lang_item">Русский</button>
      </div>
    </footer>
  );
};
export default Footer;
