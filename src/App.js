import React, { useState } from "react";
import Send from "./Send";
import Receive from "./Receive";

export default function App() {
  const [view, setView] = useState("send");
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h2>ShareLink</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setView("send")}>Send</button>
        <button onClick={() => setView("receive")}>Receive</button>
      </div>
      {view === "send" ? <Send /> : <Receive />}
    </div>
  );
}
