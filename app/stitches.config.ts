import { createStitches } from "@stitches/react";

const { styled, getCssText, globalCss, css } = createStitches({
  theme: {
    colors: {
      blue900: "#222331",
      blue700: "#34364B",
      yellow500: "#DCE57F",
      teal500: "#7FCDE5",
      purple500: "#DCAFFF",
      green500: "#81E89F",
    },
    fonts: {
      body: "Oswald, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    spacing: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 32,
      5: 64,
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
    background: "$blue900",
    color: "#fff",
  },
});
