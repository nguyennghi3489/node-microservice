import axios from "axios";
import { FormEvent, useState } from "react";

export const Post = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await axios.post("http://posts.com/posts/create", { title });
    setTitle("");
  };

  return (
    // <div className="bg-slate-200 m-4 p-4 rounded-md border shadow-sm w-1/2"></div>
    <div className="w-3/12 p-4 bg-slate-200 shadow-sm mb-8">
      <h1 className="text-xl">Create Post</h1>
      <form onSubmit={onSubmit}>
        <div className="sm:col-span-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
