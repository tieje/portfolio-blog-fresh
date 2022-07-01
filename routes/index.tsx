/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

const TITLE = "Thomas Francis - full stack web developer portfolio";
const NAV_LINKS = ["Resume", "Blog", "Project"];
const EDUCATION = [
  "Holberton (Full Stack Web Development), Sept. 2022",
  "AWS Developer - Associate Certified, Aug. 2022",
  "University of Connecticut (B.S. Chemistry), 2018",
];
type TechCategory = {
  category:
    | "Design"
    | "Frontend"
    | "Backend(-ish)"
    | "Database"
    | "Deployment"
    | "Testing"
    | "Languages";
  tech: string[];
};
const TECH_STACK: TechCategory[] = [
  {
    category: "Design",
    tech: ["Figma"],
  },
  {
    category: "Frontend",
    tech: [
      "Apollo",
      "Bootstrap",
      "Deno",
      "Fresh",
      "Gatsby",
      "NPM",
      "NodeJS",
      "React",
      "Redux",
      "TailwindCSS",
      "Vite",
      "Webpack",
      "Yarn",
      "jQuery",
    ],
  },
  {
    category: "Backend(-ish)",
    tech: ["Django + Django REST APIs", "Express", "GraphQL"],
  },
  {
    category: "Database",
    tech: ["MongoDB", "PostgreSQL", "Redis", "SQLite"],
  },
  {
    category: "Deployment",
    tech: ["AWS", "Apache", "Deno Deploy", "Docker", "Gatsby Cloud", "Nginx"],
  },
  {
    category: "Testing",
    tech: ["Jest", "Python Unit Tests", "React Testing Library", "Selenium"],
  },
  {
    category: "Languages",
    tech: [
      "Bash (Linux)",
      "C",
      "C#",
      "JavaScript",
      "PL/SQL",
      "PostgreSQL",
      "Python",
      "TypeScript",
    ],
  },
];

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
              {EDUCATION.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
            <p>my github description</p>
          </div>
          {/** My Tech Stack */}
          <div>
            <table>
              <tbody>
                {TECH_STACK.map((item: TechCategory) => {
                  return (
                    <tr>
                      <td>{item.category}</td>
                      <td>{item.tech.join(", ")}</td>
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
        <section>
          Single Resume Button
        </section>
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
