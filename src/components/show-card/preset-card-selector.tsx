import { forwardRef } from "react";
import { Card } from "./show-card";
import PresetCard1 from "./preset-card-1";
import PresetCard2 from "./preset-card-2";
import PresetCard3 from "./preset-card-3";
import PresetCard4 from "./preset-card-4";
import PresetCard5 from "./preset-card-5";
import PresetCard6 from "./preset-card-6";

interface Props {
  card: Card;
  presetType: number;
  ref: any;
  showDottedLine: boolean;
}

const PresetCardSelector = forwardRef<HTMLDivElement, Props>(
  ({ card, presetType, showDottedLine }, ref) => {
    switch (presetType) {
      case 1:
        return (
          <PresetCard1 showDottedLine={showDottedLine} card={card} ref={ref} />
        );
      case 2:
        return <PresetCard2 card={card} ref={ref} />;
      case 3:
        return <PresetCard3 card={card} ref={ref} />;
      case 4:
        return <PresetCard4 card={card} ref={ref} />;
      case 5:
        return <PresetCard5 card={card} ref={ref} />;
      case 6:
        return <PresetCard6 card={card} ref={ref} />;
      default:
        return (
          <PresetCard1 showDottedLine={showDottedLine} card={card} ref={ref} />
        );
    }
  }
);

export default PresetCardSelector;
