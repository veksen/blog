import { styled } from "~/stitches.config";
import logo from "./logo.png";

const HeaderWrapper = styled("header", {
  display: "flex",
  alignItems: "center",
  position: "relative",
  fontSize: "24px",
  height: "32px",
});

const Logo = styled("img", {
  position: "absolute",
  left: "calc(-32px - 10px)",
  width: "32px",
  height: "32px",
});

function Header() {
  return (
    <HeaderWrapper>
      <Logo src={logo} />
      React & JavaScript handbook
    </HeaderWrapper>
  );
}

export default Header;
