const { baseURL, endpoints: { ongoing, genres, genre, search_anime, anime, animes } } = require('./constants');
const { load } = require('cheerio');
const got = require('got').default;

const request = got.extend({
  prefixUrl: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  followRedirect: false
});

module.exports = class OtakuDesu {
  /**
   * 
   * @param {boolean?} raw
   */
  constructor(raw) {
    this.isRaw = raw || false;
    this.genreList = [];
  }

  async genres() {
    if (this.genreList.length > 5) return this.isRaw ? JSON.stringify(this.genreList) : this.genreList;
    else {
      const response = await request(genres);
      const $ = load(response.body);
      const genreLists = $('.venser > ul.genres > li > a');
      genreLists.each((i, el) => {
        const genreA = $(el);
        this.genreList[i] = {
          genre: genreA.text().trim(),
          url: baseURL + genreA.attr('href')
        }
      });
      return this.isRaw ? JSON.stringify(this.genreList) : this.genreList;
    }
  }

  /**
   * 
   * @param {String} animeParse
   */
  async anime(animeParse) {
    const response = await request(anime(animeParse));
    if (response.statusCode === 301) return this.isRaw ? JSON.stringify({}) : {};
    else {
      const data = {};
      const $ = load(response.body);
      const details = $('.infozingle > p');
      const detailss_k = [];
      const detailss_v = [];

      details.each((i, el) => {
        const keyText = $(el).text().split(':')[0].trim();
        let formatText = $(el).text().split(':')[1].trim();
        if (formatText.match(/,/g) && formatText.match(/,/g).length > 3) formatText = formatText.split(', ');

        detailss_k[i] = keyText.toLowerCase().replace(/\s/g, '-');
        detailss_v[i] = (formatText);
      });
      data['details'] = {};
      detailss_k.forEach((key, index) => {
        const value = detailss_v[index];
        data['details'][key] = value;
      });

      const synopsis = $('.sinopc').text();
      const episodes = $('.episodelist > ul > li');
      const episodes_ = [];
      data['synopsis'] = synopsis;

      episodes.each((i, el) => {
        const title = $(el).find('span > a').text().trim();
        const url = $(el).find('span > a').attr('href');
        const date = $(el).find('.zeebr').text().trim();
        episodes_[i] = { title, url, date };
      });

      data['episodes'] = episodes_;
      return this.isRaw ? JSON.stringify(data) : data;
    }
  }

  async downloads(episodeURL) {
        if (/(https?):\/\/otakudesu\.(moe)\/(.+[a-z]|.*?)/gi.exec(episodeURL)) throw Error('Invalid OtakuDesu URL');
        const animeResponse = await got(episodeURL);
        const $an = load(animeResponse.body);
        if (!/otaku/gi.test($an('title').text().trim())) return undefined;

        const downloads = [];
        let downloadsEl = $an('#venkonten > .download > ul > li');
        if (/batch/gi.test(episodeURL)) downloadsEl = $an('.batchlink > ul > li');
        if (!downloadsEl.length) return undefined;
        downloadsEl.each((i, element) => {
          const resolution = $an(element).find('strong').text().trim();
          const links_k = [];
          const links_v = [];
          $an(element).find('a').each((ind, ele) => {
            links_k[ind] = $an(ele).text().trim();
            links_v[ind] = $an(ele).attr('href');
          });
          const links = {};
          links_k.forEach((k, i) => {
            const val = links_v[i];
            links[k] = val;
          });
          downloads[i] = {
            resolution, links
          }
        });
        const resoArray = downloads.map(d => d.resolution);
        if (/lengkap/gi.test(episodeURL) && (new Set(resoArray)).size !== resoArray.length) {
          // Assume this is inside "lengkap"
          // Collect titles from each episode

          $an('#venkonten > .download > h4').each((index, titleElement) => {
            downloads[index]['title'] = $an(titleElement).text().trim();
          });
        }
        return this.isRaw ? JSON.stringify(downloads) : downloads;
  }

  /**
   * 
   * @param {String} animeName
   */
  async searchAnime(animeName) {
    const response = await request(search_anime(animeName.toLowerCase()));
    const $ = load(response.body);

    const animesEl = $('ul.chivsrc > li');
    if (animesEl.length < 1) return this.isRaw ? JSON.stringify([]) : [];
    else {
      const animes = [];
      animesEl.each(async (i, el) => {
        const image = $(el).find('img').attr('src');
        const name = $(el).find('h2').text().trim();
        const sets = $(el).find('.set');
        const url = $(el).find('h2 > a').attr('href');

        let meta = "";
        sets.each((_, el) => {
          meta += $(el).text().trim() + '\n';
        });

        const parse = url.split('/').filter(t => t !== '').pop();
        animes[i] = { name, image, meta, url, parse_name: parse };
      });
      return this.isRaw ? JSON.stringify(animes) : animes;
    }
  }

  /**
   * 
   * @param {String} genreN
   */
  async genreAnimes(genreN) {
    const response = await request(genre(genreN.toLowerCase()));
    if (response.statusCode === 301) return this.isRaw ? JSON.stringify([]) : [];
    else {
      const animes = [];
      const $ = load(response.body);
      const animesEl = $('.col-anime');
      animesEl.each((i, el) => {
        const name = $(el).find('.col-anime-title').text().trim();
        const url = $(el).find('.col-anime-title > a').attr('href');
        const studio = $(el).find('.col-anime-studio').text().trim();
        const eps = $(el).find('.col-anime-eps').text().replace(/[A-z]/gi, '').trim();
        const rate = parseFloat($(el).find('.col-anime-rating').text().trim());
        const genres = [];
        const genresEl = $(el).find('.col-anime-genre > a');
        genresEl.each((i, el) => {
          genres[i] = $(el).text().trim();
        });
        const image = $(el).find('.col-anime-cover > img').attr('src');
        const synopsis = $(el).find('.col-synopsis').text().trim();
        const date = $(el).find('.col-anime-date').text().trim();
        animes[i] = { name, url, studio, date, eps, rate, genres, image, synopsis };
      });
      return this.isRaw ? JSON.stringify(animes) : animes;
    }
  }

  async home() {
    const { body } = await request.get('');
    const $ = load(body);
    const news = [];
    const newsElement = $('.venz > ul > li');
    newsElement.each((i, el) => {
      const episode = Number($(el).find('.epz').text().replace(/[A-z]/gi, '').trim());
        const releaseDay = $(el).find('.epztipe').text().trim();
        if (!isNaN(releaseDay)) return;
        const date = $(el).find('.newnime').text().trim();

        const release = `${date} ${releaseDay}`;
        const desu_url = $(el).find('.thumb > a').attr()['href'];
        const picture =$(el).find('.thumb > a > .thumbz > img').attr('src');
        const name = $(el).find('.thumb > a > .thumbz > .jdlflm').text().trim();
        if (name.length < 1) return;
        news[i] = { name, picture, url: desu_url, release, episode }
    });
    return this.isRaw ? JSON.stringify(news) : news;
  }

  async animes() {
    const { body } = await request.get(animes);
    const $ = load(body);

    const animes = [];
    const animesElement = $('#abtext > .bariskelom');
    animesElement.each((index, element) => {
      const number = $(element).find('.barispenz').text().trim();
      const title = $(element).find('.hodebgst').attr('title');
      const url = $(element).find('.hodebgst').attr('href');
      animes[index] = { index: number, title, url };
    });
    return this.isRaw ? JSON.stringify(animes) : animes;
  }

  async ongoing() {
      const response = await request(ongoing);
      const $ = load(response.body);
      const animes = [];

      const lists = $('.venz > ul > li');
      lists.each((i, el) => {
        const animeElement = $(el).find('.detpost');

        const episode = Number(animeElement.find('.epz').text().replace(/[A-z]/gi, '').trim());
        const releaseDay = animeElement.find('.epztipe').text().trim();
        const date = animeElement.find('.newnime').text().trim();

        const release = `${date} ${releaseDay}`;
        const desu_url = animeElement.find('.thumb > a').attr()['href'];
        const picture = animeElement.find('.thumb > a > .thumbz > img').attr('src');
        const name = animeElement.find('.thumb > a > .thumbz > .jdlflm').text().trim();
        if (name.length < 1) return;
        animes[i] = {
          name, release, picture, episode, url: desu_url
        }
      });
      if (this.isRaw) return JSON.stringify(animes);
      else return animes;
  }
}