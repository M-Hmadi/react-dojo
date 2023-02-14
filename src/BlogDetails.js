import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
    executeFetch,
  } = useFetch(`http://localhost:8000/blogs/${id}`, true);

  const navigate = useNavigate();

  const handleClick = () => {
    executeFetch(null, "DELETE");
    if (!isPending) {
      navigate("/");
    }
  };

  return (
    <div className="blog-details">
      {error && <div> {error}</div>}
      {isPending && <div>Loading...</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
