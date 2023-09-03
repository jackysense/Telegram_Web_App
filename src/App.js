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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    document.body.appendChild(script);
    const script1 = document.createElement("script");
    script1.src = "test.js";
    script1.async = true;
    document.body.appendChild(script1);
  }, []);

  const htmlDecode = (html) => {
    return html.replace(/&([a-z]+);/gi, (match, entity) => {
      const entities = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: "\xa0",
        quot: '"',
      };
      entity = entity.toLowerCase();
      if (entities.hasOwnProperty(entity)) {
        return entities[entity];
      }
      return match;
    });
  };

  const scriptCode = `<script>
  // Get the WebApp object
  const webApp = window.Telegram.WebApp;

  // Define a function to handle the init event
  function onInit(event) {
    // Get the user data and the chat data from the event
    const user = event.user;
    const chat = event.chat;

    // Log the user and chat data to the console
    console.log("User:", user);
    console.log("Chat:", chat);

    // Check if the user has a passkey registered
    if (user.has_passkey) {
      // Show a message that says "Hello, {user.first_name}! You have a passkey registered."
      document.getElementById(
        "message"
      ).textContent = "Hello, "+user.first_name+"! You have a passkey registered.";
    } else {
      // Show a message that says "Hello, {user.first_name}! You don't have a passkey registered yet."
      document.getElementById(
        "message"
      ).textContent = "Hello, "+user.first_name+"! You don't have a passkey registered yet.";
    }
  }

  // Define a function to handle the click event of the register button
  function onRegisterClick() {
    console.log('aaa')
    // Call the createCredential method of the WebApp object to create a new passkey
    webApp
      .createCredential()
      .then((credential) => {
        // Log the credential to the console
        console.log("Credential:", credential);

        // Show a message that says "You have successfully created a new passkey!"
        document.getElementById("message").textContent =
          "You have successfully created a new passkey!";
      })
      .catch((error) => {
        // Log the error to the console
        console.error("Error:", error);

        // Show a message that says "Something went wrong. Please try again."
        document.getElementById("message").textContent =
          "Something went wrong. Please try again.";
      });
  }

  // Define a function to handle the click event of the login button
  function onLoginClick() {
    // Call the getCredential method of the WebApp object to get an existing passkey
    webApp
      .getCredential()
      .then((credential) => {
        // Log the credential to the console
        console.log("Credential:", credential);

        // Show a message that says "You have successfully logged in with your passkey!"
        document.getElementById("message").textContent =
          "You have successfully logged in with your passkey!";
      })
      .catch((error) => {
        // Log the error to the console
        console.error("Error:", error);

        // Show a message that says "Something went wrong. Please try again."
        document.getElementById("message").textContent =
          "Something went wrong. Please try again.";
      });
  }

  // Add an event listener for the init event of the WebApp object
  webApp.onInit(onInit);

  // Get the register button and add a click event listener
  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", onRegisterClick);

  // Get the login button and add a click event listener
  const loginButton = document.getElementById("login");
  loginButton.addEventListener("click", onLoginClick);
</script>`;

  return (
    <>
      <h1 className="heading"> {test.toString()}</h1>
      <h1>
        {`is In IFrame ${!!(
          window.parent != null && window !== window.parent
        )}`}
      </h1>
      <h1>Telegram Web App Bot Example</h1>
      <p id="message">Loading...</p>
      <button id="register">Register Passkey</button>
      <button id="login">Login with Passkey</button>
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
      <br /> <br />
      <a
        href="https://web-authn-test-nine.vercel.app/"
        style={{ color: "#fff" }}
      >
        open test in webapp
      </a>
      <br /> <br />
      <a href="tg://resolve?domain=mraabot" style={{ color: "#fff" }}>
        finished
      </a>
      <br /> <br />
      <a href="https://app.uniswap.org/#/swap" style={{ color: "#fff" }}>
        uniswap
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
