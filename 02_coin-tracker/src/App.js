import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [value, setValue] = useState([0, 0]);
  const [currency, setCurrency] = useState(0);
  const [coinList, setCoinList] = useState([]);
  const [targetCoin, setTargetCoin] = useState(["", 0]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoinList(json);
        setTargetCoin([json[0].name, json[0].quotes.USD.price]);
      });

    fetch(
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    )
      .then((response) => response.json())
      .then((json) => setCurrency(json[0].cashBuyingPrice));
  }, []);

  const onFocusInput = (event) => {
    setInputValue("");
  };

  const onChangeInput = (event) => {
    if (event.target.value === "") return;
    const currentValue = parseFloat(event.target.value);
    setInputValue(currentValue);
    setValue([currentValue, currentValue / currency]);
  };

  const onChangeCoin = (event) => {
    const [name, price] = event.target.value.split(",");
    setTargetCoin([name, parseFloat(price)]);
  };

  return (
    <div className="App">
      {" "}
      <h1 className="title">#2 Coin Tracker</h1>
      <div className="displayContainer">
        {inputValue
          ? `📢 ${inputValue.toLocaleString()}원으로 ${targetCoin[0]} ${(
              value[1] / targetCoin[1]
            ).toFixed(2)}개 구매 가능합니다.`
          : `금액을 입력해주세요!`}
      </div>
      <form>
        <label htmlFor="wonInput">
          <span className="highlight">금액(won)</span>을 입력하세요!💵
        </label>
        <div className="inputContainer">
          <select onChange={onChangeCoin} required>
            {coinList.map((coin) => (
              <option
                value={`${coin.name},${coin.quotes.USD.price}`}
                key={coin.id}
              >
                {coin.name} ${coin.quotes.USD.price.toLocaleString()}
              </option>
            ))}
          </select>
          <input
            onFocus={onFocusInput}
            onChange={onChangeInput}
            value={inputValue}
            id="wonInput"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default App;
