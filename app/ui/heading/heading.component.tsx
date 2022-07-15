import type { css } from "~/stitches.config";
import { styled } from "~/stitches.config";

interface IPropsHeading {
  children: React.ReactNode;
  css?: typeof css;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const StyledHeading = styled("h1", {
  fontFamily: "$body",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: 1.47,

  variants: {
    as: {
      h1: {
        fontSize: "48px",
        background:
          "linear-gradient(87.18deg, #E9E57A -8.66%, #75E8A3 106.29%)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
      },
      h2: {
        fontSize: "36px",
      },
      h3: {
        fontSize: "36px",
      },
      h4: {
        fontSize: "36px",
      },
      h5: {
        fontSize: "36px",
      },
      h6: {
        fontSize: "36px",
      },
    },
  },
});

function Heading(props: IPropsHeading) {
  return (
    <StyledHeading as={props.as || "h1"} css={{ ...props.css }}>
      {props.children}
    </StyledHeading>
  );
}

export default Heading;
