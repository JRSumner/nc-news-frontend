import axios from "axios";

export const fetchArticles = (query) => {
  const queryStr = query === undefined ? "" : query;

  return axios
    .get(
      `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles${queryStr}`
    )
    .then(({ data: { articles } }) => {
      const fiveArticles = articles.slice(0, 5);

      return fiveArticles;
    });
};

export const fetchArticle = (article_id) => {
  return axios
    .get(
      `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles/${article_id}`
    )
    .then(({ data: { article } }) => {
      return article;
    });
};

export const fetchByTopics = (topic, query) => {
  const queryStr = query === undefined ? "" : query;
  return axios
    .get(
      `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles?topic=${queryStr}`
    )
    .then(({ data: { articles } }) => {
      const fiveArticles = articles.slice(0, 5);
      return fiveArticles;
    });
};

export const patchArticleVote = (article_id, vote) => {
  return axios.patch(
    `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: vote }
  );
};

export const fetchComments = (article_id) => {
  return axios
    .get(
      `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postComment = (comment, article_id) => {
  return axios
    .post(
      `https://nc-news-example-seminar-3-18.herokuapp.com/api/articles/${article_id}/comments`,
      comment
    )
    .then((res) => {
      return res;
    });
};
