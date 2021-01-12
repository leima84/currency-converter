import React, { useState, useEffect } from "react";
import { getExchangeRate } from "./API";

function App() {
  const [result, setResult] = useState();
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState();
  const [base, setBase] = useState();
  const [converto, setConverto] = useState();
  const [currencies, setcurrencies] = useState([]);

  useEffect(() => {
    getExchangeRate().then((data) => {
      setDate(data.date);
      setBase(Object.keys(data.rates)[0]);
      setConverto(Object.keys(data.rates)[0]);
      setcurrencies(Object.keys(data.rates));
    });
  }, []);

  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {
      getExchangeRate().then((data) => {
        const result = (
          (data.rates[converto] / data.rates[base]) *
          amount
        ).toFixed(4);
        setResult(result);
        setDate(data.date);
        setcurrencies(Object.keys(data.rates));
      });
    }
  }, [base, converto, amount]);

  function handleClick(e) {
    e.preventDefault();
    const prior_base = base;
    const prior_converto = converto;
    setBase(prior_converto);
    setConverto(prior_base);
  }
  function handleAmount(e) {
    return setAmount(e.target.value);
  }
  function handleConvert(e) {
    return setConverto(e.target.value);
  }

  function handleSelect(e) {
    return setBase(e.target.value);
  }
  function handleSelect2(e) {
    return setConverto(e.target.value);
  }
  return (
    <>
      <h1>
        {amount} {base} is equevalent to
      </h1>
      <h3>
        {amount === "" ? "0" : result === null ? "Calculating..." : result}
        {converto}
      </h3>
      <h3> As of {amount === "" ? "/ / /" : date === null ? "" : date}</h3>

      <input type="number" value={amount} onChange={handleAmount} />
      <select name="base" value={base} onChange={handleSelect}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
      <input type="number" value={result} onChange={handleConvert} />
      <select name="converto" value={converto} onChange={handleSelect2}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <br></br>

      <button onClick={handleClick}>Swap</button>
    </>
  );
}

export default App;
