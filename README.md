![otakudesu-scrape](https://socialify.git.ci/hansputera/otakudesu-scrape/image?description=1&font=Inter&forks=1&issues=1&language=1&logo=https%3A%2F%2Fi0.wp.com%2Fotakudesu.moe%2Fwp-content%2Fuploads%2F2017%2F09%2FOtaku-Desu.jpg&owner=1&stargazers=1&theme=Light)

# Installation

> npm install git+https://github.com/hansputera/otakudesu-scrape

or

> npm install @hansputera/otakudesu-scrape

# Usage

- Get the latest anime updates on the main page. 

> Use: `await otakudesu.home()`

- Get the latest anime from the ongoing-anime category.

> Use: `await otakudesu.ongoing()`

- Get all of the anime listed using alphabetical order.

> Use: `await otakudesu.animes()`

- Search anime by keyword. 

> Use: `await otakudesu.searchAnime(query)`

- Get all anime categorized as `x` genre. 

> Use: `await otakudesu.genreAnimes(x)`

- Get anime information such as synopsis, episodes, anime names, and URLs of each episode. 

> Use: `await otakudesu.anime(anime_parse_name)`

Get `anime_parse_name` from property `parse_name`

- Get the episode download link from the anime information link. (Link can be obtained through the corresponding anime page). 

> Use: `await otakudesu.downloads(home_url_anime)`
