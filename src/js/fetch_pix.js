import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = "29162955-32e71cd5a6cadb845e07a1aad";

export async function fetchArticles(query, page, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
  );
  return response
}
