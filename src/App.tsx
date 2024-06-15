import { useRef, useState } from "react";
import "./App.scss";
import ShowCard, { Card } from "./components/show-card/show-card";
import { TextField } from "@mui/material";
import { toPng } from "html-to-image";
function App() {
  const elementRef = useRef<HTMLElement>();
  const [card, setCard] = useState<Card>();
  const [name, setName] = useState("");
  const htmlToImageConvert = () => {
    if (elementRef != null) {
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
      <div style={{}}>
        <div ref={elementRef}>
          <ShowCard card={{ name: name }}></ShowCard>
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
