/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { frontMatter, gfm } from "../../utils/markdown.ts";
import { BlogPost } from "../../data/blog.ts";
import { TABLE_OF_CONTENTS } from "../../data/blog.ts";

interface Page extends BlogPost {
  markdown: string;
  data: Record<string, string>;
}
interface Data {
  page: Page;
}
export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;
    if (slug === "") {
      return new Response("", {
        status: 307,
        headers: { location: "/posts/test-post" },
      });
    }
    const entry = TABLE_OF_CONTENTS[slug];
    if (!entry) {
      return new Response("404 Page not found", {
        status: 404,
      });
    }
    const url = new URL(`../../blog/posts/${entry.file}`, import.meta.url);
    const fileContent = await Deno.readTextFile(url);
    const { content, data } = frontMatter(fileContent) as {
      data: Record<string, string>;
      content: string;
    };
    const page: Page = {
      ...entry,
      markdown: content,
      data: data ?? {},
    };
    const resp = ctx.render({ page });
    return resp;
  },
};

export default function BlogPostsPage(props: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>"{props.data.page.title}" by Thomas Francis</title>
        {/** Must use @ts-ignore pragma since I can't be bothered add additional xyz attribute to Preact's Intrinsic Attributes*/}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@animxyz/core"
        ></link>
      </Head>
      <main>
        {/** Header */}
        {/** Navigation */}
        {/** Body */}
        {/** Footer */}
      </main>
    </>
  );
}

