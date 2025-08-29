// src/pages/Receive.js
import React, { useState } from "react";

function Receive() {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!code) {
      setError("Please enter a code");
      return;
    }
    setLoading(true);
    setError("");
    setText("");

    try {
      const res = await fetch(`http://localhost:8080/api/v1/receive/${code}`);
      if (res.ok) {
        const result = await res.json();
        if (result.data) {
          setText(result.data);
        } else {
          setError("No text found for this code");
        }
      } else {
        setError("Code expired or not found");
      }
    } catch (err) {
      setError("Error fetching text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Receive Text</h1>
        
        <input
          type="text"
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border rounded-md p-2 mb-3"
        />
        
        <button
          onClick={handleFetch}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Fetch Text"}
        </button>

        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
        {text && (
          <div className="mt-4 p-3 border rounded-md bg-gray-50 break-words">
            <p className="font-mono">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Receive;
