import { Post } from "./post";
import { PostList } from "./post-list";

const App = () => {
  return (
    <div className="p-6">
      <Post />
      <PostList />
    </div>
  );
};

export default App;
