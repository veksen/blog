import { styled } from "~/stitches.config";
import type Stitches from "@stitches/react";

interface IPropsHeading {
  children: React.ReactNode;
}

const StyledStack = styled("div", {
  display: "flex",
  flexDirection: "column",
  "& > *": {
    margin: 0,
  },

  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
      },
      vertical: {
        flexDirection: "column",
      },
    },
    spacing: {
      0: {
        gap: "$0",
      },
      1: {
        gap: "$1",
      },
      2: {
        gap: "$2",
      },
      3: {
        gap: "$3",
      },
      4: {
        gap: "$4",
      },
      5: {
        gap: "$5",
      },
    },
  },
});

type StyledStackVariants = Stitches.VariantProps<typeof StyledStack>;

function Heading(props: IPropsHeading & StyledStackVariants) {
  return (
    <StyledStack orientation="vertical" {...props}>
      {props.children}
    </StyledStack>
  );
}

export default Heading;
