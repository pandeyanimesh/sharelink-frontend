import React, { useState } from "react";
import { backendUrl } from "./utils";

export default function Send() {
  const [text, setText] = useState("");
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!text) return alert("Paste something to send");
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/v1/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: text }),
      });
      const j = await res.json();
      setCode(j.code);
    } catch (err) {
      alert("Error sending");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        rows={6}
        cols={60}
        placeholder="Paste link or text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Generate Code"}
        </button>
      </div>
      {code && (
        <div style={{ marginTop: 20 }}>
          <div>
            <strong>Code:</strong>
          </div>
          <div style={{ fontSize: 28, letterSpacing: 4 }}>{code}</div>
          <div style={{ marginTop: 8 }}>
            Share this code with the receiving device. It expires automatically.
          </div>
        </div>
      )}
    </div>
  );
}
