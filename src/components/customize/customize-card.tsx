import React, { ChangeEventHandler, useRef, useState } from "react";
import styles from "./customize-card.module.scss";
import ShowCard, { Card } from "../show-card/show-card";
import { Button, Input, TextField } from "@mui/material";
import { toJpeg, toPng, toSvg } from "html-to-image";
import BacksideCard from "../backside-card/backside-card";
export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};
interface Props {}
const CustomizeCard: React.FC<Props> = () => {
  const elementRef = useRef<HTMLDivElement>(null); // Correct type for the ref
  const elementRef1 = useRef<HTMLDivElement>(null); // Correct type for the ref
  const [card, setCard] = useState<Card | null>(null); // Initial state as null
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [origin, setOrigin] = useState("");
  const [collectNumber, setCollectNumber] = useState("");
  const [description, setDescription] = useState("");
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
    if (elementRef1.current) {
      htmlToImageConvertB();
    }
    if (elementRef.current) {
      toPng(elementRef.current, { pixelRatio: 10 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${name
            .replace(" ", "-")
            .toLowerCase()}-frontside.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const htmlToImageConvertB = () => {
    if (elementRef1.current) {
      toPng(elementRef1.current, { pixelRatio: 10 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${name
            .replace(" ", "-")
            .toLowerCase()}-backside.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className={styles.rootLayout}>
      <ShowCard
        ref={elementRef}
        card={{
          position: position != "" ? position : "MV",
          name: name,
          image: previewImgUrl,
        }}
      />
      <div ref={elementRef1}>
        <BacksideCard
          card={{
            name: name != "" ? name : "Spelarens namn",
            image: previewImgUrl,
            collectNumber: collectNumber != "" ? collectNumber : "1",
            origin: origin != "" ? origin : "Malmö",
            team: {
              name: "FC Möllan",
              origin: "Malmö",
              country: "Sverige",
              division: "Division 5",
            },
            description:
              description != "" ? description : "En beskrivande text",
          }}
        />
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          gap: 24,
          padding: 24,
          border: "1px solid black",
        }}
      >
        <div style={{ display: "flex" }}>
          <Button style={{ flex: "1 0 0" }} variant="outlined">
            <label htmlFor="input-file" style={{ width: "100%" }}>
              Välj bild
            </label>
            <Input
              id="input-file"
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </div>
        <TextField
          fullWidth
          label="Position"
          value={position}
          variant="filled"
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          fullWidth
          label="Namn"
          value={name}
          variant="filled"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Född"
          value={origin}
          variant="filled"
          onChange={(e) => setOrigin(e.target.value)}
        />
        <TextField
          fullWidth
          label="Samlar nummer"
          value={collectNumber}
          variant="filled"
          onChange={(e) => setCollectNumber(e.target.value)}
        />
        <TextField
          fullWidth
          label="Beskrivning"
          value={description}
          variant="filled"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          disabled={previewImgUrl == ""}
          type="button"
          variant="outlined"
          onClick={htmlToImageConvert}
        >
          Ladda hem kort
        </Button>
      </div>
    </div>
  );
};

export default CustomizeCard;
