import "https://deno.land/x/dotenv@v3.2.0/load.ts";
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
export interface GithubUserInfo {
  github_avatar_url: URL;
  github_profile: URL;
  bio: string;
  name: string;
}
export interface GithubProjectsInfo {
  name: string;
  description: string;
  project_link?: URL;
  github_link: URL;
  topics: string[];
  role: "owner" | "contributor";
}
export interface MyInfoType extends GithubUserInfo {
  education: Certification[];
  techStack: TechCategory[];
  LinkedIn: URL;
  Resume: URL;
  Portfolio: URL;
  projects: GithubProjectsInfo[];
}
const GITHUB_API_KEY = Deno.env.get("GITHUB_READ");
const GITHUB_API_BASE_URL = new URL("https://api.github.com");
export const GITHUB_API_USER_URL = new URL("/users/tieje", GITHUB_API_BASE_URL);
export const GITHUB_API_USER_REPOS_URL = new URL(
  "/repos/",
  GITHUB_API_BASE_URL
);
// Headers
const GITHUB_AUTH_HEADER: HeadersInit = {
  Authorization: `token ${GITHUB_API_KEY}`,
};
export const GITHUB_AUTH: RequestInit = { headers: GITHUB_AUTH_HEADER };
export const PORTFOLIO_REPOS = [
  "hellenic/react-hexgrid",
  "tieje/portfolio-blog-fresh",
  "tieje/breadsauce",
  "tieje/skill-tree",
  "tieje/portfolio-gatsby",
  "tieje/semblance",
  "tieje/csharp-trading-bot",
  "tieje/simple-lead-generator",
];
// deno-lint-ignore no-explicit-any
export function parseGitProject(data: any): GithubProjectsInfo {
  const info: GithubProjectsInfo = {
    name: data.name ?? "no name",
    description: data.description ?? "no description",
    project_link: data.homepage ? new URL(data.homepage) : undefined,
    github_link: new URL(data.html_url),
    topics: data.topics,
    role: data.owner.login === "tieje" ? "owner" : "contributor",
  };
  return info;
}

