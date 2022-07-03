/** @jsx h */
/** @jsxFrag Fragment */
import MY_INFO from "../data/my_info.json" assert { type: "json" };
import { Certification, TechCategory } from "../data/myInfo.ts";
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

const TITLE = "Thomas Francis - full stack web developer portfolio";
const NAV_LINKS = ["Resume", "Blog", "Project"];

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
          {/** My immediate profile section */}
          <div>
            <div>my github avatar image</div>
            {/** sub title */}
            <ul>
              {MY_INFO.education.map((edu: Certification) => (
                <li>{edu}</li>
              ))}
            </ul>
            <p>my github description</p>
          </div>
          {/** My Tech Stack */}
          <div>
            <table>
              <tbody>
                {MY_INFO.techStack.map((tech: TechCategory) => {
                  return (
                    <tr>
                      <td>{tech.category}</td>
                      <td>{tech.tech.join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </header>
        {/** Portfolio Items */}
        <section>
          Portfolio Items - use the github API
          {/** Portfolio Item 1 */}
          {/** Portfolio Item 2 */}
          {/** Portfolio Item 3 */}
        </section>
        {/** Single Resume */}
        <section>Single Resume Button</section>
      </main>
      {/** Footer */}
      <footer>
        <div>Logo bottom left</div>
        {/** List of Links goes from Horizontal to vertical on Window size change */}
        <div>List of Links on the bottom right</div>
      </footer>
    </>
  );
}
