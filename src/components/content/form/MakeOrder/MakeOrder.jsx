import React from "react";
import "./make_order.css";

const MakeOrder = ({ textareaValue, onChange, quantitySymbols }) => {
  return (
    <section className="make_order">
      <h3 className="make_order_title">ЗАМОВИТИ РЕДАГУВАННЯ</h3>
      <p>
        Виправимо всі помилки, приберемо всі дурниці, перефразуємо невдалі
        місця, але сильно текст{" "}
        <span className="no_wrap"> не переписуватимемо.</span> Зайвих виправлень
        не буде.{" "}
        <a className="act_link" href="#">
          Детальніше про редагування
        </a>
      </p>
      <div className="requiredField">
        <input
          required
          type="text"
          className="form_field"
          placeholder="Ваша эл. почта"
        />
      </div>
      <input type="text" className="form_field" placeholder="Ваше имя" />
      <div className="form_textarea_container">
        <textarea
          value={textareaValue}
          className={"form_textarea" + " form_field"}
          onChange={onChange}
          placeholder="Уведіть текст"
        />
        <div className="quantity_symbols">{quantitySymbols}</div>
      </div>
    </section>
  );
};

export default MakeOrder;
