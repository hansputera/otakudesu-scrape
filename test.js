const otaku = new (require('./index'))(false);

(async() => {
  const animes = await otaku.home();
  const randomIndex = Math.floor(Math.random() * animes.length);
  const anime = await otaku.anime(animes[randomIndex].parse_name);
  console.log(anime);
})();