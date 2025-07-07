import styles from "./preset-card-1.module.scss";
import image from "../../assets/placeholder.png";
import viteLogo from "../../assets/fcm.png";
import "../../assets/fonts/nimbusmonolot-regular.otf";
import { forwardRef } from "react";
import { Card } from "./show-card";
import AutoShrinkText from "./AutoShrinkText";

interface Props {
  card: Card;
  ref: any;
  showDottedLine: boolean;
}

const PresetCard1 = forwardRef<HTMLDivElement, Props>(
  ({ card, showDottedLine }, ref) => {
    return (
      <div className={styles.rootShowCard} ref={ref}>
        <div className={styles.dottedLine}>
          <div className={`${styles.rootCard}`}>
            <div className={styles.logo}>
              <div className={styles.imgContainer}>
                <img className={styles.image} src={viteLogo} alt="Vite logo" />
              </div>
            </div>

            <div
              className={`${styles.cardRoot} ${
                showDottedLine ? styles.dottedLine : ""
              }`}
            >
              <div className={styles.cardPhoto}>
                <span>{card?.position?.toUpperCase()}</span>
                <img src={card?.image != "" ? card?.image : image}></img>
              </div>
              <div className={styles.cardNameContainer}>
                <AutoShrinkText
                  text={card?.name?.toUpperCase() || ""}
                  maxFontSize={14}
                  minFontSize={10}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PresetCard1;
