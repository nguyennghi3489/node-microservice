interface IComment {
  comments: any;
}
export const CommentList = ({ comments }: IComment) => {
  const renderComment = (item: any) => {
    switch (item.status) {
      case "pending":
        return "Comment is reviewing";
      case "rejected":
        return "Comment is violated";
      case "approved":
        return item.content;
      default:
        return "Comment is reviewing";
    }
  };
  return (
    <div>
      <ul>
        {comments.map((item: any) => (
          <li className=" ml-4  rounded-md list-disc">
            <p className="text-xs">{renderComment(item)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
