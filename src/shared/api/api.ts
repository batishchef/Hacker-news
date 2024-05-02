import { NewsData, comment, error, newsIdList } from "../types/types";

export const fetchFreshNewsIdList = (
  setNewsIdList: React.Dispatch<React.SetStateAction<newsIdList>>,
  setError: React.Dispatch<React.SetStateAction<error>>,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$priority%22&limitToFirst=100"
  )
    .then((response) => response.json())
    .then((response) => setNewsIdList(response))
    .catch((error) => setError({ isError: true, message: error }))
    .finally(() => setIsPending(false));
};

export const fetchNewsData = (
  id: number,
  setData: React.Dispatch<React.SetStateAction<NewsData | undefined>>,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((response) => response.json())
    .then((response) => setData(response))
    .finally(() => setIsPending(false));
};

export const fetchComment = (
  commentId: number,
  setComment: React.Dispatch<React.SetStateAction<comment | undefined>>,
  setError: React.Dispatch<React.SetStateAction<error | undefined>>,
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  fetch(
    `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
  )
    .then((response) => response.json())
    .then((response) => setComment(response))
    .catch((error) => setError({ isError: true, message: error }))
    .finally(() => setIsPending(false))
};
