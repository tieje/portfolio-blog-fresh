/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { AvatarPropsType } from "./Types.ts";

export default function Avatar({ props }: { props: Partial<AvatarPropsType> }) {
  const defaultWidthHeight = 50;
  const defaultImage =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.amomama.com%2F4eba343f3687f0fed624460eb734fa2e.jpg%3Fwidth%3D2281%26height%3D3141&f=1&nofb=1";
  return (
    <img
      className={tw`${props.tw ?? ""}`}
      src={props.img ? props.img.href : defaultImage}
      alt={props.name ?? "Missing Name"}
      width={props.WH ?? defaultWidthHeight}
      height={props.WH ?? defaultWidthHeight}
    />
  );
}
