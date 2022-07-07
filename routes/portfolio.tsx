/** @jsx h */
/** @jsxFrag Fragment */
import MY_INFO from "../data/portfolio.json" assert { type: "json" };
import {
  MyInfoType,
  GITHUB_API_USER_URL,
  GITHUB_API_USER_REPOS_URL,
  GITHUB_AUTH,
  DEFAULT_BIO,
  DEFAULT_GITHUB_AVATAR,
  DEFAULT_GITHUB_PROFILE,
  LINKEDIN_URL,
  RESUME_URL,
  PORTFOLIO_URL,
  PORTFOLIO_REPOS,
  parseGitProject,
  GithubProjectsInfo,
} from "../data/portfolio.ts";
import { Certification, TechCategory } from "../data/portfolio.ts";
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import NavigationBar from "../islands/NavigationBar.tsx";
import Footer from "../components/Footer.tsx";
import Avatar from "../components/Avatar.tsx";

const TITLE = "Full Stack Web Developer Portfolio";

export const handler: Handlers<MyInfoType> = {
  async GET(_req, ctx) {
    const userData = await fetch(GITHUB_API_USER_URL, GITHUB_AUTH).then(
      (response) => response.json()
    );
    const userProjectsResp = await Promise.all(
      PORTFOLIO_REPOS.map((pathname: string) => {
        const url = new URL(pathname, GITHUB_API_USER_REPOS_URL);
        return fetch(url, GITHUB_AUTH);
      })
    );
    const gitProjects: GithubProjectsInfo[] = [];
    for (const project of userProjectsResp) {
      const jsonProject = await project.json();
      gitProjects.push(parseGitProject(jsonProject));
    }
    const MyInfo: MyInfoType = {
      education: MY_INFO.education,
      techStack: MY_INFO.techStack,
      github_avatar_url: new URL(userData.avatar_url) ?? DEFAULT_GITHUB_AVATAR,
      //github_avatar_url: DEFAULT_GITHUB_AVATAR,
      github_profile: new URL(userData.html_url) ?? DEFAULT_GITHUB_PROFILE,
      //github_profile: DEFAULT_GITHUB_PROFILE,
      bio: userData.bio ?? DEFAULT_BIO,
      //bio: userData.bio, // ?? DEFAULT_BIO,
      name: userData.name ?? "Thomas Francis",
      LinkedIn: LINKEDIN_URL,
      Resume: RESUME_URL,
      Portfolio: PORTFOLIO_URL,
      projects: gitProjects,
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
      <main class={tw`flex flex-col min-h-screen bg-white gap-10`}>
        {/** first section */}
        <header class={tw`md:h-screen`}>
          <NavigationBar active="/portfolio" />
          {/** Navigation - this will simply be a button on mobile. The button will pull up a full screen nav link page*/}
          {/** My immediate profile section */}
          <section class={tw`my-10`}>
            <div class={tw`px-5 py-5 grid grid-cols-1 gap-6 text-center`}>
              {/** Github Image Avatar */}
              <div class={tw`grid place-content-center`}>
                <Avatar
                  props={{
                    name: props.data.name,
                    img: props.data.github_avatar_url,
                    tw: "rounded-full",
                    WH: 150,
                  }}
                />
              </div>
              {/** Education */}
              <ul>
                {props.data.education.map((edu: Certification) => {
                  return (
                    <li class={tw`text-xs`}>
                      {edu.institution} - {edu.date}
                    </li>
                  );
                })}
              </ul>
              {/** Subtitle Description */}
              <p class={tw`text-left`}>&emsp;"{props.data.bio}"</p>
              <p class={tw`text-left`}>
                &emsp;<b>Where I am in my career:</b> Trying to land my first
                web dev job.
              </p>
            </div>
          </section>
          {/** My Tech Stack */}
          <div>
            <table class={tw`grid grid-cols-1 gap-8`}>
              <thead class={tw` grid place-content-center`}>
                <tr>
                  <th class={tw`text-2xl`} colSpan={2}>
                    My Tech Stack at a Glance
                  </th>
                </tr>
              </thead>
              <tbody class={tw`grid grid-cols-1 gap-6`}>
                {props.data.techStack.map((tech: TechCategory) => {
                  return (
                    <tr>
                      <td class={tw`border-r-2 border-black px-2 w-28`}>
                        {tech.category}
                      </td>
                      <td class={tw`border-black px-2`}>
                        {tech.tech.join(", ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </header>
        {/** Portfolio Items */}
        <section class={tw``}>
          Portfolio Items - use the github API
          {/** Portfolio Item 1 */}
          {/** Portfolio Item 2 */}
          {/** Portfolio Item 3 */}
        </section>
        {/** Single Resume */}
        <section>Single Resume Button</section>
      </main>
      {/** Footer */}
      <Footer />
    </>
  );
}
