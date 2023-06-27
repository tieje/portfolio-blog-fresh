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
  PORTFOLIO_URL,
  PORTFOLIO_REPOS,
  parseGitProject,
  GithubProjectInfo,
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
    const gitProjects: GithubProjectInfo[] = [];
    for (const project of userProjectsResp) {
      if (project.status === 404) {
        continue;
      }
      const jsonProject = await project.json();
      gitProjects.push(parseGitProject(jsonProject));
    }
    const MyInfo: MyInfoType = {
      education: MY_INFO.education,
      techStack: MY_INFO.techStack,
      github_avatar_url: userData.avatar_url
        ? new URL(userData.avatar_url)
        : DEFAULT_GITHUB_AVATAR,
      github_profile: userData.html_url
        ? new URL(userData.html_url)
        : DEFAULT_GITHUB_PROFILE,
      bio: userData.bio ?? DEFAULT_BIO,
      name: userData.name ?? "Thomas Francis",
      LinkedIn: LINKEDIN_URL,
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
      <main class={tw`grid grid-cols-1 min-h-screen bg-white gap-10`}>
        {/** Navigation */}
        <NavigationBar active="/portfolio" />
        {/** Header */}
        <header class={tw`md:mb-32 w-full grid place-content-center`}>
          <div
            class={tw`md:max-w-[900px] grid place-content-center md:grid-cols-12`}
          >
            {/** My immediate profile section */}
            <section
              class={tw`my-10 px-5 py-5 grid gap-10 text-center md:flex md:justify-right md:cols-span-1 md:m-0 md:col-span-5`}
            >
              {/** Github Image Avatar */}
              <div class={tw`grid grid-cols-1 gap-10 place-content-center`}>
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
                      <li class={tw`text-xs font-semibold`}>
                        {edu.institution} - {edu.date}
                      </li>
                    );
                  })}
                </ul>
                {/** Subtitle Description */}
                <p class={tw`text-sm`}>
                  &emsp;<i>{props.data.bio}</i>
                </p>
                <article class={tw`grid gap-2 text-sm`}>
                  <p class={tw`font-semibold`}>
                    Where I am in my career:
                  </p>
                  <p class={tw``}>Working at my first dev job. Learning Rust.</p>
                </article>
              </div>
            </section>
            {/** My Tech Stack */}
            <table class={tw`grid grid-cols-1 gap-8 md:cols-span-1 text-sm md:col-span-7`}>
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
                      <td
                        class={tw`border-r-2 border-black px-2 w-28 text-right`}
                      >
                        {tech.category}
                      </td>
                      <td class={tw`border-black px-2`}>
                        {tech.tech.map((item: string) => {
                          return (
                            <button
                              class={tw`border border-black rounded-full px-2 m-1 shadow-md`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </header>
        {/** Portfolio Items */}
        <section class={tw`grid place-content-center`}>
          <h1 class={"text-3xl font-bold text-center"}>Projects</h1>
          {props.data.projects.map((project: GithubProjectInfo) => {
            return (
              <div
                class={tw`grid sm:grid-cols-1 md:grid-cols-12 my-10 gap-4 md:gap-4 bg-yellow-100 px-7 py-5 mx-2 rounded-lg md:max-w-[1000px] md:min-h-[350px]`}
              >
                <div class={tw`grid place-content-center md:col-span-4 gap-4`}>
                  <img
                    src={`/${project.name}.png`}
                    width={300}
                    class={tw`rounded-lg`}
                  />
                  <ol
                    class={tw`flex flex-wrap md:grid md:place-content-center text-sm justify-center`}
                  >
                    {project.topics.map((tag: string) => {
                      return (
                        <li
                          class={tw`border-2 border-black rounded-full px-2 m-1 shadow-lg`}
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <div
                  class={tw`grid grid-cols-1 gap-4 md:cols-span-1 md:grid md:grid-cols-1 md:col-span-6 md:gap-4 md:place-content-center`}
                >
                  <h1 class={tw`text-center text-lg font-semibold`}>
                    {project.name.replace(/-/g, " ")}
                  </h1>
                  <article class={tw`text-sm`}>
                    &emsp;{project.description}
                  </article>
                  <p class={tw`text-sm`}>
                    <b>Role:</b> {project.role}
                  </p>
                </div>
                <div
                  class={tw`grid grid-cols-1 gap-6 md:col-span-2 md:place-content-center`}
                >
                  {project.project_url ? (
                    <LinkButton
                      props={{
                        link: project.project_url,
                        name: "Go to Site",
                      }}
                    />
                  ) : null}
                  <LinkButton
                    props={{ link: project.github_url, name: "Github" }}
                  />
                </div>
              </div>
            );
          })}
        </section>
        {/** Single Resume */}
        <section class={tw`h-screen grid place-content-center bg-black`}>
          <a
            href={"/FrancisT_resume.pdf"}
            class={tw`px-4 py-2 border-2 border-white text-white motion-safe:animate-pulse rounded-full hover:animate-none`}
          >
            Take a Resumé
          </a>
        </section>
      </main>
      {/** Footer */}
      <Footer />
    </>
  );
}
function LinkButton({ props }: { props: { link: URL; name: string } }) {
  return (
    <div class={tw`grid place-content-center`}>
      <a
        class={tw`border-[3px] border-black rounded-lg text-center hover:bg-black hover:border-white hover:text-white w-24 py-3 text-sm font-bold shadow-lg`}
        href={props.link.href}
      >
        {props.name}
      </a>
    </div>
  );
}
