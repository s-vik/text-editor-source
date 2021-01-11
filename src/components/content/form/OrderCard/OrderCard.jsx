import React from "react";
import "./order_card.css";

const OrderCard = (props) => {
  return (
    <div className="order_container">
      <div className="order">
        <div className="price_container">
          <div className="total_price"> {props.totalPrice} грн</div>
          <div className="deadline">
            {props.deadLine === 0 ? null : props.deadLine}
          </div>
        </div>
        <button
          disabled={!props.language}
          className={"calculate_button" + " hover_button"}
        >
          Замовити
        </button>
      </div>
    </div>
  );
};
export default OrderCard;
