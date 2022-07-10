import RAW_BLOG from "../blog/blog.json" assert { type: "json" };
export interface BlogPost {
  file: string;
  title: string;
  tags: string[];
  href: string;
  date_posted: string;
  last_edited: string;
}
export const TABLE_OF_CONTENTS: Record<BlogPost["href"], BlogPost> = {};

RAW_BLOG.posts.map((post: BlogPost) => {
  TABLE_OF_CONTENTS[post.href] = post;
});
