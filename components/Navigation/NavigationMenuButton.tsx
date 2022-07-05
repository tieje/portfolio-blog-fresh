/** @jsx h */
import { h } from "preact";
export default function NavigationMenuButton() {
  return (
    <button class="menu">
      <svg viewBox="0 0 28 28" width="24" height="24">
        <rect width="28" height="4" rx="4" />
        <rect y="8" width="28" height="4" rx="4" />
        <rect y="16" width="28" height="4" rx="4" />
      </svg>
    </button>
  );
}
