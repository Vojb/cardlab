import styles from "./preset-card-3.module.scss";
import image from "../../assets/placeholder.png";
import viteLogo from "../../assets/fcm.png";
import "../../assets/fonts/nimbusmonolot-regular.otf";
import { forwardRef } from "react";
import { Card } from "./show-card";
import AutoShrinkText from "./AutoShrinkText";

interface Props {
  card: Card;
  ref: any;
}

const PresetCard3 = forwardRef<HTMLDivElement, Props>(({ card }, ref) => {
  return (
    <div className={styles.rootShowCard} ref={ref}>
      <div className={styles.rootCard}>
        <div className={styles.vintageBorder}>
          <div className={styles.cornerDecoration}></div>
          <div className={styles.cornerDecoration}></div>
          <div className={styles.cornerDecoration}></div>
          <div className={styles.cornerDecoration}></div>
        </div>

        <div className={styles.logo}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </div>

        <div className={styles.cardRoot}>
          <div className={styles.cardPhoto}>
            <div className={styles.photoFrame}>
              <img src={card?.image != "" ? card?.image : image} alt="Player" />
            </div>
            <span className={styles.positionBadge}>
              {card?.position?.toUpperCase()}
            </span>
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
  );
});

export default PresetCard3;
