export const baseURL = 'https://otakudesu.watch';
export const ListEndpoint = {
  genreList: './genre-list',
  ongoing: './ongoing-anime',
  animeList: './anime-list',
};
export const getAnimeEndpoint = (anime: string) =>
  `./anime/${encodeURIComponent(anime)}`;
export const getGenreEndpoint = (genre: string) =>
  `./genres/${encodeURIComponent(genre)}`;
export const getSearchAnimeEndpoint = (anime: string) =>
  `./?s=${encodeURIComponent(anime)}&post_type=anime`;
