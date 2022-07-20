import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { styled } from "~/stitches.config";
import Sidebar from "~/components/sidebar";
import Header from "~/components/header";
import Heading from "~/ui/heading";
import Stack from "~/ui/stack";
import { getPostsList } from "~/utils/mdx.server";

const Layout = styled("main", {
  padding: "$4 0",
  width: "800px",
  maxWidth: "100%",
  margin: "0 auto",
  display: "grid",
  gridTemplateAreas: `
    "....... header"
    "....... subheader"
    "sidebar content"
  `,
  gridTemplateColumns: "150px 1fr",
  gap: "$4 $5",
});

const Box = styled("div");

export async function loader() {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.

  const posts = await getPostsList();
  return json(posts[0]);
}

const components = {
  // img: ResponsiveImage,
  // h1: Heading.H1,
  // h2: Heading.H2,
  // p: Text,
  // code: Pre,
  // inlineCode: Code,
};

export default function Index() {
  const content = useLoaderData();

  const Component = React.useMemo(
    () => getMDXComponent(content.mdx),
    [content.mdx]
  );

  return (
    <Layout>
      <Box css={{ gridArea: "header", gridColumnStart: 2 }}>
        <Header />
      </Box>

      <Box css={{ gridArea: "subheader", gridColumnStart: 2 }}>
        <Stack>
          <Heading as="h1">React anti-patterns</Heading>
          <Heading as="h2">Duplicate state</Heading>
        </Stack>
      </Box>

      <Box css={{ gridArea: "sidebar" }}>
        <Sidebar />
      </Box>

      <Box css={{ gridArea: "content" }}>
        <Component />
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
