import React from "react";
import "./language.css";

const ChooseLanguage = (props) => {
  return (
    <section className="language">
      <h3>МОВА</h3>
      <div className="choice_language">
        <div className="language_button">
          <input
            onClick={props.languageHandler}
            type="radio"
            id="ua"
            name="language"
            value="Українська"
          />
          <label htmlFor="ua">Українська</label>
        </div>

        <div className="language_button">
          <input
            onClick={props.languageHandler}
            type="radio"
            id="ru"
            name="language"
            value="Російська"
          />
          <label htmlFor="ru">Російська</label>
        </div>

        <div className="language_button">
          <input
            onClick={props.languageHandler}
            type="radio"
            id="eng"
            name="language"
            value="Англійська"
          />
          <label htmlFor="eng">Англійська</label>
        </div>
      </div>
    </section>
  );
};

export default ChooseLanguage;
