import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function Article() {
  const { id } = useParams();
  const url = `http://localhost:8000/articles/${id}`;
  const { data: article, isPending, error } = useFetch(url);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/"); // redirect the user to the home/root route
      }, 2000);
    }
  }, [error, history]);

  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {article && (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
}

export default Article;
