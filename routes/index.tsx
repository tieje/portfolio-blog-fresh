/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

type TechCategoryType = {
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
type CertificationType = {
  institution: string;
  data: string;
};
interface Data {
  education: CertificationType[];
  techStack: TechCategoryType[];
}
export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url + "data.json");
    const response = await fetch(url);
    console.log(await response.json())
    const result: Data = await response.json();
    return ctx.render(result);
  },
};

const TITLE = "Thomas Francis - full stack web developer portfolio";
const NAV_LINKS = ["Resume", "Blog", "Project"];

export default function Home({ data }: PageProps<Data>) {
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
              {data.education.map((item: CertificationType) => (
                <li>{item}</li>
              ))}
            </ul>
            <p>my github description</p>
          </div>
          {/** My Tech Stack */}
          <div>
            <table>
              <tbody>
                {data.techStack.map((item: TechCategoryType) => {
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
