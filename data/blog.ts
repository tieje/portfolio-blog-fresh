import RAW_BLOG from "../blog/blog.json" assert { type: "json" };
export type BlogPost = {
  title: string;
  tags: string[];
  href: string;
  date_posted: string;
  last_edited: string;
};
export type RawB
export const TABLE_OF_CONTENTS: BlogPost["href"][] = [];
RAW_BLOG<BlogPost[]>.posts.forEach((post: BlogPost) => {
  TABLE_OF_CONTENTS.push(post.href);
});
