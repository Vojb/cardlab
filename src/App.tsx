import React, { useRef, useState } from "react";
import "./App.scss";
import ShowCard, { Card } from "./components/show-card/show-card";
import { TextField } from "@mui/material";
import { toPng } from "html-to-image";

function App() {
  const elementRef = useRef<HTMLDivElement>(null); // Correct type for the ref
  const [card, setCard] = useState<Card | null>(null); // Initial state as null
  const [name, setName] = useState("");

  const htmlToImageConvert = () => {
    if (elementRef.current) {
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${name.toLowerCase()}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ display: "flex" }} className="App">
      <div>
        <div ref={elementRef}>
          <ShowCard card={{ name: name }} />
        </div>
        <button onClick={htmlToImageConvert}>Download Image</button>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
      </div>
    </div>
  );
}

export default App;
