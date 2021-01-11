import React from "react";
import logo from "../../assets/images/logo.svg";
import "./header.css";

const Header = (props) => {
  return (
    <header>
      <div className="header_container">
        <a href="#" className="logo">
          <img title="logo" src={logo} />
        </a>
        <ul className="menu">
          <a href="#">
            <li>Про нас</li>
          </a>
          <a href="#">
            <li>Ціни</li>
          </a>
          <a href="#">
            <li>Редактори</li>
          </a>
          <a href="#">
            <li>Блог</li>
          </a>
        </ul>
        <button className={"check_button" + " hover_button"}>
          Перевірити текст
        </button>
      </div>
    </header>
  );
};

export default Header;
