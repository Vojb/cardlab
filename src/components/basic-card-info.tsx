import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
interface Props {
  title: string;
  body: string;
  buttonText?: string;
  icon?: string;
}
import styles from "./basic-card-info.module.scss";
const BasicCard = ({ title, body, buttonText = "", icon }: Props) => {
  return (
    <Card className={styles.basicCardRoot}>
      <CardContent>
        <div
          style={{
            display: "flex",
            flex: 1,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          <img style={{ height: 35 }} src={icon} alt="first image" />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            marginBottom: 24,
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "large", fontWeight: "bold" }}
            color="text.primary"
            gutterBottom
          >
            {title}
          </Typography>
        </div>

        <Typography sx={{ textAlign: "center" }} variant="body2">
          {body}
        </Typography>
      </CardContent>
      {buttonText.length > 1 && (
        <CardActions>
          <div
            style={{
              display: "flex",
              flex: 1,
              marginBottom: 24,
              justifyContent: "center",
            }}
          >
            <Button size="small" variant="contained" color="secondary">
              {buttonText}
            </Button>
          </div>
        </CardActions>
      )}
    </Card>
  );
};
export default BasicCard;
