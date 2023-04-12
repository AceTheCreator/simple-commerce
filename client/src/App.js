import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sessionToken, setSessionToken] = useState("");

  //  const handleSubmit = (event) => {
  //    event.preventDefault();
  //    // Send a POST request to the server with the username and password
  //    fetch("http://localhost:5000/events", {
  //      method: "POST",
  //      headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //      body: `username=${username}&password=${password}`,
  //    }).catch((error) => console.error(error));
  //  };

  // Listen for SSE events and handle the session token when it is received
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/events");
    eventSource.addEventListener("message", (event) => {
      try {
        console.log(event)
        const sessionToken = event.data;
        setSessionToken(sessionToken);
      } catch (error) {
        console.log(error);
      }
      // Handle the session token here
      // ...
    });
    return () => eventSource.close();
  }, []);

  return (
    <div className="App">
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
