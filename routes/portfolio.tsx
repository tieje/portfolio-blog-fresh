/** @jsx h */
/** @jsxFrag Fragment */
import MY_INFO from "../data/portfolio.json" assert { type: "json" };
import {
  MyInfoType,
  GITHUB_API_USER_INFO_REQUEST,
  GITHUB_AUTH,
  DEFAULT_BIO,
  DEFAULT_GITHUB_AVATAR,
  DEFAULT_GITHUB_PROFILE,
  LINKEDIN_URL,
  RESUME_URL,
  PORTFOLIO_URL,
} from "../data/portfolio.ts";
import { Certification, TechCategory } from "../data/portfolio.ts";
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import NavigationBar from "../components/Navigation/NavigationBar.tsx";
import NavigationMenuButton from "../components/Navigation/NavigationMenuButton.tsx";

const TITLE = "Full Stack Web Developer Portfolio";

export const handler: Handlers<MyInfoType> = {
  async GET(_req, ctx) {
    const response = await fetch(GITHUB_API_USER_INFO_REQUEST, GITHUB_AUTH);
    const data = await response.json();
    const MyInfo: MyInfoType = {
      education: MY_INFO.education,
      techStack: MY_INFO.techStack,
      github_avatar_url: new URL(data.avatar_url) ?? DEFAULT_GITHUB_AVATAR,
      //github_avatar_url: DEFAULT_GITHUB_AVATAR,
      github_profile: new URL(data.html_url) ?? DEFAULT_GITHUB_PROFILE,
      //github_profile: DEFAULT_GITHUB_PROFILE,
      bio: data.bio ?? DEFAULT_BIO,
      //bio: data.bio, // ?? DEFAULT_BIO,
      name: data.name ?? "Thomas Francis",
      LinkedIn: LINKEDIN_URL,
      Resume: RESUME_URL,
      Portfolio: PORTFOLIO_URL,
    };
    const resp = ctx.render(MyInfo);
    return resp;
  },
};

export default function Home(props: PageProps<MyInfoType>) {
  return (
    <>
      <Head>
        <title>
          {TITLE} by {props.data.name}
        </title>
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
          <NavigationMenuButton />
          <NavigationBar active="/portfolio" />
          {/** My immediate profile section */}
          <div>
            <div>my github avatar image</div>
            {/** sub title */}
            <ul>
              {props.data.education.map((edu: Certification) => (
                <li>{edu}</li>
              ))}
            </ul>
            <p>my github description</p>
          </div>
          {/** My Tech Stack */}
          <div>
            <table>
              <tbody>
                {props.data.techStack.map((tech: TechCategory) => {
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
