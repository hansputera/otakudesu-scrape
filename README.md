# Otaku Desu Scrape

A module that retrieves data from otakudesu.moe

This module I created uses `cheerio`, and `got`

# Installation

> npm install git+https://github.com/hansputera/otakudesu-scrape

# Usage

- Get the latest anime updates on the main page. `await otakudesu.home()`

- Get the latest anime from the ongoing-anime category. `await otakudesu.ongoing()`

- Get all of the anime listed using alphabetical order. `await otakudesu.animes()`

- Search anime by keyword. `await otakudesu.searchAnime(query)`

- Get all anime categorized as `x` genre. `await otakudesu.genreAnimes(x)`

- Get anime information such as synopsis, episodes, anime names, and URLs of each episode. `await otakudesu.anime(anime_parse_name)`

- Get the episode download link from the anime information link. (Link can be obtained through the corresponding anime page). `await otakudesu.downloads(home_url_anime)`