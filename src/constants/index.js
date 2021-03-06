module.exports = {
  baseURL: 'https://otakudesu.moe',
  endpoints: {
    'ongoing': 'ongoing-anime',
    'genres': 'genre-list',
    'animes': 'anime-list',
    /**
     * 
     * @param {String} anime
    */
    'anime': (anime) => `anime/${anime}`,
    /**
     * 
     * @param {String} genre
     */
    'genre': (genre) => `genres/${genre}`,
    /**
     * 
     * @param {String} anime
     */
    'search_anime': (anime) => `?s=${anime}&post_type=anime`
  }
}