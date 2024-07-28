import React from "react";

export const BackgroundHero: React.FC = () => {
  return (
    <svg
      width="800"
      height="53"
      viewBox="0 0 800 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bi_85_67)">
        <path
          d="M799.792 53.8702H0L799.792 0.550781V53.8702Z"
          fill="white"
          fill-opacity="0.4"
        />
        <path
          d="M799.792 53.8702H0L799.792 0.550781V53.8702Z"
          fill="url(#paint0_linear_85_67)"
          fill-opacity="0.2"
        />
      </g>
      <path
        d="M0.000366211 53.8702H799.792L0.000366211 0.550781V53.8702Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_bi_85_67"
          x="-4.44329"
          y="-3.89251"
          width="808.678"
          height="62.2069"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.22164" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_85_67"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_85_67"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.555411" />
          <feGaussianBlur stdDeviation="0.277705" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.33 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_85_67"
          />
        </filter>
        <linearGradient
          id="paint0_linear_85_67"
          x1="399.896"
          y1="0.550781"
          x2="399.896"
          y2="53.8702"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
