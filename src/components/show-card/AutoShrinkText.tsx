import React, { useRef, useLayoutEffect, useState } from "react";

interface AutoShrinkTextProps {
  text: string;
  maxFontSize?: number;
  minFontSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

const AutoShrinkText: React.FC<AutoShrinkTextProps> = ({
  text,
  maxFontSize = 14,
  minFontSize = 10,
  className = "",
  style = {},
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useLayoutEffect(() => {
    const span = spanRef.current;
    if (!span) return;
    let currentFontSize = maxFontSize;
    span.style.fontSize = `${currentFontSize}px`;
    while (
      span.scrollWidth > span.offsetWidth &&
      currentFontSize > minFontSize
    ) {
      currentFontSize -= 1;
      span.style.fontSize = `${currentFontSize}px`;
    }
    setFontSize(currentFontSize);
  }, [text, maxFontSize, minFontSize]);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{
        ...style,
        fontSize: fontSize,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        width: "100%",
      }}
      title={text}
    >
      {text}
    </span>
  );
};

export default AutoShrinkText;
