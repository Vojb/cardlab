// small-card.tsx
import React from "react";
import styles from "./small-card.module.scss";
import { Card } from "../show-card/show-card";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface SmallCardProps {
  png: string;
  cardData: Card;
  onClick: (cardData: Card) => void;
  onRemove?: (cardData: Card) => void;
  selected: boolean;
}

const SmallCard: React.FC<SmallCardProps> = ({
  png,
  cardData,
  onClick,
  onRemove,
  selected,
}) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(cardData);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <img
        onClick={() => onClick(cardData)}
        style={{ height: "100px" }}
        src={png}
        alt={cardData.name}
        className={selected ? styles.cardImage : ""}
      />
      {onRemove && (
        <IconButton
          className={styles.removeButton}
          onClick={handleRemove}
          size="small"
          color="error"
        >
          <Close />
        </IconButton>
      )}
    </div>
  );
};

export default SmallCard;
