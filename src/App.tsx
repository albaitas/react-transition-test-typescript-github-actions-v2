import { useState, useEffect } from "react";
import Comments from "./components/Comments";
import { Comment } from "./types";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data: Comment[] = await response.json();
        setComments(data);
        setError(null);
      } catch (err) {
        setError("Error fetching comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container">
      {loading && <h2 className="top">Loading</h2>}
      {error && <p>{error}</p>}
      {!loading && !error && <Comments comments={comments} />}
    </div>
  );
}

export default App;
