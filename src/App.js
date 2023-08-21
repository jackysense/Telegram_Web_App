import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [test, setTest] = useState("");

  useEffect(() => {
    tele.ready();
  });

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    alert(
      !!(
        navigator.credentials &&
        navigator.credentials.create &&
        navigator.credentials.get &&
        window.PublicKeyCredential
      )
    );
    setTest(
      `Has window.PublicKeyCredential? ${!!window.PublicKeyCredential} PasswordCredential?${!!window.PasswordCredential}`
    );
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  };

  return (
    <>
      <h1 className="heading"> {test.toString()}</h1>
      <h1>
        {`is In IFrame ${!!(
          window.parent != null && window !== window.parent
        )}`}
      </h1>
      <button
        onClick={() => {
          window.external.notify(
            JSON.stringify({ eventType: "webauthn", eventData: "OK" })
          );
        }}
        className="btn btn-primary"
      >
        outer Click
      </button>
      <br />
      <a href="https://example.hanko.io/" style={{ color: "#fff" }}>
        open passkey
      </a>
      <br /> <br />
      <a href="https://webauthn.io/" style={{ color: "#fff" }}>
        open webauthn
      </a>
      <br /> <br />
      <a
        href="https://webauthn.passwordless.id/demos/playground.html"
        style={{ color: "#fff" }}
      >
        passwordless
      </a>
      <br /> <br />
      <a
        href="https://telegram-web-app-2.vercel.app/"
        style={{ color: "#fff" }}
      >
        open outer
      </a>
      <br /> <br />
      <a href="https://webauthn.me/browser-support" style={{ color: "#fff" }}>
        browser-support
      </a>
      <br /> <br />
      <a
        href="https://web-authn-test-nine.vercel.app/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#fff" }}
      >
        open test in browser
      </a>
      <a
        href="https://web-authn-test-nine.vercel.app/"
        target="_blank"
        rel="noreferrer"
        style={{ color: "#fff" }}
      >
        open test in webapp
      </a>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;
