/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import Favicons from "../components/Favicons/Favicons.tsx";
import NavigationBar from "../islands/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";

const TITLE = "Thomas Francis - frontpage";

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        {/** Must use @ts-ignore pragma since I can't be bothered add additional xyz attribute to Preact's Intrinsic Attributes*/}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@animxyz/core"
        ></link>
        <Favicons />
      </Head>
      <main class={tw`flex flex-col min-h-screen`}>
        {/** Navigation */}
        <NavigationBar active="/" />
        {/** Header */}
        <header class={tw`grid place-content-center`}>
          <h1 class={tw`text-6xl`}>Page Under Construction</h1>
        </header>
      </main>
      <Footer />
    </>
  );
}
