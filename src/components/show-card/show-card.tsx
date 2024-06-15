import styles from "./show-card.module.scss";
import image from "../../assets/image.png";
import fcm from "../../assets/fcm.png";
import "../../assets/fonts/nimbusmonolot-regular.otf";
export interface Team {
  name: string;
  logoUrl: string;
  origin?: string;
  division?: string;
  country?: string;
}
export interface Card {
  name: string;
  collectNumber: string;
  team: Team;
  origin: string;
}

interface Props {
  card: Card;
}
const ShowCard: React.FC<Props> = ({ card }) => {
  return (
    <div className={styles.rootShowCard}>
      <div className={styles.logo}>
        <img src={fcm}></img>
      </div>

      <div className={styles.cardRoot}>
        <div className={styles.cardPhoto}>
          <img src={image}></img>
        </div>
        <div
          className={styles.cardNameContainer}
          style={{ fontFamily: "NimbusMonolotBold" }}
        >
          <span>{card.name}</span>
        </div>
      </div>
    </div>
  );
};
export default ShowCard;
