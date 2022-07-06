/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
export function MenuButton() {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24">
      <rect width="28" height="4" rx="4" />
      <rect y="8" width="28" height="4" rx="4" />
      <rect y="16" width="28" height="4" rx="4" />
    </svg>
  );
}
export function ExitMenuButton() {
  return <>&#10005;</>;
}
