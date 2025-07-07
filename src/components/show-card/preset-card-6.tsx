import styles from "./preset-card-6.module.scss";
import image from "../../assets/placeholder.png";
import { forwardRef } from "react";
import { Card } from "./show-card";

interface Props {
  card: Card;
  ref: any;
}

const PresetCard6 = forwardRef<HTMLDivElement, Props>(({ card }, ref) => {
  return (
    <div className={styles.rootShowCard} ref={ref}>
      <div className={styles.dottedLine}>
        <div className={styles.rootCard}>
          <div className={styles.fullImageContainer}>
            <img
              src={card?.image != "" ? card?.image : image}
              alt={card?.name || "Card image"}
              className={styles.fullImage}
            />
            <div className={styles.overlay}>{card.name}</div>
            <div className={styles.overlayLeft}>
              <img className={styles.logo} src={card.team?.logoUrl}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PresetCard6;
