import styles from "./backside-card.module.scss";
import image from "../../assets/image.png";
import fcm from "../../assets/fcm.png";
import viteLogo from "../../assets/fcmdark.png";
import "../../assets/fonts/nimbusmonolot-regular.otf";
import { Card } from "../show-card/show-card";

interface Props {
  card: Card;
}
const BacksideCard: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.rootShowCard}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </div>
        <div className={styles.textContainer}>
          <span className={styles.name}>
            {card?.name?.replace(/\b\w/g, (char) => char.toUpperCase())}
          </span>
          <span className={styles.origin}>{card.origin}</span>
        </div>
        <div className={styles.collectNumber}>
          Samlarbild Nr.{card.collectNumber}
        </div>

        <div className={styles.descriptionContainer}>
          <div className={styles.clublocation}>
            {`${card.team?.name?.toLocaleUpperCase()} ${card.team?.division?.toLocaleUpperCase()}, ${card.team?.origin?.toLocaleUpperCase()}, ${card.team?.country?.toLocaleUpperCase()}`}
          </div>
          <div className={styles.description}>
            <span>{card.description}</span>
          </div>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.clubName}>{card.team?.name} 2024</div>
          <div className={styles.clubOrigin}>{card.team?.origin}</div>
        </div>
      </div>
    </div>
  );
};
export default BacksideCard;