/*
curl -i -H "Authorization: token x" "https://api.github.com/users/tieje/repos?name"
curl -H "Authorization: token x" "https://api.github.com/repos/tieje/breadsauce"
curl -H "Authorization: token x" "https://api.github.com/repos/hellenic/react-hexgrid"
curl -i -H "Authorization: token x" "https://api.github.com/users/tieje/repos"
*/
/* Github API will have a response for repos in the form of the following.
{
  "id": 500262765,
  "node_id": "R_kgDOHdFnbQ",
  "name": "breadsauce",
  "full_name": "tieje/breadsauce",
  "private": false,
  "owner": {
    "login": "tieje",
    "id": 19988117,
    "node_id": "MDQ6VXNlcjE5OTg4MTE3",
    "avatar_url": "https://avatars.githubusercontent.com/u/19988117?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/tieje",
    "html_url": "https://github.com/tieje",
    "followers_url": "https://api.github.com/users/tieje/followers",
    "following_url": "https://api.github.com/users/tieje/following{/other_user}",
    "gists_url": "https://api.github.com/users/tieje/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/tieje/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/tieje/subscriptions",
    "organizations_url": "https://api.github.com/users/tieje/orgs",
    "repos_url": "https://api.github.com/users/tieje/repos",
    "events_url": "https://api.github.com/users/tieje/events{/privacy}",
    "received_events_url": "https://api.github.com/users/tieje/received_events",
    "type": "User",
    "site_admin": false
  },
  "html_url": "https://github.com/tieje/breadsauce",
  "description": "A static site with animation.",
  "fork": false,
  "url": "https://api.github.com/repos/tieje/breadsauce",
  "forks_url": "https://api.github.com/repos/tieje/breadsauce/forks",
  "keys_url": "https://api.github.com/repos/tieje/breadsauce/keys{/key_id}",
  "collaborators_url": "https://api.github.com/repos/tieje/breadsauce/collaborators{/collaborator}",
  "teams_url": "https://api.github.com/repos/tieje/breadsauce/teams",
  "hooks_url": "https://api.github.com/repos/tieje/breadsauce/hooks",
  "issue_events_url": "https://api.github.com/repos/tieje/breadsauce/issues/events{/number}",
  "events_url": "https://api.github.com/repos/tieje/breadsauce/events",
  "assignees_url": "https://api.github.com/repos/tieje/breadsauce/assignees{/user}",
  "branches_url": "https://api.github.com/repos/tieje/breadsauce/branches{/branch}",
  "tags_url": "https://api.github.com/repos/tieje/breadsauce/tags",
  "blobs_url": "https://api.github.com/repos/tieje/breadsauce/git/blobs{/sha}",
  "git_tags_url": "https://api.github.com/repos/tieje/breadsauce/git/tags{/sha}",
  "git_refs_url": "https://api.github.com/repos/tieje/breadsauce/git/refs{/sha}",
  "trees_url": "https://api.github.com/repos/tieje/breadsauce/git/trees{/sha}",
  "statuses_url": "https://api.github.com/repos/tieje/breadsauce/statuses/{sha}",
  "languages_url": "https://api.github.com/repos/tieje/breadsauce/languages",
  "stargazers_url": "https://api.github.com/repos/tieje/breadsauce/stargazers",
  "contributors_url": "https://api.github.com/repos/tieje/breadsauce/contributors",
  "subscribers_url": "https://api.github.com/repos/tieje/breadsauce/subscribers",
  "subscription_url": "https://api.github.com/repos/tieje/breadsauce/subscription",
  "commits_url": "https://api.github.com/repos/tieje/breadsauce/commits{/sha}",
  "git_commits_url": "https://api.github.com/repos/tieje/breadsauce/git/commits{/sha}",
  "comments_url": "https://api.github.com/repos/tieje/breadsauce/comments{/number}",
  "issue_comment_url": "https://api.github.com/repos/tieje/breadsauce/issues/comments{/number}",
  "contents_url": "https://api.github.com/repos/tieje/breadsauce/contents/{+path}",
  "compare_url": "https://api.github.com/repos/tieje/breadsauce/compare/{base}...{head}",
  "merges_url": "https://api.github.com/repos/tieje/breadsauce/merges",
  "archive_url": "https://api.github.com/repos/tieje/breadsauce/{archive_format}{/ref}",
  "downloads_url": "https://api.github.com/repos/tieje/breadsauce/downloads",
  "issues_url": "https://api.github.com/repos/tieje/breadsauce/issues{/number}",
  "pulls_url": "https://api.github.com/repos/tieje/breadsauce/pulls{/number}",
  "milestones_url": "https://api.github.com/repos/tieje/breadsauce/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/tieje/breadsauce/notifications{?since,all,participating}",
  "labels_url": "https://api.github.com/repos/tieje/breadsauce/labels{/name}",
  "releases_url": "https://api.github.com/repos/tieje/breadsauce/releases{/id}",
  "deployments_url": "https://api.github.com/repos/tieje/breadsauce/deployments",
  "created_at": "2022-06-06T02:08:49Z",
  "updated_at": "2022-06-13T15:36:32Z",
  "pushed_at": "2022-06-17T00:22:57Z",
  "git_url": "git://github.com/tieje/breadsauce.git",
  "ssh_url": "git@github.com:tieje/breadsauce.git",
  "clone_url": "https://github.com/tieje/breadsauce.git",
  "svn_url": "https://github.com/tieje/breadsauce",
  "homepage": "http://breadsauce.us/",
  "size": 43328,
  "stargazers_count": 0,
  "watchers_count": 0,
  "language": "TypeScript",
  "has_issues": true,
  "has_projects": true,
  "has_downloads": true,
  "has_wiki": true,
  "has_pages": false,
  "forks_count": 0,
  "mirror_url": null,
  "archived": false,
  "disabled": false,
  "open_issues_count": 0,
  "license": {
    "key": "gpl-3.0",
    "name": "GNU General Public License v3.0",
    "spdx_id": "GPL-3.0",
    "url": "https://api.github.com/licenses/gpl-3.0",
    "node_id": "MDc6TGljZW5zZTk="
  },
  "allow_forking": true,
  "is_template": false,
  "web_commit_signoff_required": false,
  "topics": [

  ],
  "visibility": "public",
  "forks": 0,
  "open_issues": 0,
  "watchers": 0,
  "default_branch": "main",
  "permissions": {
    "admin": true,
    "maintain": true,
    "push": true,
    "triage": true,
    "pull": true
  },
  "temp_clone_token": "",
  "network_count": 0,
  "subscribers_count": 1
}
*/
