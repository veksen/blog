import { createStitches } from "@stitches/react";

const { styled, getCssText, globalCss, css } = createStitches({
  theme: {
    colors: {
      blue300: "#C5C7DC",
      blue900: "#222331",
      blue700: "#34364B",
      yellow500: "#DCE57F",
      teal500: "#7FCDE5",
      purple500: "#DCAFFF",
      green500: "#81E89F",
      red500: "#E89481",
    },
    fonts: {
      body: "Oswald, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    space: {
      0: 0,
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
      5: "64px",
    },
  },
});

export { styled, getCssText, css };

export const globalStyles = globalCss({
  "@font-face": [
    {
      fontFamily: "Oswald",
      fontStyle: "normal",
      fontWeight: 400,
      src: `local(''),
       url('/fonts/oswald-v48-latin-regular.woff2') format('woff2'),
       url('/fonts/oswald-v48-latin-regular.woff') format('woff');`,
    },
    {
      fontFamily: "Oswald",
      fontStyle: "normal",
      fontWeight: 500,
      src: `local(''),
       url('/fonts/oswald-v48-latin-500.woff2') format('woff2'),
       url('/fonts/oswald-v48-latin-500.woff') format('woff');`,
    },
    {
      fontFamily: "JetBrains Mono",
      fontStyle: "normal",
      fontWeight: 500,
      src: `local(''),
       url('/fonts/jetbrains-mono-v13-latin-regular.woff2') format('woff2'),
       url('/fonts/jetbrains-mono-v13-latin-regular.woff') format('woff');`,
    },
  ],
  body: {
    fontSize: 18,
    fontFamily: "$body",
    lineHeight: 1.47,
    background: "$blue900",
    color: "#fff",
  },
});
