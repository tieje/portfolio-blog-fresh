/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { useState, StateUpdater } from "preact/hooks";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import Favicons from "../components/Favicons/Favicons.tsx";

const TITLE = "Thomas Francis - frontpage";
const NAV_LINKS = ["Resume", "Blog", "Project"];

export default function Home() {
  const [some, setSome] = useState(false);
  console.log(some);
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
      <main class={tw`flex flex-col min-h-screen bg-red-100`}>
        {/** first section */}
        <header>
          {/** Navigation - this will simply be a button on mobile. The button will pull up a full screen nav link page*/}
          <nav class={tw`w-full flex`}>
            <ul>
              {NAV_LINKS.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </nav>
        </header>
      </main>
      <footer>
        <div>Logo bottom left</div>
        {/** List of Links goes from Horizontal to vertical on Window size change */}
        <div>List of Links on the bottom right</div>
      </footer>
    </>
  );
}
