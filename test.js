const otaku = new (require('./index'))(false);

(async() => {
  const animes = await otaku.home();
  const randomIndex = Math.floor(Math.random() * animes.length);
  console.log(animes[randomIndex]);
})();