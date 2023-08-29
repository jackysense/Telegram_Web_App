// Get the WebApp object
const webApp1 = window.Telegram.WebApp;

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
    ).textContent = `Hello, ${user.first_name}! You have a passkey registered.`;
  } else {
    // Show a message that says "Hello, {user.first_name}! You don't have a passkey registered yet."
    document.getElementById(
      "message"
    ).textContent = `Hello, ${user.first_name}! You don't have a passkey registered yet.`;
  }
}

// Define a function to handle the click event of the register button
function onRegisterClick() {
  // Call the createCredential method of the WebApp object to create a new passkey
  console.log("aaa");

  webApp1
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
  webApp1
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

// Get the register button and add a click event listener
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", onRegisterClick);

// Get the login button and add a click event listener
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", onLoginClick);

// Add an event listener for the init event of the WebApp object
webApp1.onInit(onInit);
