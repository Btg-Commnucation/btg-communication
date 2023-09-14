import BlogFooter from "@/components/blog/BlogFooter";
import BlogHeader from "@/components/blog/BlogHeader";
import { PostData } from "@/middleware/Post";
import axios from "axios";
import { use } from "react";
import PostSearch from "./PostSearch";

const URL_API = process.env.URL_API;

const getPosts = async () => {
  try {
    const response = await axios<PostData[]>(
      `${URL_API}/better-rest-endpoints/v1/posts`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function Search() {
  const Posts = use(getPosts());

  return (
    <>
      <BlogHeader />
      <main id="blog" className="search-page">
        <PostSearch posts={Posts as PostData[]} />
      </main>
      <BlogFooter />
    </>
  );
}
