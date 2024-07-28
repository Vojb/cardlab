import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
interface Props {
  title: string;
  body: string;
  buttonText?: string;
}
const BasicCard = ({ title, body, buttonText = "" }: Props) => {
  return (
    <Card sx={{ width: 375 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2">{body}</Typography>
      </CardContent>
      {buttonText.length > 1 && (
        <CardActions>
          <Button size="small">{buttonText}</Button>
        </CardActions>
      )}
    </Card>
  );
};
export default BasicCard;
