const API_KEY = '6a4e748edeaa48397847ba976dbf6ad1';
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=vi-VN`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=vi-VN`,
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=vi-VN`,
  fetchTVShows: `tv/popular?api_key=${API_KEY}&language=vi-VN&page=1`,

  fetchComedy: `discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchAction: `discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchHorror: `discover/movie?api_key=${API_KEY}&with_genres=27`,
};

export default requests;
