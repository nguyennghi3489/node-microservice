import axios from "axios";
import { FormEvent, useState } from "react";
import { CommentList } from "./comment-list";

interface IComment {
  postId: string;
  comments: any;
}
export const Comment = ({ postId, comments }: IComment) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    // <div className="bg-slate-200 m-4 p-4 rounded-md border shadow-sm w-1/2"></div>
    <div className="w-3/12 bg-slate-200">
      <CommentList comments={comments} />
      <form onSubmit={onSubmit}>
        <div className="sm:col-span-4 flex items-center gap-2 mt-4">
          <div>
            <input
              type="text"
              name="first-name"
              id="first-name"
              onChange={(e) => setContent(e.target.value)}
              className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button
            type="submit"
            className=" rounded-md text-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Comment
          </button>
        </div>
      </form>
    </div>
  );
};
