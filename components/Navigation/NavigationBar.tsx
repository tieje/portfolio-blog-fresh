/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

type NavLinkType = {
  name: string;
  href: string;
};
export default function NavigationBar(props: { active: string }) {
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Resume",
      href: "/FrancisT_Resume.pdf",
    },
    {
      name: "Blog",
      href: "/posts",
    },
    {
      name: "Portfolio",
      href: "/portfolio",
    },
  ];
  return (
    <nav class={tw`bg-green-200 py-2`}>
      <ul class={tw`flex justify-center gap-8 mx-4`}>
        {navLinks.map((item) => (
          <li>
            <a
              href={item.href}
              class={tw`text-gray-600 hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
