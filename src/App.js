import React, { useState, useEffect } from "react";
import "./App.css";
import moment from "moment-timezone";
import Header from "./components/Header/Header";
import MakeOrder from "./components/content/form/MakeOrder/MakeOrder";
import ChooseLanguage from "./components/content/form/Language/ChooseLanguage";
import Feedback from "./components/content/form/Feedback/Feedback";
import OrderCard from "./components/content/form/OrderCard/OrderCard";
import Footer from "./components/Footer/Footer";
import getDeadlineDate from "./utility/getDeadlineDate";

const App = () => {
  const priceOptions = {
    ua: {
      symbolsPerHour: 1333,
      pricePerSing: 0.05,
      minimumCost: 50,
    },
    ru: {
      symbolsPerHour: 1333,
      pricePerSing: 0.05,
      minimumCost: 50,
    },
    eng: {
      symbolsPerHour: 333,
      pricePerSing: 0.12,
      minimumCost: 120,
    },
  };
  const [textareaValue, setTextareaValue] = useState();
  const [quantitySymbols, setQuantitySymbols] = useState(0);
  const [language, setLanguage] = useState(null);
  const [deadLine, setDeadLine] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let workTime;
    if (language !== null) {
      workTime =
        quantitySymbols < language.symbolsPerHour
          ? 1
          : quantitySymbols / language.symbolsPerHour + 0.5;
      setTotalPrice(
        language.minimumCost >
          Math.ceil(quantitySymbols * language.pricePerSing)
          ? language.minimumCost
          : Math.ceil(quantitySymbols * language.pricePerSing)
      );
      if (quantitySymbols === 0) {
        setDeadLine(0);
        setTotalPrice(0);
        return;
      }
      setDeadLine(
        moment
          .tz(getDeadlineDate(moment(), workTime), "Europe/Kiev")
          .format("Термін виконання: DD.MM.YY o H:mm")
      );
    }
  }, [language, quantitySymbols]);

  const submit = (event) => {
    event.preventDefault();
  };
  const languageHandler = (e) => {
    setLanguage(priceOptions[e.target.id]);
  };
  const onChange = (e) => {
    setQuantitySymbols(e.target.value.length);
    setTextareaValue(e.target.value);
  };
  return (
    <div className="App">
      <Header />
      <main className="grid">
        <div className="content">
          <form
            name="makeOrder"
            onSubmit={submit}
            className="calculate_price_form"
          >
            <div className="calculate_price_sections">
              <MakeOrder
                textareaValue={textareaValue}
                onChange={onChange}
                quantitySymbols={quantitySymbols}
              />
              <ChooseLanguage languageHandler={languageHandler} />
              <Feedback />
            </div>
            <OrderCard
              totalPrice={totalPrice}
              deadLine={deadLine}
              language={language}
            />
          </form>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
