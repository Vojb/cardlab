import styles from "./show-card.module.scss";
import image from "../../assets/image.png";
import fcm from "../../assets/fcm.png";
import viteLogo from "../../assets/fcm.svg";
import "../../assets/fonts/nimbusmonolot-regular.otf";
import { forwardRef } from "react";
export interface Team {
  name?: string;
  logoUrl?: string;
  origin?: string;
  division?: string;
  country?: string;
}
export interface Card {
  name?: string;
  position?: string;
  image: string;
  description?: string;
  collectNumber?: string;
  team?: Team;
  origin?: string;
}

interface Props {
  card: Card;
  ref: any;
}

const ShowCard = forwardRef<HTMLDivElement, Props>(({ card }, ref) => {
  return (
    <div className={styles.rootShowCard} ref={ref}>
      <div className={styles.dottedLine}>
        <div className={styles.rootCard}>
          <div className={styles.logo}>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </div>

          <div className={styles.cardRoot}>
            <div className={styles.cardPhoto}>
              <span>{card?.position}</span>

              <img src={card?.image}></img>
            </div>
            <div
              className={styles.cardNameContainer}
              style={{ fontFamily: "NimbusMonolotBold" }}
            >
              <span>{card?.name?.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ShowCard;
