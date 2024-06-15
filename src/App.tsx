import React, { ChangeEventHandler, useRef, useState } from "react";
import "./App.scss";
import ShowCard, { Card } from "./components/show-card/show-card";
import { TextField } from "@mui/material";
import { toPng } from "html-to-image";
export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};
function App() {
  const elementRef = useRef<HTMLDivElement>(null); // Correct type for the ref
  const [card, setCard] = useState<Card | null>(null); // Initial state as null
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [previewImgUrl, setPreviewimgUrl] = useState("");

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files as FileList;
    setSelectedImage(file?.[0]);
    if (!file) {
      return;
    }
    try {
      const imgUrl = await fileToDataString(file?.[0]);
      setPreviewimgUrl(imgUrl);
    } catch (error) {
      console.log(error);
    }
  };
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
          <ShowCard card={{ name: name, image: previewImgUrl }} />
        </div>
        <button onClick={htmlToImageConvert}>Download Image</button>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <div className="wrapper">
          <form>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
