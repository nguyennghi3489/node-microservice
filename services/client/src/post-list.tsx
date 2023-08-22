import axios from "axios";
import { useEffect, useState } from "react";
import { Comment } from "./comment";

export const PostList = () => {
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const result: any = await axios.get("http://posts.com/posts");

      const posts = Object.values(result.data).map((item) => item);
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-slate-200 p-4">
      <h2 className="text-2xl">Post List</h2>
      <div>
        {posts.map((item: any) => (
          <div className="bg-slate-200 m-4 p-4 rounded-md border shadow-sm ">
            <h5 className="text-xs">{item.id}</h5>
            <p className="text-xl">{item.title}</p>
            <Comment postId={item.id} comments={item.comments} />
          </div>
        ))}
      </div>
    </div>
  );
};
