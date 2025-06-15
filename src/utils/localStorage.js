const STORAGE_KEY = "saved_articles";

export const getSavedArticles = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const isArticleSaved = (url) => {
  const saved = getSavedArticles();
  return saved.some((a) => a.url === url);
};

export const saveArticle = (article) => {
  const saved = getSavedArticles();
  const exists = saved.some((a) => a.url === article.url);
  if (!exists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([article, ...saved]));
  }
};

export const removeArticle = (url) => {
  const saved = getSavedArticles();
  const filtered = saved.filter((a) => a.url !== url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
