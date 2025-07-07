import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import styles from "./customize-card.module.scss";
import ShowCard, { Card, Team } from "../show-card/show-card";
import PresetCardSelector from "../show-card/preset-card-selector";
import "../../App.scss";
import {
  Button,
  Chip,
  IconButton,
  Input,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Alert,
  Snackbar,
} from "@mui/material";
import { toPng } from "html-to-image";
import BacksideCard from "../backside-card/backside-card";
import SmallCard from "../small-card/small-card";
import JSZip from "jszip";
import "react-image-crop/dist/ReactCrop.css";
import {
  addCard,
  deleteAllCards,
  deleteCard,
  getAllCards,
  importData,
  clearAllData,
  exportDataWithoutImages,
} from "../indexedDb";
import { sendMessageToAssistant } from "../../api/open-ai/open-api";
import { OpenAiSvg } from "../../assets/svg/open-ai";
import { Upload } from "@mui/icons-material";

interface DeckItem {
  frontPng: string;
  backPng: string;
  cardData: Card;
  presetType: number;
}

export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};

const formatCollectNumber = (number: string | number): string => {
  const num = typeof number === "string" ? parseInt(number, 10) : number;
  return String(num).padStart(6, "0");
};

interface Props {}

const CustomizeCard: React.FC<Props> = () => {
  const [showDottedLine, setShowDottedLine] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const elementRef1 = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [origin, setOrigin] = useState("");
  const [collectNumber, setCollectNumber] = useState("000001");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImgUrl, setPreviewimgUrl] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [deck, setDeck] = useState<
    { frontPng: string; backPng: string; cardData: Card; presetType: number }[]
  >([]);
  const [team, setTeam] = useState<Team>({
    name: "FC Möllan",
    origin: "Malmö",
    logoUrl: " https://staticcdn.svenskfotboll.se/img/teams/6879.png",
    country: "Sverige",
    division: "Division 5",
  });
  const [selectedPreset, setSelectedPreset] = useState<number>(1);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCards();
      const list: DeckItem[] = [];
      const duplicates = new Set<string>();
      const toDelete: string[] = [];

      // First pass: identify duplicates and build the list
      data.forEach((item) => {
        const formattedNumber = formatCollectNumber(
          item.value.cardData.collectNumber
        );
        if (!duplicates.has(formattedNumber)) {
          // Handle legacy cards that don't have presetType
          const deckItem = {
            ...item.value,
            cardData: {
              ...item.value.cardData,
              collectNumber: formattedNumber,
            },
            presetType: item.value.presetType || 1,
          };
          list.push(deckItem);
          duplicates.add(formattedNumber);
        } else {
          // Mark for deletion
          toDelete.push(item.key);
        }
      });

      // Second pass: delete duplicates
      for (const key of toDelete) {
        if (key) {
          await deleteCard(key);
        }
      }

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

  const handleImportFileChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImportData = async () => {
    if (!importFile) {
      setSnackbar({
        open: true,
        message: "Välj en fil att importera",
        severity: "error",
      });
      return;
    }

    try {
      const text = await importFile.text();
      const data = JSON.parse(text);

      // Validate the import data structure
      if (!data.cards && !data.teams) {
        throw new Error(
          "Ogiltig filformat. Filen måste innehålla kort eller lag data."
        );
      }

      // Clear existing data and import new data
      await clearAllData();
      await importData(data);

      // Refresh the deck display
      const newData = await getAllCards();
      const list: DeckItem[] = [];
      const duplicates = new Set<string>();
      const toDelete: string[] = [];

      // First pass: identify duplicates and build the list
      newData.forEach((item) => {
        const formattedNumber = formatCollectNumber(
          item.value.cardData.collectNumber
        );
        if (!duplicates.has(formattedNumber)) {
          const deckItem = {
            ...item.value,
            cardData: {
              ...item.value.cardData,
              collectNumber: formattedNumber,
            },
            presetType: item.value.presetType || 1,
          };
          list.push(deckItem);
          duplicates.add(formattedNumber);
        } else {
          // Mark for deletion
          toDelete.push(item.key);
        }
      });

      // Second pass: delete duplicates
      for (const key of toDelete) {
        if (key) {
          await deleteCard(key);
        }
      }

      setDeck(list);
      setImportFile(null);

      setSnackbar({
        open: true,
        message: `Import lyckades! ${data.cards?.length || 0} kort och ${
          data.teams?.length || 0
        } lag importerades.`,
        severity: "success",
      });
    } catch (error) {
      console.error("Import error:", error);
      setSnackbar({
        open: true,
        message: `Import misslyckades: ${
          error instanceof Error ? error.message : "Okänt fel"
        }`,
        severity: "error",
      });
    }
  };

  const generatePngs = async () => {
    try {
      if (elementRef.current) {
        const tasks = [
          toPng(elementRef.current, {
            quality: 10,
            pixelRatio: 10,
            skipFonts: true,
          }),
          toPng(elementRef.current, {
            quality: 10,
            pixelRatio: 10,
            skipFonts: true,
          }),
          toPng(elementRef.current, {
            quality: 10,
            pixelRatio: 10,
            skipFonts: true,
          }),
          toPng(elementRef.current, {
            quality: 10,
            pixelRatio: 10,
            skipFonts: true,
          }),
        ];

        if (elementRef1.current) {
          tasks.push(
            toPng(elementRef1.current, {
              quality: 10,
              pixelRatio: 10,
              skipFonts: true,
            }),
            toPng(elementRef1.current, {
              quality: 10,
              pixelRatio: 10,
              skipFonts: true,
            }),
            toPng(elementRef1.current, {
              quality: 10,
              pixelRatio: 10,
              skipFonts: true,
            }),
            toPng(elementRef1.current, {
              quality: 10,
              pixelRatio: 10,
              skipFonts: true,
            })
          );
        }

        await Promise.all(tasks);

        console.log("All PNGs have been generated.");
      }
    } catch (error) {
      console.error("Error generating PNGs:", error);
    }
  };

  const addToDeck = async () => {
    // Check if collection number already exists in database
    const allCards = await getAllCards();
    const existingCard = allCards.find(
      (item) =>
        formatCollectNumber(item.value.cardData.collectNumber) ===
        formatCollectNumber(collectNumber)
    );

    if (
      existingCard &&
      !deck.some(
        (item) =>
          item.cardData.collectNumber === formatCollectNumber(collectNumber)
      )
    ) {
      setSnackbar({
        open: true,
        message: `Samlar nummer ${formatCollectNumber(
          collectNumber
        )} finns redan i databasen`,
        severity: "error",
      });
      return;
    }

    generatePngs().then(() => {
      if (elementRef1.current) {
        toPng(elementRef1.current, {
          quality: 10,
          pixelRatio: 10,
          skipFonts: true,
        })
          .then((dataUrlBackside) => {
            if (elementRef.current) {
              toPng(elementRef.current, {
                quality: 10,
                pixelRatio: 10,
                skipFonts: true,
              })
                .then(async (dataUrl) => {
                  const newCard: Card = {
                    name: name,
                    image: previewImgUrl,
                    collectNumber: formatCollectNumber(collectNumber),
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
                      presetType: selectedPreset,
                    };
                    setDeck(updatedDeck);
                  } else {
                    setDeck([
                      ...deck,
                      {
                        frontPng: dataUrl,
                        backPng: dataUrlBackside,
                        cardData: newCard,
                        presetType: selectedPreset,
                      },
                    ]);
                  }
                  // Get next available collection number
                  const nextNumber = getNextAvailableCollectionNumber([
                    ...deck,
                    {
                      frontPng: dataUrl,
                      backPng: dataUrlBackside,
                      cardData: newCard,
                      presetType: selectedPreset,
                    },
                  ]);
                  setCollectNumber(nextNumber);
                  setDescription("");
                  setSelectedImage(null);
                  setPreviewimgUrl("");
                  await addCard({
                    id: formatCollectNumber(collectNumber),
                    value: {
                      frontPng: dataUrl,
                      backPng: dataUrlBackside,
                      cardData: newCard,
                      presetType: selectedPreset,
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

  const removeCard = async (cardToRemove: Card) => {
    try {
      // Remove from database
      await deleteCard(cardToRemove.collectNumber);

      // Remove from local state
      const updatedDeck = deck.filter(
        (item) => item.cardData.collectNumber !== cardToRemove.collectNumber
      );
      setDeck(updatedDeck);

      // If the removed card was selected, clear the form
      if (cardToRemove.collectNumber === collectNumber) {
        setName("");
        setPosition("");
        setOrigin("");
        setDescription("");
        setSelectedImage(null);
        setPreviewimgUrl("");
        // Set to next available collection number
        const nextNumber = getNextAvailableCollectionNumber(updatedDeck);
        setCollectNumber(nextNumber);
      }

      setSnackbar({
        open: true,
        message: `Kort ${cardToRemove.collectNumber} borttaget`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error removing card:", error);
      setSnackbar({
        open: true,
        message: "Fel vid borttagning av kort",
        severity: "error",
      });
    }
  };

  const getNextAvailableCollectionNumber = (
    currentDeck: DeckItem[]
  ): string => {
    if (currentDeck.length === 0) {
      return "000001";
    }

    // Get all collection numbers and sort them
    const collectionNumbers = currentDeck
      .map((item) => parseInt(item.cardData.collectNumber || "0", 10))
      .sort((a, b) => a - b);

    // Find the first gap or use the next number after the highest
    let expectedNumber = 1;
    for (const num of collectionNumbers) {
      if (num !== expectedNumber) {
        break;
      }
      expectedNumber++;
    }

    return formatCollectNumber(expectedNumber);
  };

  const downloadAllAsZip = () => {
    const zip = new JSZip();

    // Create folders for fronts and backs
    const frontFolder = zip.folder("card-frontsides");
    const backFolder = zip.folder("card-backsides");

    // Add each card PNG to the respective folder in the zip file
    deck.forEach((item, index) => {
      try {
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
      } catch (error) {
        console.error("Error adding card to zip:", error);
      }
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

  const downloadDataWithoutImages = async () => {
    try {
      const exportData = await exportDataWithoutImages();
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      // Trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(dataBlob);
      link.download = "cards-data-without-images.json";
      link.click();
    } catch (error) {
      console.error("Error downloading data without images:", error);
      setSnackbar({
        open: true,
        message: "Fel vid export av data utan bilder",
        severity: "error",
      });
    }
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
          <div>
            <Checkbox
              checked={showDottedLine}
              onChange={() => setShowDottedLine(!showDottedLine)}
            />
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
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^\d+$/.test(value)) {
                setCollectNumber(
                  value === "" ? "000001" : formatCollectNumber(value)
                );
              }
            }}
          />
          <FormControl fullWidth variant="filled">
            <InputLabel>Kort Design</InputLabel>
            <Select
              value={selectedPreset}
              label="Kort Design"
              onChange={(e) => setSelectedPreset(e.target.value as number)}
            >
              <MenuItem value={1}>Design 1 - Klassisk</MenuItem>
              <MenuItem value={2}>Design 2 - Modern</MenuItem>
              <MenuItem value={3}>Design 3 - Retro</MenuItem>
              <MenuItem value={4}>Design 4 - Minimalistisk</MenuItem>
              <MenuItem value={5}>Design 5 - Retro FCM Bar</MenuItem>
              <MenuItem value={6}>Design 6 - Image only</MenuItem>
              <MenuItem value={7}>Design 7</MenuItem>
            </Select>
          </FormControl>
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
                  key={index}
                  color={"secondary"}
                  label={item}
                  onClick={() => {
                    setDescription(description + " " + item);
                  }}
                />
              );
            })}
            <Chip
              key="clear"
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
                sendMessageToAssistant(
                  "namn: " +
                    name +
                    " , beskrivande egenskaper: " +
                    description +
                    " , position: " +
                    position
                ).then((response) => {
                  setDescription(response ?? description);
                });
              }}
            >
              <OpenAiSvg />
            </IconButton>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Button
              disabled={previewImgUrl === ""}
              type="button"
              variant="outlined"
              onClick={addToDeck}
            >
              {deck.some(
                (item) => item.cardData.collectNumber === collectNumber
              )
                ? "Uppdatera"
                : "Lägg till"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => {
                // Clear form fields
                setName("");
                setPosition("");
                setOrigin("");
                setDescription("");
                setSelectedImage(null);
                setPreviewimgUrl("");
                // Advance to next available collection number
                const nextNumber = getNextAvailableCollectionNumber(deck);
                setCollectNumber(nextNumber);
              }}
            >
              Nästa Spelare
            </Button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <PresetCardSelector
            showDottedLine={showDottedLine}
            ref={elementRef}
            presetType={selectedPreset}
            card={{
              position: position !== "" ? position : "MV",
              name: name,
              image: previewImgUrl,
              team: team,
            }}
          />
          <div ref={elementRef1}>
            <BacksideCard
              card={{
                name: name !== "" ? name : "Spelarens namn",
                image: previewImgUrl,
                collectNumber: collectNumber !== "" ? collectNumber : "000001",
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
                onRemove={removeCard}
                onClick={(card) => {
                  if (card != null) {
                    setPosition(card.position ?? "");
                    setOrigin(card.origin ?? "");
                    setCollectNumber(
                      formatCollectNumber(card.collectNumber ?? "1")
                    );
                    setDescription(card.description ?? "");
                    setPreviewimgUrl(card.image);
                    setName(card.name ?? "");
                    setSelectedPreset(item.presetType || 1);
                  }
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
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
            <Button
              disabled={deck.length === 0}
              type="button"
              variant="outlined"
              onClick={downloadDataWithoutImages}
            >
              Export data utan bilder
            </Button>

            {/* Import Section */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                component="label"
                style={{ minWidth: "120px" }}
              >
                {importFile
                  ? importFile.name.substring(0, 20) +
                    (importFile.name.length > 20 ? "..." : "")
                  : "Välj fil"}
                <input
                  type="file"
                  accept=".json"
                  style={{ display: "none" }}
                  onChange={handleImportFileChange}
                />
              </Button>
              <Button
                disabled={!importFile}
                variant="contained"
                onClick={handleImportData}
                style={{ minWidth: "100px" }}
              >
                Importera
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizeCard;
