import styles from "./preset-card-5.module.scss";
import image from "../../assets/placeholder.png";
import "../../assets/fonts/nimbusmonolot-regular.otf";
import { forwardRef } from "react";
import { Card } from "./show-card";
import AutoShrinkText from "./AutoShrinkText";

interface Props {
  card: Card;
  ref: any;
}

const PresetCard5 = forwardRef<HTMLDivElement, Props>(({ card }, ref) => {
  return (
    <div className={styles.rootShowCard} ref={ref}>
      <div className={styles.dottedLine}>
        <div className={styles.rootCard}>
          <div className={styles.flagWrapper}>
            <div className={styles.fcmFlag}>
              <div className={styles.redStripe}></div>
              <div className={styles.blackStripe}></div>
              <div className={styles.redStripe}></div>
              <div className={styles.blackStripe}></div>
              <div className={styles.redStripe}></div>
              <div className={styles.blackStripe}></div>
              <div className={styles.redStripe}></div>
            </div>
          </div>
          <div className={styles.cardRoot}>
            <div className={styles.fcmVertical}>
              F<br />C<br />M
            </div>
            <div className={styles.cardPhoto}>
              <img
                src={card?.image !== "" ? card?.image : image}
                alt="Player"
              />
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
});

export default PresetCard5;
