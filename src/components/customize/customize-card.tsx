import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import styles from "./customize-card.module.scss";
import ShowCard, { Card, Team } from "../show-card/show-card";
import "../../App.scss";
import {
  Button,
  Chip,
  IconButton,
  Input,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { toPng } from "html-to-image";
import BacksideCard from "../backside-card/backside-card";
import SmallCard from "../small-card/small-card";
import JSZip from "jszip";
import "react-image-crop/dist/ReactCrop.css";
import { addCard, deleteAllCards, deleteCard, getAllCards } from "../indexedDb";
import { sendMessageToAssistant } from "../../api/open-ai/open-api";
import { OpenAiSvg } from "../../assets/svg/open-ai";
interface DeckItem {
  frontPng: string;
  backPng: string;
  cardData: Card;
}

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
  const elementRef = useRef<HTMLDivElement>(null);
  const elementRef1 = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [origin, setOrigin] = useState("");
  const [collectNumber, setCollectNumber] = useState("1");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [deck, setDeck] = useState<
    { frontPng: string; backPng: string; cardData: Card }[]
  >([]);
  const [team, setTeam] = useState<Team>({
    name: "FC Möllan",
    origin: "Malmö",
    logoUrl: " https://staticcdn.svenskfotboll.se/img/teams/6879.png",
    country: "Sverige",
    division: "Division 5",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards();
      const list: DeckItem[] = [];
      const duplicates = new Set<string>();
      data.forEach(async (item) => {
        if (!duplicates.has(item.value.cardData.collectNumber)) {
          list.push(item.value);
          duplicates.add(item.value.cardData.collectNumber);
        } else {
          await deleteCard(item.key);
        }
      });

      setDeck(list);
    };

    fetchData();
  }, []);

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

  const generatePngs = async () => {
    try {
      if (elementRef.current) {
        const tasks = [
          toPng(elementRef.current, { quality: 10, pixelRatio: 10 }),
          toPng(elementRef.current, { quality: 10, pixelRatio: 10 }),
          toPng(elementRef.current, { quality: 10, pixelRatio: 10 }),
          toPng(elementRef.current, { quality: 10, pixelRatio: 10 }),
        ];

        if (elementRef1.current) {
          tasks.push(
            toPng(elementRef1.current, { quality: 10, pixelRatio: 10 }),
            toPng(elementRef1.current, { quality: 10, pixelRatio: 10 }),
            toPng(elementRef1.current, { quality: 10, pixelRatio: 10 }),
            toPng(elementRef1.current, { quality: 10, pixelRatio: 10 })
          );
        }

        await Promise.all(tasks);

        console.log("All PNGs have been generated.");
      }
    } catch (error) {
      console.error("Error generating PNGs:", error);
    }
  };

  const addToDeck = () => {
    generatePngs().then(() => {
      if (elementRef1.current) {
        toPng(elementRef1.current, { quality: 10, pixelRatio: 10 })
          .then((dataUrlBackside) => {
            if (elementRef.current) {
              toPng(elementRef.current, { quality: 10, pixelRatio: 10 })
                .then(async (dataUrl) => {
                  const newCard: Card = {
                    name: name,
                    image: previewImgUrl,
                    collectNumber: collectNumber,
                    origin: origin,
                    description: description,
                    position: position,
                    team: team,
                  };
                  setName("");
                  setPosition("");
                  setOrigin("");
                  const existingIndex = deck.findIndex(
                    (item) =>
                      item?.cardData?.collectNumber === newCard?.collectNumber
                  );

                  if (existingIndex !== -1) {
                    const updatedDeck = [...deck];
                    updatedDeck[existingIndex] = {
                      frontPng: dataUrl,
                      backPng: dataUrlBackside,
                      cardData: newCard,
                    };
                    setDeck(updatedDeck);
                  } else {
                    setDeck([
                      ...deck,
                      {
                        frontPng: dataUrl,
                        backPng: dataUrlBackside,
                        cardData: newCard,
                      },
                    ]);
                  }
                  setCollectNumber(
                    String(
                      Number.isNaN(Number(collectNumber))
                        ? 1
                        : Number(collectNumber) + 1
                    )
                  );
                  setDescription("");
                  setSelectedImage(null);
                  setPreviewimgUrl("");
                  await addCard({
                    id: collectNumber,
                    value: {
                      frontPng: dataUrl,
                      backPng: dataUrlBackside,
                      cardData: newCard,
                    },
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const downloadAllAsZip = () => {
    const zip = new JSZip();

    // Create folders for fronts and backs
    const frontFolder = zip.folder("card-frontsides");
    const backFolder = zip.folder("card-backsides");

    // Add each card PNG to the respective folder in the zip file
    deck.forEach((item, index) => {
      frontFolder?.file(
        `card-${item.cardData.collectNumber}-front.png`,
        item.frontPng.split("data:image/png;base64,")[1],
        { base64: true }
      );
      backFolder?.file(
        `card-${item.cardData.collectNumber}-back.png`,
        item.backPng.split("data:image/png;base64,")[1],
        { base64: true }
      );
    });

    // Generate the zip file and trigger download
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "cards.zip";
      link.click();
    });
  };

  return (
    <div className="App">
      <div className={styles.rootLayout}>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            gap: 24,
            width: "100%",
            padding: 24,
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
          <div className={styles.chipsFlex}>
            {[
              "Snabb",
              "Stark",
              "Kvicktänkt",
              "Klinisk",
              "Snabba reflexer",
              "Teknisk",
            ].map((item, index) => {
              return (
                <Chip
                  color={"secondary"}
                  label={item}
                  onClick={() => {
                    setDescription(description + " " + item);
                  }}
                />
              );
            })}
            <Chip
              color={"error"}
              label={"Töm"}
              onClick={() => {
                setDescription("");
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 24, flexDirection: "row" }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <IconButton
              disabled={description.length < 1}
              onClick={() => {
                sendMessageToAssistant(name + "" + description).then(
                  (response) => {
                    setDescription(response ?? description);
                  }
                );
              }}
            >
              <OpenAiSvg />
            </IconButton>
          </div>

          <Button
            disabled={previewImgUrl === ""}
            type="button"
            variant="outlined"
            onClick={addToDeck}
          >
            {deck.some((item) => item.cardData.collectNumber === collectNumber)
              ? "Uppdatera"
              : "Lägg till"}
          </Button>
        </div>
        <div className={styles.cardsContainer}>
          <ShowCard
            ref={elementRef}
            card={{
              position: position !== "" ? position : "MV",
              name: name,
              image: previewImgUrl,
            }}
          />
          <div ref={elementRef1}>
            <BacksideCard
              card={{
                name: name !== "" ? name : "Spelarens namn",
                image: previewImgUrl,
                collectNumber: collectNumber !== "" ? collectNumber : "1",
                origin: origin !== "" ? origin : "Malmö",
                team: team,
                description:
                  description !== "" ? description : "En beskrivande text",
              }}
            />
          </div>
          <div className={styles.deck}>
            {deck.map((item, index) => (
              <SmallCard
                selected={item.cardData.collectNumber == collectNumber}
                key={index}
                png={item.frontPng}
                cardData={item.cardData}
                onClick={(card) => {
                  if (card != null) {
                    setPosition(card.position ?? "");
                    setOrigin(card.origin ?? "");
                    setCollectNumber(card.collectNumber ?? "");
                    setDescription(card.description ?? "");
                    setPreviewimgUrl(card.image);
                    setName(card.name ?? "");
                  }
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 24 }}>
            <Button
              disabled={deck.length === 0}
              type="button"
              color="error"
              variant="outlined"
              onClick={async () => {
                try {
                  await deleteAllCards();
                  setDeck([]);
                } catch (error) {
                  console.error("Error deleting all items:", error);
                }
              }}
            >
              Ta bort alla kort
            </Button>
            <Button
              disabled={deck.length === 0}
              type="button"
              variant="outlined"
              onClick={downloadAllAsZip}
            >
              Ladda hem kort
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCard;
