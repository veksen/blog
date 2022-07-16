import { styled } from "~/stitches.config";
import Sidebar from "~/components/sidebar";
import Heading from "~/ui/heading";
import Stack from "~/ui/stack";

const Layout = styled("main", {
  width: "800px",
  maxWidth: "100%",
  margin: "0 auto",
  display: "grid",
  gridTemplateAreas: `
    "x header"
    "sidebar content"
  `,
  gridTemplateColumns: "150px 1fr",
  gap: "$4 $5",
});

const Box = styled("div");

export default function Index() {
  return (
    <Layout>
      <Box css={{ gridArea: "header", gridColumnStart: 2 }}>
        <Stack>
          <Heading as="h1">React anti-patterns</Heading>
          <Heading as="h2">Duplicate state</Heading>
        </Stack>
      </Box>

      <Box css={{ gridArea: "sidebar" }}>
        <Sidebar />
      </Box>

      <Box css={{ gridArea: "content" }}>
        <Stack spacing="3">
          <p>
            One common thing to do when starting React is getting used to state
            for solving our issues. I want to store something, it goes in state,
            simple! However, as our application grows, we find ourselves putting{" "}
            <b>everything</b> in state, and that could be a mistake, let’s look
            at this.
          </p>
          <p>
            Consider a simple calculator application, where we would store the
            user input, and the result in state.
          </p>
        </Stack>
      </Box>
    </Layout>
  );
}
