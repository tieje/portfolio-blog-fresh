/** @jsx h */
import { h } from "preact";
export default function Logo() {
  return (
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#000000" />
      <circle cx="50" cy="50" r="47" fill="#ffffff" />
      <polygon points="37,58 44,58 37,48" stroke="lightblue" fill="lightblue" />
      <polygon points="51,62 58,62 58,71" stroke="lightblue" fill="lightblue" />
      <polygon
        points="49,58 58,58 58,41 36,41"
        stroke="#fa3939"
        fill="#fa3939"
      />
      <line
        x1="35"
        y1="85"
        x2="35"
        y2="20"
        stroke="black"
        stroke-linecap="round"
        stroke-width="3"
      />
      <line
        x1="60"
        y1="85"
        x2="60"
        y2="20"
        stroke="black"
        stroke-linecap="round"
        stroke-width="3"
      />
      <line
        x1="80"
        y1="40"
        x2="15"
        y2="40"
        stroke="black"
        stroke-linecap="round"
        stroke-width="3"
      />
      <line
        x1="80"
        y1="60"
        x2="15"
        y2="60"
        stroke="black"
        stroke-linecap="round"
        stroke-width="3"
      />
      <line
        x1="70"
        y1="90"
        x2="20"
        y2="22"
        stroke="black"
        stroke-linecap="round"
        stroke-width="3"
      />
    </svg>
  );
}
