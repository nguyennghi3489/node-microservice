interface IComment {
  comments: any;
}
export const CommentList = ({ comments }: IComment) => {
  return (
    <div>
      <ul>
        {comments.map((item: any) => (
          <li className=" ml-4  rounded-md list-disc">
            <p className="text-xs">{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
