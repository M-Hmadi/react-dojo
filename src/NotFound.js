import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <div className="back-to-homepage">
        <Link to="/" className="back-to-homepage-link">
          Back to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
