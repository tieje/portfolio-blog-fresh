/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { NavLinksType, NavItems, NavLogo } from "../islands/NavigationBar.tsx";
import { LINKEDIN_URL, DEFAULT_GITHUB_PROFILE } from "../data/portfolio.ts";
const footerLinks: NavLinksType[] = [
  {
    name: "Contact Me",
    href: "mailto:toj320@gmail.com",
  },
  {
    name: "Github",
    href: DEFAULT_GITHUB_PROFILE.href,
  },
  {
    name: "LinkedIn",
    href: LINKEDIN_URL.href,
  },
  {
    name: "Sky Skill",
    href: "https://www.skyskill.tech/",
  },
  {
    name: "Old Portfolio",
    href: "https://thomasjameslibianofrancis.gatsbyjs.io/",
  },
];
export default function Footer() {
  return (
    <footer
      class={tw`relative md:static h-96 md:h-full md:py-5 bg-black text-white mt-20`}
    >
      <div class={tw`absolute md:static bottom-3 w-full`}>
        <div class={tw`flex md:static text-right md:text-center`}>
          <NavLogo
            props={{
              TwA: "flex-grow relative",
              TwImg: "ml-6 absolute bottom-4 md:bottom-0",
            }}
          />
          <ol
            class={tw`mr-5 flex-grow md:flex md:justify-end md:pt-5 md:pb-2 md:gap-4`}
          >
            <NavItems props={{ NavLinks: footerLinks }} />
          </ol>
          {/*<div class={tw`hidden md:flex flex-1`}></div>*/}
        </div>
      </div>
    </footer>
  );
}
