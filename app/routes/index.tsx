import Sidebar from "~/components/sidebar";
import { styled } from "~/stitches.config";
import Heading from "~/ui/heading";
import Stack from "~/ui/stack";

const Box = styled("div", {
  backgroundColor: "#f00",
});

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Box>Stitches work</Box>
      <Sidebar />
      <Stack>
        <Heading as="h1">React anti-patterns</Heading>
        <Heading as="h2">Duplicate state</Heading>
      </Stack>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
