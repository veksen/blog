import Highlight, { defaultProps } from "prism-react-renderer";
import { styled } from "~/stitches.config";

const StyledPre = styled("pre", {
  background: "$blue700",
  padding: "$4",
  margin: "0 -$4",

  ".token.keyword": {
    color: "$purple500",
  },

  ".token.control-flow": {
    color: "$green500",
  },

  ".token.function": {
    color: "$yellow500",
  },

  ".token.property": {
    color: "$teal500",
  },

  ".token.parameter": {
    color: "$teal500",
  },

  ".token.string": {
    color: "$green500",
  },

  ".token.number": {
    color: "$red500",
  },

  ".token.comment": {
    color: "$blue300",
  },
});

interface ICodeProps {
  children: React.ReactElement;
}

const Code = (props: ICodeProps) => {
  const code = props.children.props.children;
  const language = props.children.props.className
    ?.replace("language-", "")
    .trim();

  return (
    <Highlight
      {...defaultProps}
      code={code}
      theme={undefined} // disable theming so we can style ourself
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <StyledPre className={className}>
          {tokens.slice(0, -1).map((line, i) => (
            <div {...getLineProps({ line })} key={i}>
              {line.map((token, key) => {
                return <span {...getTokenProps({ token })} key={key} />;
              })}
            </div>
          ))}
        </StyledPre>
      )}
    </Highlight>
  );
};

export default Code;
