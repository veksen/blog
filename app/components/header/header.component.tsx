import { styled } from "~/stitches.config";

const HeaderWrapper = styled("header", {
  display: "flex",
  alignItems: "center",
  position: "relative",
  fontSize: "24px",
  height: "32px",
});

const Logo = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  left: "-32px",
  width: "32px",
  height: "32px",
});

function Header() {
  return (
    <HeaderWrapper>
      <Logo>z</Logo>
      React & JavaScript handbook
    </HeaderWrapper>
  );
}

export default Header;
