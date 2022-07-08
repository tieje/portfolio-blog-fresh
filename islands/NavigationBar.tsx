/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { MenuButton, ExitMenuButton } from "../components/MenuButtons.tsx";

type NavigationStyles = {
  id: number;
  buttonStyle: string;
  button: string | h.JSX.Element;
  navStyle: string;
  nameStyle: string;
  menuItems: string;
  itemsContainer: string;
};
type LogoPropsType = {
  TwA: string;
  TwImg: string;
};
export type NavLinksType = {
  name: string;
  href: string;
};
interface NavBarPropsType {
  active: string;
}
interface NavNamePropsType {
  twStyle: string;
}
export type NavItemsPropsType = Partial<NavBarPropsType> &
  Partial<NavNamePropsType> & { NavLinks: NavLinksType[] };

const navHome: NavLinksType = {
  name: "Home",
  href: "/",
};
const navLinks: NavLinksType[] = [
  navHome,
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
export default function NavigationBar(props: NavBarPropsType) {
  const buttonDivStyle = tw`flex-1 grid place-content-center md:hidden`;
  const closedMobileMenu: NavigationStyles = {
    id: 1,
    menuItems: tw`flex bg-white`,
    buttonStyle: tw`w-10 h-10 grid place-content-center pt-2`,
    button: <MenuButton />,
    nameStyle: tw`flex-2 grid place-content-center font-bold`,
    navStyle: tw`md:hidden`,
    itemsContainer: tw`hidden`,
  };
  const openMobileMenu: NavigationStyles = {
    id: 2,
    menuItems: tw`flex bg-black z-10`,
    buttonStyle: tw`text-white text-2xl border-2 border-white rounded-full px-2`,
    button: <ExitMenuButton />,
    nameStyle: tw`flex-2 grid place-content-center font-bold text-white`,
    navStyle: tw`fixed flex-col flex-1 w-full bg-black z-10 h-screen md:hidden`,
    itemsContainer: tw`text-white grid place-content-center h-1/3 text-center text-3xl`,
  };
  const [navStyles, setNavStyles] = useState(closedMobileMenu);
  //const [navStyles, setNavStyles] = useState(openMobileMenu);
  return (
    <>
      {/** Desktop and Tablet */}
      <nav class={tw`hidden bg-white md:flex`}>
        <NavLogo props={{ TwA: "flex-1 flex", TwImg: "my-4 ml-8" }} />
        <NavName
          props={{ twStyle: "grid place-content-center flex-1 text-2xl" }}
        />
        <ol
          class={tw`flex-1 grid grid-flow-col auto-cols-max place-content-center gap-8 mr-5`}
        >
          <NavItems
            props={{
              ...props,
              twStyle: "hover:underline hover:underline-offset-2",
              NavLinks: navLinks,
            }}
          />
        </ol>
      </nav>
      {/** Mobile */}
      <nav class={navStyles.navStyle}>
        <div class={navStyles.menuItems}>
          <NavLogo props={{ TwA: "flex-1 flex", TwImg: "my-4 ml-8" }} />
          <NavName props={{ twStyle: navStyles.nameStyle }} />
          <div class={tw`flex-1 grid place-content-center`}>
            <button
              class={navStyles.buttonStyle}
              onClick={() => {
                navStyles.id === closedMobileMenu.id
                  ? setNavStyles(openMobileMenu)
                  : setNavStyles(closedMobileMenu);
              }}
            >
              {navStyles.button}
            </button>
          </div>
        </div>
        <div class={navStyles.itemsContainer}>
          <ol class={tw`grid grid-cols-1 gap-6`}>
            <NavItems props={{ ...props, twStyle: "", NavLinks: navLinks }} />
          </ol>
        </div>
      </nav>
    </>
  );
}
export function NavLogo({ props }: { props: LogoPropsType }) {
  return (
    <div class={tw`${props.TwA}`}>
      <a href={"/"}>
        <img
          src="/logo.svg"
          height={60}
          width={60}
          class={tw`${props.TwImg}`}
        />
      </a>
    </div>
  );
}
export function NavName({ props }: { props: NavNamePropsType }) {
  return <h1 class={tw`${props.twStyle}`}>Thomas Francis</h1>;
}
export function NavItems({ props }: { props: NavItemsPropsType }) {
  const liStyle = tw`list-none p-2 ${props.twStyle ?? ""}`;
  return (
    <>
      {props.NavLinks.map((item: NavLinksType) => (
        <a href={item.href}>
          <li
            class={
              item.href === props.active
                ? tw`${liStyle} font-bold`
                : tw`${liStyle}`
            }
          >
            {item.name}
          </li>
        </a>
      ))}
    </>
  );
}
