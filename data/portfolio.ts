import "https://deno.land/x/dotenv@v3.2.0/load.ts"
// My info urls and default information
export const DEFAULT_GITHUB_AVATAR = new URL(
  "https://avatars.githubusercontent.com/u/19988117?v=4"
);
export const DEFAULT_GITHUB_PROFILE = new URL("https://github.com/tieje");
export const DEFAULT_BIO =
  "Full stack web developer. Chemist. I care a lot about education systems.";
export const LINKEDIN_URL = new URL(
  "https://www.linkedin.com/in/thomas-james-libiano-francis/"
);
export const PORTFOLIO_URL = new URL("https://thomasjamesfrancis.com/");
export const RESUME_URL = new URL(
  "https://1drv.ms/b/s!Audo5lI2bixcvdEL5FoZIfKpQFPPzw?e=agEqvG"
);

export type TechCategory = {
  category:
    | string
    | "Design"
    | "Frontend"
    | "Backend(-ish)"
    | "Database"
    | "Deployment"
    | "Testing"
    | "Languages";
  tech: string[];
};
export type Certification = {
  institution: string;
  date: string;
};
export interface GithubInfo {
  github_avatar_url: URL;
  github_profile: URL;
  bio: string;
  name: string;
}
export interface MyInfoType extends GithubInfo {
  education: Certification[];
  techStack: TechCategory[];
  LinkedIn: URL;
  Resume: URL;
  Portfolio: URL;
}
const GITHUB_API_KEY = Deno.env.get("GITHUB_READ");
const GITHUB_API_BASE_URL = new URL("https://api.github.com/users/tieje");
export const GITHUB_API_USER_INFO_REQUEST = new URL("", GITHUB_API_BASE_URL);
// Headers
const GITHUB_AUTH_HEADER: HeadersInit = {
  Authorization: `token ${GITHUB_API_KEY}`,
};
export const GITHUB_AUTH: RequestInit = { headers: GITHUB_AUTH_HEADER };
