"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchAnimeEndpoint = exports.getGenreEndpoint = exports.getAnimeEndpoint = exports.ListEndpoint = exports.baseURL = void 0;
exports.baseURL = 'https://otakudesu.vip';
exports.ListEndpoint = {
    genreList: './genre-list',
    ongoing: './ongoing-anime',
    animeList: './anime-list',
};
const getAnimeEndpoint = (anime) => `./anime/${encodeURIComponent(anime)}`;
exports.getAnimeEndpoint = getAnimeEndpoint;
const getGenreEndpoint = (genre) => `./genres/${encodeURIComponent(genre)}`;
exports.getGenreEndpoint = getGenreEndpoint;
const getSearchAnimeEndpoint = (anime) => `./?s=${encodeURIComponent(anime)}&post_type=anime`;
exports.getSearchAnimeEndpoint = getSearchAnimeEndpoint;
