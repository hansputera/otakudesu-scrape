const otaku = new (require('./index'))(false);

(async() => {
  const data = await otaku.home();
  console.log(data);
})();