import { styled } from "~/stitches.config";

const SidebarWrapper = styled("nav", {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  fontSize: "18px",
});

const SubNav = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const SubNavTitle = styled("div", {
  color: "$yellow500",
  fontWeight: "600",
});

const SubNavItem = styled("a", {
  color: "#fff",
  textDecoration: "underline",
  cursor: "pointer",
});

function Sidebar() {
  return (
    <SidebarWrapper>
      <div>Browse more...</div>
      <SubNav>
        <SubNavTitle>React</SubNavTitle>
        <SubNavItem>Anti-patterns</SubNavItem>
        <SubNavItem>Common mistakes</SubNavItem>
        <SubNavItem>Recipes</SubNavItem>
      </SubNav>
      <SubNav>
        <SubNavTitle>JavaScript</SubNavTitle>
        <SubNavItem>Recipes</SubNavItem>
      </SubNav>
    </SidebarWrapper>
  );
}

export default Sidebar;
