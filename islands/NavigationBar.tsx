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
type NavLinksType = {
  name: string;
  href: string;
};
const navHome: NavLinksType = {
  name: "Home",
  href: "/",
};
export default function NavigationBar(props: { active: string }) {
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
  const buttonDivStyle = tw`flex-1 md-hidden grid place-content-center`;
  const menuButtonStyle: NavigationStyles = {
    id: 1,
    menuItems: tw`md:hidden flex bg-white`,
    buttonStyle: tw`w-10 h-10 grid place-content-center pt-2`,
    button: <MenuButton />,
    nameStyle: tw`flex-2 md:hidden grid place-content-center font-bold`,
    navStyle: tw`md:hidden`,
    itemsContainer: tw`hidden`,
  };
  const exitMenuButtonStyle: NavigationStyles = {
    id: 2,
    menuItems: tw`md:hidden flex bg-black z-10`,
    buttonStyle: tw`text-white text-2xl border-2 border-white rounded-full px-2`,
    button: <ExitMenuButton />,
    nameStyle: tw`flex-2 md:hidden grid place-content-center font-bold text-white`,
    navStyle: tw`md:hidden fixed flex-col flex-1 w-full bg-black z-10 h-screen`,
    itemsContainer: tw`text-white grid place-content-center h-1/3 text-center text-3xl`,
  };
  const [navStyles, setNavStyles] = useState(menuButtonStyle);
  //const [navStyles, setNavStyles] = useState(exitMenuButtonStyle);
  return (
    <>
      <nav class={navStyles.navStyle}>
        <div class={navStyles.menuItems}>
          <NavLogo />
          <h1 class={navStyles.nameStyle}>Thomas Francis</h1>
          <div class={tw`flex-1 md:hidden grid place-content-center`}>
            <button
              class={navStyles.buttonStyle}
              onClick={() => {
                navStyles.id === menuButtonStyle.id
                  ? setNavStyles(exitMenuButtonStyle)
                  : setNavStyles(menuButtonStyle);
              }}
            >
              {navStyles.button}
            </button>
          </div>
        </div>
        <div class={navStyles.itemsContainer}>
          <ol class={tw`grid grid-cols-1 gap-6`}>
            {navLinks.map((item: NavLinksType) => (
              <a href={item.href}>
                <li class={item.href === props.active ? tw`font-bold` : ''}>
                  {item.name}
                </li>
              </a>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
function NavLogo() {
  return (
    <div class={tw`flex-1 md-hidden flex`}>
      <a href={navHome.href}>
        <img src="/logo.svg" height={60} width={60} class={tw`my-8 ml-8`} />
      </a>
    </div>
  );
}
