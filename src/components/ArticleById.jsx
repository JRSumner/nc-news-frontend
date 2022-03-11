import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddComment from "./AddComment";
import Comments from "./ArticleComments";
import { fetchTopThreeComments, patchVote } from "./utils/api";
import { fetchArticle } from "./utils/api";

function ArticleById() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [topComments, setTopComments] = useState([]);
  const [isError, setIsError] = useState(null);
  const { article_id } = useParams();
  const date = new Date(Date.parse(article.created_at));

  const handleUpVote = () => {
    setIsError(null);
    if (downVoted) {
      setVotes((currVotes) => {
        return currVotes + 2;
      });
      patchVote(article.article_id, 2).catch((err) => {
        setVotes((previousVote) => {
          setIsError("Oops, something went wrong 🥺");
          return previousVote - 2;
        });
      });
    } else {
      setVotes((currVotes) => {
        return currVotes + 1;
      });
      patchVote(article.article_id, 1).catch((err) => {
        setVotes((previousVote) => {
          setIsError("Connection Lost...");
          return previousVote - 1;
        });
      });
    }
    setUpVoted(true);
    setDownVoted(false);
  };

  const handleDownVote = () => {
    setIsError(null);
    if (upVoted) {
      setVotes((currVotes) => {
        return currVotes - 2;
      });
      patchVote(article.article_id, -2).catch((err) => {
        setVotes((previousVote) => {
          setIsError("Connection Lost...");
          return previousVote + 2;
        });
      });
    } else {
      setVotes((currVotes) => {
        return currVotes - 1;
      });
      patchVote(article.article_id, -1).catch((err) => {
        setVotes((previousVote) => {
          setIsError("Connection Lost...");
          return previousVote + 1;
        });
      });
    }
    setDownVoted(true);
    setUpVoted(false);
  };

  useEffect(() => {
    fetchArticle(article_id).then((article) => {
      setArticle(article);
      setVotes(article.votes);
      setIsLoading(false);
    });

    fetchTopThreeComments(article_id).then((topThreeComments) => {
      setTopComments(topThreeComments);
    });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section>
      <h2>{article.title}</h2>
      <p className="article-written-by">Written by: {article.author}</p>
      <p className="article-posted-by">
        Posted:{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}
      </p>
      <section className="article-body">
        <p>{article.body}</p>
      </section>

      <div className="article-comments-votes-section">
        <div className="voter">
          <button
            disabled={upVoted}
            className="up-vote"
            onClick={() => handleUpVote()}
          >
            👍
          </button>
          <button
            disabled={downVoted}
            className="down-vote"
            onClick={() => handleDownVote()}
          >
            👎
          </button>
          {isError ? <h4>{isError}</h4> : null}
        </div>
      </div>

      <section>
        <p className="article-comment-and-vote-count">
          Votes: {votes} Comments: {article.comment_count}
        </p>
      </section>

      <section className="comment-box">
        <AddComment setTopComments={setTopComments} article_id={article_id} />
      </section>

      <Comments topComments={topComments} />
    </section>
  );
}

export default ArticleById;
