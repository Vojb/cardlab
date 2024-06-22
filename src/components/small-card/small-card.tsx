// small-card.tsx
import React from "react";
import styles from "./small-card.module.scss";
import { Card } from "../show-card/show-card";

interface SmallCardProps {
  png: string;
  cardData: Card;
  onClick: (cardData: Card) => void;
  selected: boolean;
}

const SmallCard: React.FC<SmallCardProps> = ({
  png,
  cardData,
  onClick,
  selected,
}) => {
  return (
    <img
      onClick={() => onClick(cardData)}
      style={{ height: "80px" }}
      src={png}
      alt={cardData.name}
      className={selected ? styles.cardImage : ""}
    />
  );
};

export default SmallCard;
